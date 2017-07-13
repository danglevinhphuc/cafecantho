var express = require("express");
var Shopcart  = require("../../models/shopcart");

var postShopingcart = express.Router();

postShopingcart.post("/shopcart",isLoggedIn,function(req,res){
	Shopcart.find({id_sp: req.body.id_sp,email:req.cookies.Email,status:true},function(err,docs){
		if(docs.length > 0){
			Shopcart.update({_id: docs[0]._id}, 
			{
				email: docs[0].email,
				id_sp: docs[0].id_sp,
				price:  (docs[0].count + req.body.count)*req.body.price,
				count: parseInt(docs[0].count) + parseInt(req.body.count),
				name: docs[0].name,
				status: true
			},
			{new: true},
			function(err, doc){
				if(err){
					console.log("Something wrong when updating data!");
				}

				console.log(doc);
			});
			req.flash('action', "Thêm vào giỏ thành công");
			res.redirect("/xemchitiet/"+req.body.id_sp);
		//console.log(docs[0].email);
		
	}else{
		newProduct = new Shopcart();
		newProduct.email = req.body.email;
		newProduct.id_sp = req.body.id_sp;
		newProduct.price = req.body.price*req.body.count;
		newProduct.count = req.body.count;
		newProduct.name = req.body.name;
		newProduct.status = true;
		newProduct.save(function(err,docs){
			if(err){
				res.send(err);
			}
			return docs;
		});
		req.flash('action', "Thêm vào giỏ thành công");
		res.redirect("/xemchitiet/"+req.body.id_sp);
		console.log("ok");
	}
});
});
postShopingcart.post("/thanhtoan",function(req,res){
	/*Shopcart.remove({email: req.body.email},function(err){
		if(err){
			res.send(err);
		}
	});*/
	Shopcart.find({email: req.body.email,status:true},function(err,docs){
		if(err){
			res.send(err);
		}else{
			if(docs.length >0){
				for(var i= 0 ; i< docs.length; i++){
					Shopcart.update({_id: docs[i]._id}, 
					{
						email: docs[i].email,
						id_sp: docs[i].id_sp,
						price: docs[i].price,
						count: parseInt(docs[i].count),
						name: docs[i].name,
						status: false
					},
					{new: true},
					function(err, doc){
						if(err){
							console.log("Something wrong when updating data!");
						}
					});
				}
			}
		}
	});
	req.flash('action', "Thanh toán thành công");
	res.redirect("/xemgiohang");
});
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}
module.exports = postShopingcart;