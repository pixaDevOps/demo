// controllers/authController.js

const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashed]
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during register:', err);
    res.status(400).json({ error: err.message });
  }
};
