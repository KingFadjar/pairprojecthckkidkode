const { Users } = require('../models');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Validasi input sesuai kebutuhan
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    
    }

    // Periksa apakah email sudah ada
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 6);

    // Buat user baru
    const user = await Users.create({ 
      username, 
      email, 
      password: hashedPassword, 
      role 
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
