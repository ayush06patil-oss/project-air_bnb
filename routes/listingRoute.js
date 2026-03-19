const express = require("express");
const router = express.Router();
const wrapAsync =require('../utils/wrapAsync.js');
const ExpressError =require('../utils/ExpressError.js');
const Listing = require("../models/listing.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn,isOwnwer,validateListing}= require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(listingController.index))                   //index route
.post(isLoggedIn, upload.single("Listing[image]"), validateListing, wrapAsync(listingController.addList));             //add route

//new route
router.get("/new",isLoggedIn,listingController.addNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showPage))                 //show route
.put(isLoggedIn,isOwnwer, upload.single("Listing[image]"), validateListing, wrapAsync(listingController.updateListing))     //update route
.delete(isLoggedIn,isOwnwer ,wrapAsync(listingController.destroy));       //delete route


//edit route
router.get("/:id/edit",isLoggedIn,isOwnwer, validateListing ,wrapAsync(listingController.editForm));



module.exports=router;