import express from 'express';
import pool from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all freelancers
router.get('/freelancers', async (req, res) => {
  try {
    const { skill, rate, availability } = req.query;
    
    let query = `
      SELECT id, name, email, avatar, bio, skills, hourly_rate, location, 
             created_at
      FROM users
      WHERE role = 'freelancer'
    `;
    const params = [];
    let paramCount = 0;

    if (skill && skill !== 'all') {
      paramCount++;
      query += ` AND $${paramCount} = ANY(skills)`;
      params.push(skill);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    
    // Add mock stats for each freelancer
    const freelancers = result.rows.map(freelancer => ({
      ...freelancer,
      rating: 4.8,
      reviews: Math.floor(Math.random() * 200) + 50,
      completedJobs: Math.floor(Math.random() * 300) + 50,
      availability: Math.random() > 0.5 ? 'Available' : 'Busy'
    }));

    res.json({ success: true, data: freelancers });
  } catch (error) {
    console.error('Get freelancers error:', error);
    res.status(500).json({ error: 'Server error fetching freelancers' });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT id, name, email, avatar, bio, skills, hourly_rate, location, 
             phone, website, role, created_at
      FROM users
      WHERE id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error fetching user' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, bio, skills, hourly_rate, location, phone, website, avatar } = req.body;

    const result = await pool.query(`
      UPDATE users 
      SET name = COALESCE($1, name),
          bio = COALESCE($2, bio),
          skills = COALESCE($3, skills),
          hourly_rate = COALESCE($4, hourly_rate),
          location = COALESCE($5, location),
          phone = COALESCE($6, phone),
          website = COALESCE($7, website),
          avatar = COALESCE($8, avatar),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING id, name, email, avatar, bio, skills, hourly_rate, location, phone, website, role
    `, [name, bio, skills, hourly_rate, location, phone, website, avatar, req.user.id]);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

export default router;
