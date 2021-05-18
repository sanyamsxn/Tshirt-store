const User = require("../models/user")
const Order = require("../models/order")





exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) =>{
        if(error || !user) {
            return res.status(400).json({
                error : "No User was found in DB"
            })
        }

        req.profile = user
        next();
    })
}


exports.getUser = (req, res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}



exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify: false},
        (error, user) => {
            if(error){
                return res.status(400).json({
                    error : "You are not authorized"
                })
            }
            req.profile = user
            req.profile.salt = undefined
            req.profile.encry_password = undefined
            req.profile.createdAt = undefined
            req.profile.updatedAt = undefined
            res.json(user)
        }
    )
}




exports.userPurchaseList = (req, res) => {
    Order.find({user : req.profile._id})
    .populate("user", "_id name")
    .exec((error, order) => {
        if(error){
            return res.status(400).json({
                error: " No Order in this account"
            })
        }
        return res.json(order)
    })
}




exports.pushOrderInPurchaseList = (req, res, next) => {
    
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push ({
            _id : product._id,
            name : product.name,
            description : product.description,
            category : product.category,
            quantity : product.quantity,
            amount : req.body.order.amount,
            transaction_id : req.body.order.transaction_id
        })
    })

    // storing it in DB
    User.findOneAndUpdate({
        _id : req.profile._id},
        {$push : {purchases : purchases}},
        {new : true},
        (error, purchases) => {
            if(error){
                return res.status(400).json({
                    error : "Unable to save purchases"
                })
            }
            next()
        })

}


