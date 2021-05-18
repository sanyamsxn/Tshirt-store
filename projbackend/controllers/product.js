const Product = require("../models/product")
const formidable = require("formidable");
const _ = require("lodash")
const fs = require("fs");

// getting product by Id
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")         // will understand this line later
    .exec((error, product) => {
        if(error){
            return res.status(400).json({
                error : "Unable to find Product"
            })
        }
        req.product = product;
        next();
    })
    
}

// create Product
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error: "problem with image"
            })
        }
        // destructure the fields
        const {name, description, price, category, stock} = fields

        // restrictions

        if(
            !name || !description || !price || !category || !stock
        ) {
            return res.status(400).json({
                error : "please include all fields"
            })
        }

        let product = new Product(fields)

        // handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        console.log(product)
        // save to the DB
        product.save((error, product) => {
            if(error){
                return res.status(400).json({
                    error : "SAving Tshirts into Db failed"
                })
            }
            res.json(product)
        })
    })
}


// getting product without photo as the photo data takes so much time
exports.getProduct = (req, res) => {

    req.product.photo = undefined
    return res.json(req.product)
}


// middleware
exports.photo = (req, res, next) => {
    if(req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}


// delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((error, deletedProduct) => {
        if(error){
            return res.status(400).json({
                error : "failed to delete the product"
            })
        }
        res.json({
            message :  ` Successfully deleted ${product} `
        })
    })
}



// update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error: "problem with image"
            })
        }

        // updation code
        let product = req.product
        product = _.extend(product, fields)

        // handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
    

        // save to the DB
        product.save((error, product) => {
            if(error){
                return res.status(400).json({
                    error : "updation of product failed"
                })
            }
            res.json(product)
        })
    })
}


// product listing
exports.getAllProducts = (req, res) => {
    let Limit = req.query.Limit ? parseInt(req.query.Limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(Limit)
    .exec((error, products) => {
        if(error){
            return res.status(400).json({
                error : "No Products were found in DB"
            })
        }
        res.json(products)
    })
}



// update inventory
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map( prod => {
        return {
            updateOne : {
                filter : { _id : prod._id},
                update : { $inc: { stock : -prod.count, sold : +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (error, products) => {
        if(error){
            return res.status(400).json({
                error : " Bulk Operations failed"
            })
        }
        next()
    })
}



// list all unique categories
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (error, category) => {
        if(error) {
            return res.status(400).json({
                error : "No Categories Found"
            })
        }
        res.json(category)
    } )
}