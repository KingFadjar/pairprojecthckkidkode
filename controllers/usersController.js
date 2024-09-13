'use strict';

const { Users } = require('../models');  // Pastikan ini benar dan sesuai dengan struktur project Anda
const bcrypt = require('bcryptjs');
const session = require('express-session');

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
            let { email, password } = req.body;

            let user = await Users.findOne({ where: { email } })

            if (user) {
                let isValidPassword = await bcrypt.compare(password, user.password);

                if (isValidPassword) {
                    req.session.userId = user.id
                    return res.redirect('/')
                }
                else {
                    let error = "Invalid username or password";
                    return res.redirect(`/login?error=${error}`);
                }
            }
            else {
                let error = "Invalid username  or password";
                return res.redirect(`/login?error=${error}`);
            }
        }

        catch (error) {
            res.send(error);
        }
    }

    // Proses logout pengguna
    static async logout(req, res) {
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
