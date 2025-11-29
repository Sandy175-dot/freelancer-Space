import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get bids for a job
router.get('/job/:jobId', authenticate, async (req, res) => {
  try {
    const { jobId } = req.params;

    const result = await pool.query(`
      SELECT b.*, u.name as freelancer_name, u.email as freelancer_email, 
             u.avatar as freelancer_avatar, u.hourly_rate, u.skills
      FROM bids b
      JOIN users u ON b.freelancer_id = u.id
      WHERE b.job_id = $1
      ORDER BY b.created_at DESC
    `, [jobId]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get bids error:', error);
    res.status(500).json({ error: 'Server error fetching bids' });
  }
});

// Get freelancer's bids
router.get('/my-bids', authenticate, authorize('freelancer'), async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, j.title as job_title, j.description as job_description,
             j.category, j.budget_min, j.budget_max, u.name as client_name
      FROM bids b
      JOIN jobs j ON b.job_id = j.id
      JOIN users u ON j.client_id = u.id
      WHERE b.freelancer_id = $1
      ORDER BY b.created_at DESC
    `, [req.user.id]);

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get my bids error:', error);
    res.status(500).json({ error: 'Server error fetching bids' });
  }
});

// Create bid
router.post('/',
  authenticate,
  authorize('freelancer'),
  [
    body('job_id').isInt(),
    body('bid_amount').isNumeric(),
    body('proposal').trim().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { job_id, bid_amount, proposal, estimated_duration, portfolio_link } = req.body;

      // Check if job exists and is open
      const jobCheck = await pool.query('SELECT status FROM jobs WHERE id = $1', [job_id]);
      if (jobCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      if (jobCheck.rows[0].status !== 'open') {
        return res.status(400).json({ error: 'Job is not open for bidding' });
      }

      // Check if already bid
      const bidCheck = await pool.query(
        'SELECT id FROM bids WHERE job_id = $1 AND freelancer_id = $2',
        [job_id, req.user.id]
      );
      if (bidCheck.rows.length > 0) {
        return res.status(400).json({ error: 'You have already bid on this job' });
      }

      const result = await pool.query(`
        INSERT INTO bids (job_id, freelancer_id, bid_amount, proposal, estimated_duration, portfolio_link)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [job_id, req.user.id, bid_amount, proposal, estimated_duration, portfolio_link]);

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Create bid error:', error);
      res.status(500).json({ error: 'Server error creating bid' });
    }
  }
);

// Accept bid (client only)
router.put('/:id/accept',
  authenticate,
  authorize('client'),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Get bid details
      const bidResult = await pool.query(`
        SELECT b.*, j.client_id, j.title, j.description, j.budget_max
        FROM bids b
        JOIN jobs j ON b.job_id = j.id
        WHERE b.id = $1
      `, [id]);

      if (bidResult.rows.length === 0) {
        return res.status(404).json({ error: 'Bid not found' });
      }

      const bid = bidResult.rows[0];

      if (bid.client_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      // Start transaction
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Update bid status
        await client.query('UPDATE bids SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', ['accepted', id]);

        // Reject other bids
        await client.query(
          'UPDATE bids SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE job_id = $2 AND id != $3',
          ['rejected', bid.job_id, id]
        );

        // Update job status
        await client.query('UPDATE jobs SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', ['in_progress', bid.job_id]);

        // Create project
        const projectResult = await client.query(`
          INSERT INTO projects (job_id, client_id, freelancer_id, bid_id, title, description, budget)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
        `, [bid.job_id, req.user.id, bid.freelancer_id, id, bid.title, bid.description, bid.bid_amount]);

        await client.query('COMMIT');

        res.json({ success: true, data: projectResult.rows[0] });
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      console.error('Accept bid error:', error);
      res.status(500).json({ error: 'Server error accepting bid' });
    }
  }
);

export default router;
