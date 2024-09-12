//package
const express = require('express')
const usersController = require('../controllers/usersController')

//router
router.get('/register', UserController.register) //kenpaa ada dua anjay
router.post('/register', UserController.register)
router.get('/login', UserController.login) //kenpaa ada dua anjay
router.post('/login', UserController.login)

module.exports = usersController