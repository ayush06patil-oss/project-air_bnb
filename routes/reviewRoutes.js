const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError =require('../utils/ExpressError.js');
const {reviewSchema}=require("../schema.js");
const wrapAsync =require('../utils/wrapAsync.js');
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isAuthor, validateReview,isLoginForReview}= require("../middleware.js");
const reviewController = require("../controller/review.js");


//Review Post Route
router.post("/",validateReview,isLoginForReview,wrapAsync(reviewController.addReview));

//Delete Review Route
router.delete("/:reviewId",isLoginForReview,isAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;