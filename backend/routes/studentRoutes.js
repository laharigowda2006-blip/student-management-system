const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all students (SELECT)
router.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [students] = await connection.query('SELECT * FROM students ORDER BY id DESC');
        connection.release();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching students', message: error.message });
    }
});

// GET single student (SELECT)
router.get('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [students] = await connection.query('SELECT * FROM students WHERE id = ?', [req.params.id]);
        connection.release();
        if (students.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(students[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching student', message: error.message });
    }
});

// SEARCH students (SELECT with WHERE)
router.get('/search/query', async (req, res) => {
    try {
        const query = req.query.q || '';
        const connection = await pool.getConnection();
        const [students] = await connection.query(
            'SELECT * FROM students WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR roll_number LIKE ?',
            [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
        );
        connection.release();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error searching students', message: error.message });
    }
});

// CREATE student (INSERT)
router.post('/', async (req, res) => {
    const { roll_number, first_name, last_name, email, phone, date_of_birth, gender, class_id, city, address } = req.body;
    if (!roll_number || !first_name || !last_name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        const connection = await pool.getConnection();
        await connection.query(
            'INSERT INTO students (roll_number, first_name, last_name, email, phone, date_of_birth, gender, class_id, city, address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [roll_number, first_name, last_name, email, phone || null, date_of_birth || null, gender || null, class_id || null, city || null, address || null, 'Active']
        );
        connection.release();
        res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating student', message: error.message });
    }
});

// UPDATE student
router.put('/:id', async (req, res) => {
    const { first_name, last_name, email, phone, city, address, status } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query(
            'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone = ?, city = ?, address = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [first_name, last_name, email, phone || null, city || null, address || null, status || 'Active', req.params.id]
        );
        connection.release();
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating student', message: error.message });
    }
});

// DELETE student
router.delete('/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM students WHERE id = ?', [req.params.id]);
        connection.release();
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting student', message: error.message });
    }
});

module.exports = router;
