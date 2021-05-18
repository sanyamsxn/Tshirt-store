const express = require("express")
const router = express.Router();

const {getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");



// all of params
router.param("userId", getUserById)
router.param("productId", getProductById)


// all of actual routes



// route to create product
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)


// get route
router.get("/product/:productId", getProduct)

// get product photo
router.get("/product/photo/:productId", photo)


// delete route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)


// update route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)


// listing route
router.get("/products", getAllProducts)



// list all unique categories
router.get("/product/categories", getAllUniqueCategories)
module.exports = router;