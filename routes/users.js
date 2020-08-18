//include express and create a router
const express = require("express");
const router = express.Router();

// //passport to authenticate user during login
const passport = require("passport");

const userController = require("../controllers/user_controller");

//route for booking 
router.post("/book", passport.checkAuthentication,userController.book);

//route for creating a new user
router.post("/createUser", userController.createUser);

//route for sign-in
router.get('/sign-in', userController.signIn);

//route for profile
router.get('/profile/:id', passport.checkAuthentication, userController.profile);

//route for logout
router.get('/sign-out', userController.destroySession);

//roue for create session
router.post('/createSession', passport.authenticate(
    'local',
    { failureRedirect: '/user/sign-in' }
), userController.createSession);

//export router
module.exports = router;
