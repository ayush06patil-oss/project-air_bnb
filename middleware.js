const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError =require('./utils/ExpressError.js');

const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in first");
        return res.redirect("/login");
    }
    next();
}

const saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

const isOwnwer = async (req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const isAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    const listing = await Listing.findById(id);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You not created this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMSg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError("400",errMSg);
    }else{
        next();
    }
};

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMSg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError("400",errMSg);
    }else{
        next();
    }
};

const isLoginForReview = (req,res,next) => {
    let {id} = req.params;
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in first");
        return res.redirect(`../`);
    }
    next();
}

module.exports = { isLoggedIn, saveRedirectUrl,isOwnwer ,isAuthor,validateListing,validateReview,isLoginForReview};