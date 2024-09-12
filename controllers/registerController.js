const { Users } = require('../models');
const bcrypt = require('bcryptjs');
class RegisterController {
  static async register(req,res){
    try {
      res.render('showRegister');
    } catch (error) {
      res.send(error)
    }
  }

  static async registerUser(req, res) {
    const { username, email, password, role } = req.body;
        
        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Simpan user baru ke dalam database
            await Users.create({ username, email, password: hashedPassword, role});
            
            // Redirect ke halaman login setelah registrasi berhasil
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan pada server');
        }
  }
}

module.exports=RegisterController;