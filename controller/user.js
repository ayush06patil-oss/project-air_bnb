const User = require("../models/user.js");
const passport = require("passport");

const signUpPage =  (req, res) => {
  res.render("userSign/signUp.ejs");
};

const signUp = async (req, res) => {
  let { username, email, password } = req.body;
  const newUser = new User({ username, email });
  const registeredUser = await User.register(newUser, password);
  req.login(registeredUser,(err)=>{
    if(err){
      nexr(err);
    }
    req.flash("success", "Welcome to Wonderlust!");
    res.redirect("/listings");
  })
};

const loginPage =(req, res) => {
  res.render("userSign/login.ejs");
};

const login = async (req, res) => {
    req.flash("success", "Welcome Back to Wonderlust");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};

const logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You logged out successfully");
        res.redirect("/listings");
    });
}

module.exports={signUpPage,signUp,loginPage,login,logout};