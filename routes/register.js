const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

// CREATE User
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Validasi input sesuai kebutuhan
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role 
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
