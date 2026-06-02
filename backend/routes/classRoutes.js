const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all classes
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [classes] = await connection.query('SELECT * FROM classes ORDER BY id DESC');
        connection.release();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching classes', message: error.message });
    }
});

// GET single class
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [classes] = await connection.query('SELECT * FROM classes WHERE id = ?', [req.params.id]);
        connection.release();
        if (classes.length === 0) return res.status(404).json({ error: 'Class not found' });
        res.json(classes[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching class', message: error.message });
    }
});

// CREATE class
router.post('/', async (req, res) => {
    const { class_name, section, capacity } = req.body;
    if (!class_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const connection = await pool.getConnection();
        await connection.query(
            'INSERT INTO classes (class_name, section, capacity) VALUES (?, ?, ?)',
            [class_name, section || null, capacity || 30]
        );
        connection.release();
        res.status(201).json({ message: 'Class created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating class', message: error.message });
    }
});

module.exports = router;
