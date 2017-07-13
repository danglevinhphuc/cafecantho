var express = require("express");
var Manage  = require("../../models/manager");
var requestIp = require('request-ip');
var mongojs = require("mongojs");
var getRouter = express.Router();

// MONGODB online
//var db = mongojs('mongodb://manager:manager@ds113580.mlab.com:13580/webcafe',['manager']);
getRouter.get("/",function(req,res){
	
	var messages = req.flash("error");
	Manage.find(function(err,docs){
		res.render("manager/index",{
			products : docs,
		});
	});
	/*db.manager.find(function(err,docs){
    	res.render("manager/index",{
			products : docs,
			hasError: messages.length >0,
			messages :messages
		});
	});*/
});
getRouter.get("/xemtatcasp",isLoggedIn,function(req,res){
	var email = req.cookies.Email;
	var messages = req.flash("action");
	Manage.find({email: email},function(err,docs){
		res.render("manager/xemtatcasp",{
			products : docs,
			messages :messages,
			hasError: messages.length >0
		});
	});
	/*db.manager.find(function(err,docs){
    	res.render("manager/xemtatcasp",{
			products : docs,
			messages :messages,
			hasError: messages.length >0
		});
	});*/
});
getRouter.get("/adds",isLoggedIn,function(req,res){
	// get EMAIL qua COOKIE
	var email = req.cookies.Email;
	res.render("manager/add_tour",{email: email});
});

// Chuc nang xoa thong qua get
getRouter.get("/delete/:name",isLoggedIn,function(req,res){
	var id = req.params.name;
	Manage.remove({_id: id},function(err){
		if(err){
			res.send(err);
		}

	});
	/*db.manager.remove({_id: mongojs.ObjectId(id)},function(err,docs){
        if(err){
			res.send(err);
		}
		
    });*/
	req.flash('action', "Xóa thành công");
	res.redirect("/xemtatcasp");
});

// Chức năng sửa thông tin bài đăng
getRouter.get("/edit/:name",isLoggedIn,function(req,res){
	var id = req.params.name;
	Manage.findById(id,function(err,docs){
		if(err){
			res.send(err);
		}
		res.render("manager/edit",{
			products : docs
		});
	});
	/*db.manager.findOne({_id: mongojs.ObjectId(id)},function(err,docs){
        if(err){
			res.send(err);
		}
		res.render("manager/edit",{
			products : docs
		});
    });*/
});
getRouter.get("/xemchitiet/:id",function(req,res){
	var id = req.params.id;
	var email = req.cookies.Email;
	var messages = req.flash("action");
	
	Manage.findById(id,function(err,docs){
		if(err){
			res.send(err);
		}
		res.render("manager/xemchitiet",{
			products : docs,
			email :email,
			messages :messages,
			hasError: messages.length >0
		});
		console.log(messages);
	});
});
module.exports = getRouter;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}