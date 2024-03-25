const express = require("express");
const admin_route = express();
const session = require('express-session');
const config = require("../config/config");
admin_route.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }));

// const bodyParser = require("body-parser"); // Moved require statement up
const auth = require('../middleware/adminAuth');
const adminController = require("../controllers/adminController");

// user_route.use(bodyParser.json());
// user_route.use(bodyParser.urlencoded({ extended: true }));
// Set view engine and views path
admin_route.set('view engine', 'ejs');
admin_route.set('views', './views/admin');

admin_route.get('/',auth.isLogout,adminController.loadLogin);
admin_route.post('/',adminController.adminLogin);
admin_route.get('/home',auth.isLogin,adminController.loadDashboard);
admin_route.get('/logout',auth.isLogin,adminController.adminLogout);
admin_route.get('*',function(req,res){
    res.redirect('/admin');
});

module.exports= admin_route;