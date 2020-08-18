const User = require('../models/user');
const Booking=require('../models/book');
module.exports.book = async function (req, res) {
    try {
        let book=await Booking.create({
            date:req.body.date,
            time:req.body.time,
            user:req.user._id
        });
        req.flash('success','Booking Done');
        res.redirect('back');
    }
    catch (err) {
        req.flash('error', err);
    }
}

//add a user
module.exports.createUser = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {              //if password do not match redirect back
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    try {
        let user = await User.findOne({ email: req.body.email });          //find user by email   
        if (!user)                                                   //if user doesnt exist create the user
        {
            let user = await User.create(req.body);
            req.flash('success', 'Account created, Please login!');
            return res.redirect('/user/sign-in');
        } else {
            //else redirect him back
            req.flash('success', 'You already have an account,Login to continue');
            return res.redirect('/user/sign-in');
        }
    }
    catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }

}

//if user hits url localhost:8000/user/sign-in
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('home', {            //if user is logged in render home page
            title: "Home"
        });
    }
    return res.render('sign_in', {             //if user is not logged in render signIn page
        title: "SignIn"
    });
}


//create a news session when user signs in through passport
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    res.redirect('/home');
}

//destroy session when user signs out
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}

//show profile of user which contains his bookings
module.exports.profile = async function (req, res) {
    let user = await User.findById(req.params.id);       //find user by id
    const Bookings=await Booking.find({}).populate('user');
    return res.render('profile', {            //render profile page
        title: 'profile',
        user,
        Bookings
    })
}
