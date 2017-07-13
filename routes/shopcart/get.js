var express = require("express");
var Shopcart  = require("../../models/shopcart");

var getShopingcart = express.Router();

getShopingcart.get("/xemgiohang",isLoggedIn,function(req,res){
	var total = 0;
	var price_pay = 0;
	var messages = req.flash("action");
	Shopcart.find({email: req.cookies.Email,status:true},function(err,docs){
		for(var i = 0 ; i< docs.length; i++){
			total =total+ docs[i].count;
			price_pay = price_pay + docs[i].price;
		}
		
		res.render("shopingcart/xemgiohang",{products: docs,soluong:total,gia_tra:price_pay,email:req.cookies.Email,messages :messages,
			hasError: messages.length >0});
	});
});
getShopingcart.get("/xoagiohang/:id",isLoggedIn,function(req,res){
	var id = req.params.id;
	
	Shopcart.remove({_id: id},function(err){
		if(err){
			res.send(err);
		}
	});
	req.flash('action', "Xóa thành công");
	res.redirect("/xemgiohang");
});
getShopingcart.get("/lichsu",isLoggedIn,function(req,res){
	var total = 0;
	var price_pay = 0;
	Shopcart.find({email: req.cookies.Email,status:false},function(err,docs){
		for(var i = 0 ; i< docs.length; i++){
			total =total+ docs[i].count;
			price_pay = price_pay + docs[i].price;
		}
		
		res.render("shopingcart/lichsu",{products: docs,soluong:total,gia_tra:price_pay,email:req.cookies.Email});
	});
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}
module.exports =  getShopingcart;