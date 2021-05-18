const express = require("express");
const router = express.Router();

const {getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category")
const {getUserById} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const category = require("../models/category");


// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);



// actual routers goes here --->


router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory)

// route for single category
router.get("/category/:categoryId", getCategory)


// route for all categories
router.get("/categories", getAllCategory)


// update route
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory)


// delete route
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory)




module.exports  = router         // exports all the routes to the router

