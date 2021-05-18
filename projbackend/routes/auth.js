var express =  require('express');
var router = express.Router();
const { check, validationResult} = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/auth")



// signup route
router.post("/signup",[
    check("name").isLength({min: 3}).withMessage('name must be atleast 5 char long'),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min: 6}).withMessage("password must be of length 6 char long")
], signup);



// signin route
router.post("/signin",[
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min: 1}).withMessage("password field is required")
], signin);






// signout route
router.get("/signout", signout);


router.get("/testroute", isSignedIn, (req,res) => {
    res.json(req.auth)
})

module.exports = router;