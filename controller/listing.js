const Listing = require("../models/listing.js");
const {listingSchema}=require("../schema.js");

const index=async (req,res)=>{
    const listData= await Listing.find({});
    res.render("listings/index.ejs",{listData});
};

const addNewForm =(req,res)=>{
    res.render("listings/new.ejs");
};

const showPage= async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate({path:"review",populate:({path:"author"})}).populate("owner");
    res.render("listings/show.ejs",{listing});
};

const addList= async (req,res)=>{
    const newData=new Listing(req.body.Listing);
    newData.owner=req.user._id;
    if (req.file) {
      newData.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }
    await newData.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

const editForm =async (req,res)=>{
    const{id}=req.params;
    const editData= await Listing.findById(id);
    res.render("listings/edit.ejs",{editData});
};

const updateListing =async (req,res)=>{
    const{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    let updatedData = {...req.body.Listing};
    if (req.file) {
      updatedData.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }
    await Listing.findByIdAndUpdate(id, updatedData);
    req.flash("success","Listing Edited Successfully!");
    res.redirect(`../listings/${id}`);
};

const destroy = async (req,res)=>{
    const{id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};

module.exports={index,addNewForm,showPage,addList,editForm,updateListing,destroy};