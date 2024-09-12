const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const categoriesRouter = require('./routes/categories');
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');
const profilesRouter = require('./routes/profiles');
const userCoursesRouter = require('./routes/userCourses');

app.use(express.json()); // Untuk parsing JSON

app.use('/categories', categoriesRouter);
app.use('/courses', coursesRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);
app.use('/userCourses', userCoursesRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
