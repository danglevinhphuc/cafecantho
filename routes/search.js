var express = require("express");
var Manage  = require("../models/manager");
// MONGODB online
var mongojs = require("mongojs");
var search = express.Router();
//var db = mongojs('mongodb://manager:manager@ds113580.mlab.com:13580/webcafe',['manager']);
search.post("/sanpham",function(req,res){
	var giaTri = req.body.keyword;
	var messages = req.flash("action");
	Manage.find({tenQuan: new RegExp(giaTri, "i")},function(err,docs){
		if(docs.length > 0){
				res.render("manager/index",{
				products : docs,
				messages :messages,
				hasError: messages.length >0
			});
				console.log(docs);
		}else{
			req.flash('action', "Khong tim thay du lieu");
			res.redirect("/");
		}
	});
});

module.exports = search;

