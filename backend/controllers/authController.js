// controllers/authController.js
const pool = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

  await db.query(
  `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
  [name, email, hashedPassword]
);



    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(400).json({ error: err.message });
  }
};
