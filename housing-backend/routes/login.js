const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your DB connection

// ✅ POST /login/signup
router.post('/signup', (req, res) => {
  const { name, email, password, is_matched } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking user existence:', err);
      return res.status(500).json({ message: 'Server error.' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const insertQuery = 'INSERT INTO users (name, email, password_hash, is_matched) VALUES (?, ?, ?, ?)';
    const insertValues = [name, email, password, is_matched];

    db.query(insertQuery, insertValues, (err) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Signup failed.' });
      }

      return res.status(200).json({ message: 'Signup successful.' });
    });
  });
});

// ✅ NEW: POST /login/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const loginQuery = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
  db.query(loginQuery, [email, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Server error during login.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.status(200).json({ message: 'Login successful.', user: results[0] });
  });
});

// ✅ POST /login/facilities
router.post('/facilities', (req, res) => {
  const { email, facilities } = req.body;

  if (!email || !facilities || !Array.isArray(facilities)) {
    return res.status(400).json({ message: 'Invalid data. Email and facilities are required.' });
  }

  const getUserIdQuery = 'SELECT id FROM users WHERE email = ?';
  db.query(getUserIdQuery, [email], (err, results) => {
    if (err || results.length === 0) {
      console.error('❌ Error fetching user_id:', err);
      return res.status(500).json({ message: 'User not found.' });
    }

    const userId = results[0].id;
    const insertQuery = 'INSERT INTO user_facilities (user_id, facility_name) VALUES ?';
    const values = facilities.map((facility) => [userId, facility]);

    db.query(insertQuery, [values], (err) => {
      if (err) {
        console.error('❌ Error inserting facilities:', err);
        return res.status(500).json({ message: 'Failed to save preferences.' });
      }

      return res.status(200).json({ message: 'Preferences saved successfully.' });
    });
  });
});

// ✅ POST /login/matches
router.post('/matches', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const getUserIdQuery = 'SELECT id FROM users WHERE email = ?';
  db.query(getUserIdQuery, [email], (err, userResults) => {
    if (err || userResults.length === 0) {
      console.error('❌ Error fetching user_id:', err);
      return res.status(500).json({ message: 'User not found.' });
    }

    const userId = userResults[0].id;

    const matchQuery = `
      SELECT u.name, u.email, COUNT(*) AS shared_facilities
      FROM users u
      JOIN user_facilities uf ON u.id = uf.user_id
      WHERE u.id != ? AND u.is_matched = TRUE
        AND uf.facility_name IN (
          SELECT facility_name
          FROM user_facilities
          WHERE user_id = ?
        )
      GROUP BY u.id, u.name, u.email
      ORDER BY shared_facilities DESC
    `;

    db.query(matchQuery, [userId, userId], (err, matches) => {
      if (err) {
        console.error('❌ Error fetching matches:', err);
        return res.status(500).json({ message: 'Failed to fetch matches.' });
      }

      return res.status(200).json({ matches });
    });
  });
});

module.exports = router;
