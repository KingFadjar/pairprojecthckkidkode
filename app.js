'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Categories, Courses, Profiles, Users } = require('./models');
const registerController = require('./controllers/registerController');
const categoryController = require('./controllers/categoryController');
const coursesController = require('./controllers/coursesController');
const profileController = require('./controllers/profilesController');
const usersController = require('./controllers/usersController');
const userCourseController = require('./controllers/userCourseController');
const bcrypt = require('bcryptjs');
const session = require('express-session');


const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'style')));

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(bodyParser.json()); // Parses JSON bodies

// Static Files
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS, images)


//regis
app.get('/register', registerController.register);
app.post('/register', registerController.registerUser);

// Login
app.get('/login', usersController.loginForm);
app.post('/login', usersController.loginUser); // Handle login

//midleware
// app.use(async (req, res, next) => {
//   if(!req.session.userId){
//     let error = "LOGIN DULULAH"
//     res.redirect(`/login?error=${error}`)
//   }
//   else{
//     next()
//   }
// });

// Rute Logout
app.get('/logout', usersController.logout);

// Categories
app.get('/categories', categoryController.getAllCategories);
app.get('/categories/:id', categoryController.getCategoryById);
app.post('/categories', categoryController.createCategory);
app.put('/categories/:id', categoryController.updateCategory);
app.delete('/categories/:id', categoryController.deleteCategory);

// Courses
app.get('/courses', coursesController.getAllCourses);
app.get('/courses/:id', coursesController.getCourseById);
app.post('/courses', coursesController.createCourse);
app.put('/courses/:id', coursesController.updateCourse);
app.delete('/courses/:id', coursesController.deleteCourse);

// Profiles
app.get('/profiles', profileController.getAllProfiles);
app.get('/profiles/:id', profileController.getProfileById);
app.post('/profiles', profileController.createProfile);
app.put('/profiles/:id', profileController.updateProfile);
app.delete('/profiles/:id', profileController.deleteProfile);

// Users
app.get('/users', userCourseController.getAllUserCourses);
app.get('/users/:id', userCourseController.getUserCourseById);
app.post('/users', userCourseController.createUserCourse);
app.put('/users/:id', userCourseController.updateUserCourse);
app.delete('/users/:id', userCourseController.deleteUserCourse);


//MVP
app.get('/download/frontend', (req, res) => {
  const file = path.join(__dirname, 'frontend.pdf');
  res.download(file); 
});

app.get('/download/backend-pdf', (req, res) => {
  const file = path.join(__dirname, 'backend.pdf');
  res.download(file);
});
app.post('/generate-pdf', (req, res) => {
  const htmlTemplate = fs.readFileSync('./template.html', 'utf8');
  
  const document = {
    html: htmlTemplate,
    data: {
      html_description: "HTML (HyperText Markup Language) adalah bahasa yang digunakan untuk membuat halaman web. Bayangkan HTML seperti peta untuk membangun rumah di internet. Setiap bagian dari rumah (seperti pintu, jendela, atau dinding) memiliki instruksi khusus dalam HTML, yang disebut tag.",
      css_description: "CSS amemberi hiasan untuk website kamu! Ibarat di rumah, kamu bisa memberi cat tembok, menanggalkan lukisan, bahkan menaruh fitur-fitur yang akan membantu memperindah tembokmu! Nah, jadi dengan CSS, kamu bisa membuat halaman web yang lebih cantik dan lebih menarik. Bayangkan CSS seperti alat yang kamu gunakan untuk menggambar atau mewarnai. Kamu bisa mengatur warna, ukuran, posisi, dan masih banyak lagi hanya dengan beberapa baris kode!",
      js_description: "JavaScript adalah bahasa pemrograman yang digunakan untuk membuat halaman web lebih interaktif. Jika HTML adalah kerangka dari halaman web dan CSS adalah warna dan desainnya, maka JavaScript adalah otaknya yang membuat halaman web bisa bergerak dan berinteraksi. Bayangkan jika kamu bisa memberi tahu halaman web untuk melakukan sesuatu saat kamu mengklik tombol atau menggerakkan mouse. JavaScript-lah yang memungkinkan hal ini terjadi!",
    },
    path: path.join(__dirname, 'frontend.pdf'),
  };

  const options = {
    format: 'A4',
    orientation: 'portrait',
  };

  pdf.create(document, options)
    .then((response) => {
      res.download(response.filename);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error generating PDF");
    });
});






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
