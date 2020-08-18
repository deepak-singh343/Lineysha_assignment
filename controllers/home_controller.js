const User = require('../models/user');
//registeration
module.exports.home = async function (req, res) {
    return res.render('register', {               //render signUp page
        title: "Booking",
    });
}

//homepage
module.exports.show = async function (req, res) {
    const users=User.find({});
    
    return res.render('home',{
        title:"homepage",
        users,
    })
}


