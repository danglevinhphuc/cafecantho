var express = require('express');
var router = express.Router();
var User = require("../models/user");
var passport = require('passport');
var csrf = require('csurf');//ma hoa
var csrfProtection = csrf();
router.use(csrfProtection);

//var mongojs = require("mongojs");

//var db = mongojs('mongodb://manager:manager@ds113580.mlab.com:13580/webcafe',['user']);

//ham chuyen ve trang chu khi goi logout
router.get("/logout",isLoggedIn,function(req,res,next){
	req.logout();
	res.clearCookie('Email');
	res.redirect("/");
});

router.use("/",notLoggedIn,function(req,res,next){
	next();
});
/*** Get singup ***/
router.get("/signup",function(req,res){
	var message = req.flash('error');
	res.render('users/signup',{ csrfToken: req.csrfToken(), messages :message,hasError: message.length >0});
})

router.post("/signup",passport.authenticate('local.signup',{
	//cau hinh dang ky
	successRedirect: '/',
	failureRedirect: '/user/signup',
	failureFlash :true	
}));
router.get('/signin',function(req,res,next){
	var messages = req.flash('error');
	res.render('users/signin',{
		csrfToken: req.csrfToken(),//ma hoa 
		messages:messages,
		hasErrors:messages.length > 0
	});
});
//neu danh nhap thanh cong va that bai
router.post('/signin',passport.authenticate('local.signin',{
	//cau hinh dang nhap
	successRedirect: '/',
	failureRedirect: '/user/signin',
	failureFlash: true
}));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/profile',
                                      failureRedirect: '/' }));

module.exports = router;

//2 ham nay chuc nang kiem tra co ton tai tai khoang hay chua neu co thi k can dang nhap signin hay dang ky signout
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}
function notLoggedIn(req,res,next){
	if(!req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}