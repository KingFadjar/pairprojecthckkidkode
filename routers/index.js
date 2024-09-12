//package
const express = require('express')
const UserController = require('../controllers/UserController')

//router
router.get('/register', UserController.register)
router.post('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/login', UserController.login)