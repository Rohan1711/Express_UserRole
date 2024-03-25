const express = require("express");
const user_route = express();
const session = require('express-session');
const config = require("../config/config");
const bodyParser = require("body-parser"); // Moved require statement up
const auth = require('../middleware/auth');
const userController = require("../controllers/userController");
// user_route.use(session({ secret: config.sessionSecret,}));

// user_route.use(session({ secret: config.sessionSecret, resave: false, saveUninitialized: false }));
// user_route.use(session({ 
//     secret: config.sessionSecret,
//     cookie:{
//         sameSite:"strict",
//     } 
//     }));

user_route.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        httpOnly:true,
        path:'/'
    }
  }));

// user_route.use(express.json());
// user_route.use(express.urlencoded({extended:true}));
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// Set view engine and views path
user_route.set('view engine', 'ejs');
user_route.set('views', './views/users');

user_route.get('/register',auth.isLogout, userController.loadRegister);
user_route.post('/register', userController.insertUser);
user_route.get('/',auth.isLogout, userController.loadLogin);
user_route.get('/login',auth.isLogout, userController.loadLogin);
user_route.post('/login',userController.userLogin);
user_route.get('/home',auth.isLogin, auth.isLogin, userController.loadHome);
user_route.get('/logout',auth.isLogin,userController.userLogout);
module.exports = user_route;
