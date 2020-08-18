//include express and create a router
const express = require("express");
const router = express.Router();
// //passport to authenticate user during login
const passport = require("passport");
const homeController = require("../controllers/home_controller");

//route for homepage
router.get("/", homeController.home);

//route for specific hotel
router.get("/home",passport.checkAuthentication, homeController.show);

// //redirect all user related URLs to users.js
router.use('/user', require('./users'));

//export router
module.exports = router;
