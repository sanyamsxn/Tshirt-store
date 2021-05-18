
const User = require("../models/user");
const {check, validationResult} = require("express-validator");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {

    const errors = validationResult(req);
   

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }



    const user = new User(req.body);
    user.save((error, user) => {
        if(error || !user) {
            console.log("print:" + error)
            return res.status(400).json({
                error : "NOT able to save user in Database"
            });
        }
        res.json(user)
    });
};



exports.signin = (req, res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }


    User.findOne({email}, (error, user) => {

    if(error || !user) {          // here we can add a if block to check if there is error we want to print different msg
                                // if no user then print different msg.
        return res.status(400).json({
            error: "User not found"
        })
    }

    if(!user.authenticate(password)) {
        return res.status(401).json({
            error: "email and password do not match"
        })
    }

    // after authentication

    // creating token
    const token = jwt.sign({_id : user._id}, process.env.secret)

    // put token in cookie
    res.cookie("token", token, {expire: new Date() + 9999});

    // send response to front end also
    const {_id, name, email, role} = user;
    return res.json({token, user: {_id, name, email, role}});

})

}



exports.signout = (req, res) => {
    res.clearCookie("token")    // clearing token from the cookie from user's browser

    res.json({
        message: "User signout successfully"
    })
}



// creating a protected route:
exports.isSignedIn = expressJwt({
    secret : process.env.secret,
    userProperty : "auth"
})


// custom middlewares

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next()
}


exports.isAdmin = (req,res,next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Only admins are allowed"
        })
    }
    next()
}




