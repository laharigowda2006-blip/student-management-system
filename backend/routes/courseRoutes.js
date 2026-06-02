const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [courses] = await connection.query('SELECT * FROM courses ORDER BY id DESC');
        connection.release();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching courses', message: error.message });
    }
});

// GET single course
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [courses] = await connection.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        connection.release();
        if (courses.length === 0) return res.status(404).json({ error: 'Course not found' });
        res.json(courses[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching course', message: error.message });
    }
});

// CREATE course
router.post('/', async (req, res) => {
    const { course_code, course_name, credits, description } = req.body;
    if (!course_code || !course_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const connection = await pool.getConnection();
        await connection.query(
            'INSERT INTO courses (course_code, course_name, credits, description) VALUES (?, ?, ?, ?)',
            [course_code, course_name, credits || 3, description || null]
        );
        connection.release();
        res.status(201).json({ message: 'Course created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating course', message: error.message });
    }
});

module.exports = router;
