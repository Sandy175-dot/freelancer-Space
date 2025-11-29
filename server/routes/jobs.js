import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { category, status = 'open', search } = req.query;
    
    let query = `
      SELECT j.*, u.name as client_name, u.email as client_email
      FROM jobs j
      JOIN users u ON j.client_id = u.id
      WHERE j.status = $1
    `;
    const params = [status];
    let paramCount = 1;

    if (category && category !== 'all') {
      paramCount++;
      query += ` AND j.category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (j.title ILIKE $${paramCount} OR j.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ' ORDER BY j.created_at DESC';

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Server error fetching jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT j.*, u.name as client_name, u.email as client_email, u.avatar as client_avatar
      FROM jobs j
      JOIN users u ON j.client_id = u.id
      WHERE j.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Get bid count
    const bidCount = await pool.query('SELECT COUNT(*) FROM bids WHERE job_id = $1', [id]);
    
    const job = {
      ...result.rows[0],
      bid_count: parseInt(bidCount.rows[0].count)
    };

    res.json({ success: true, data: job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ error: 'Server error fetching job' });
  }
});

// Create job (client only)
router.post('/',
  authenticate,
  authorize('client'),
  [
    body('title').trim().notEmpty(),
    body('description').trim().notEmpty(),
    body('category').trim().notEmpty(),
    body('budget_min').isNumeric(),
    body('budget_max').isNumeric()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, category, budget_min, budget_max, duration, location, skills } = req.body;

      const result = await pool.query(`
        INSERT INTO jobs (client_id, title, description, category, budget_min, budget_max, duration, location, skills)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `, [req.user.id, title, description, category, budget_min, budget_max, duration, location || 'Remote', skills || []]);

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Create job error:', error);
      res.status(500).json({ error: 'Server error creating job' });
    }
  }
);

// Update job
router.put('/:id',
  authenticate,
  authorize('client'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, category, budget_min, budget_max, duration, location, skills, status } = req.body;

      // Check if job belongs to user
      const jobCheck = await pool.query('SELECT client_id FROM jobs WHERE id = $1', [id]);
      if (jobCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      if (jobCheck.rows[0].client_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const result = await pool.query(`
        UPDATE jobs 
        SET title = COALESCE($1, title),
            description = COALESCE($2, description),
            category = COALESCE($3, category),
            budget_min = COALESCE($4, budget_min),
            budget_max = COALESCE($5, budget_max),
            duration = COALESCE($6, duration),
            location = COALESCE($7, location),
            skills = COALESCE($8, skills),
            status = COALESCE($9, status),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $10
        RETURNING *
      `, [title, description, category, budget_min, budget_max, duration, location, skills, status, id]);

      res.json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Update job error:', error);
      res.status(500).json({ error: 'Server error updating job' });
    }
  }
);

// Delete job
router.delete('/:id',
  authenticate,
  authorize('client'),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if job belongs to user
      const jobCheck = await pool.query('SELECT client_id FROM jobs WHERE id = $1', [id]);
      if (jobCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      if (jobCheck.rows[0].client_id !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
      res.json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Delete job error:', error);
      res.status(500).json({ error: 'Server error deleting job' });
    }
  }
);

export default router;
