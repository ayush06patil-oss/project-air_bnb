const {listingSchema,reviewSchema}=require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const addReview=async(req,res)=>{
    const{id}=req.params;
    let listing= await Listing.findById(id);
    let newReview=new Review(req.body.Review);
    newReview.author=req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Added!");
    res.redirect(`/listings/${id}`);

}

const destroyReview = async(req,res)=>{
    const{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{review:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}

module.exports={addReview,destroyReview};