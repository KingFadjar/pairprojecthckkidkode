'use strict';

const { Users } = require('../models');  // Pastikan ini benar dan sesuai dengan struktur project Anda
const bcrypt = require('bcryptjs');

class usersController {
    // Render form login dengan opsi untuk menampilkan pesan kesalahan
    static async loginForm(req, res) {
        const { error } = req.query;
        try {
            console.log(error);
            res.render('showLogin', { error });
        } catch (err) {
            res.send(err);
        }
    }

    // Proses login pengguna
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ where: { email } });
            if (user && await bcrypt.compare(password, user.password)) {
                // Simpan informasi pengguna di sesi
                req.session.user = user; // Simpan user di session
                res.redirect('/landing'); // Redirect ke halaman landing setelah login berhasil
            } else {
                res.render('showLogin', { error: 'Invalid email or password' }); // Pastikan view 'showLogin' ada
            }
        } catch (error) {
            console.log(error);  // Ganti `err` dengan `error`
            res.status(500).json({ error: error.message });
        }
    }

    // Proses logout pengguna
    static logout(req, res) {
        // Menghapus sesi pengguna
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to log out. Please try again.' });
            }
            // Menghapus cookie sesi dan mengarahkan kembali ke halaman login
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    }
}

module.exports = usersController;
