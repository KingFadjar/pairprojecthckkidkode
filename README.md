# ppppppppppp

-buat tabel :
Profiles
fristName varchar
lastName varchar
age integer
userId integer

Users
userName varchar
email varchar
password varchar
role varchar

UserCourse
UserId integer
CourseId integer

Courses
Title varchar
Description varchar
CategoryId integer

Categories
Name varchar

npx sequelize model:create --name Profiles --attributes firstName:string,lastName:string,age:integer
npx sequelize model:create --name Users --attributes userName:string,email:string,password:string,role:string
npx sequelize model:create --name UserCourse --attributes UserId:integer,CourseId:integer

data 

categories.json
courses.json
users.json
profiles.json
usercourse.json

npx sequelize-cli seed:generate --name seed-usercourse

categoriesController.js
coursesController.js
profilesController.js
userCourseController.js
usersController.js