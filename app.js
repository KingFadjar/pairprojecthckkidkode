'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Categories, Courses, Profiles, Users } = require('./models');
const registerController = require('./controllers/registerController');
const categoryController = require('./controllers/categoryController');
const courseController = require('./controllers/coursesController');
const profileController = require('./controllers/profilesController');
const usersController = require('./controllers/usersController');
const bcrypt = require('bcrypt');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(bodyParser.json()); // Parses JSON bodies

// Static Files
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS, images)

// Routes
// Login
app.get('/login', usersController.loginForm);
app.post('/login', usersController.loginUser); // Handle login

// Rute Logout
app.get('/logout', usersController.logout);

// Categories
app.get('/categories', categoryController.getAllCategories);
app.get('/categories/:id', categoryController.getCategoryById);
app.post('/categories', categoryController.createCategory);
app.put('/categories/:id', categoryController.updateCategory);
app.delete('/categories/:id', categoryController.deleteCategory);

// Courses
app.get('/courses', courseController.getAllCourses);
app.get('/courses/:id', courseController.getCourseById);
app.post('/courses', courseController.createCourse);
app.put('/courses/:id', courseController.updateCourse);
app.delete('/courses/:id', courseController.deleteCourse);

// Profiles
app.get('/profiles', profileController.getAllProfiles);
app.get('/profiles/:id', profileController.getProfileById);
app.post('/profiles', profileController.createProfile);
app.put('/profiles/:id', profileController.updateProfile);
app.delete('/profiles/:id', profileController.deleteProfile);

// Users
app.post('/users/register', registerController.registerUser);
app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.post('/users', usersController.createUser);
app.put('/users/:id', usersController.updateUser);
app.delete('/users/:id', usersController.deleteUser);

// Default route to register a new user
app.get('/', (req, res) => {
  res.redirect('/login'); // Changed from /users/register to /login
});

app.get('/landing', (req, res) => {
    // Assuming users are redirected to /landing after login
    res.render('landing', { user: req.user }); // Adjust as needed
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
