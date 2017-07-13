var express = require("express");
var Manage  = require("../../models/manager");

var postRouter = express.Router();
var multer = require("multer");
// MONGODB online
var mongojs = require("mongojs");

//var db = mongojs('mongodb://manager:manager@ds113580.mlab.com:13580/webcafe',['manager']);



// su dung multer up hinh
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './public/img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }

})
var upload = multer({ storage: storage,
fileFilter: function (req, file, cb) {
 if (file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
  req.fileValidationError = 'goes wrong on the mimetype';
  return cb(null, false, new Error('goes wrong on the mimetype'));
 }
 cb(null, true);
} }).array('linkAnh1[]', 5);
//Them thongtin vao thong qa  post
postRouter.post("/addss",function(req,res){
	upload(req,res,function(err) {
       if(req.fileValidationError) {
            return res.end(req.fileValidationError);
       }else{
       	var product = new Manage();
       	product.email = req.body.email;
		product.moTa = req.body.moTa;
		product.diaDiem = req.body.diaDiem;
		product.ngayThang = req.body.ngayThang;
		product.tenQuan = req.body.tenQuan;
		product.price = req.body.price;
		product.status = true;
		if(req.files[0] != null){
			product.linkAnh1 = req.files[0].filename;	
		}else{
			product.linkAnh1 = "";
		}
		if(req.files[1] != null){
			product.linkAnh2 = req.files[1].filename;	
		}else{
			product.linkAnh2 = "";
		}
		if(req.files[2] != null){
			product.linkAnh3 = req.files[2].filename;	
		}else{
			product.linkAnh3 = "";
		}
		if(req.files[3] != null){
			product.linkAnh4 = req.files[3].filename;	
		}else{
			product.linkAnh4 = "";
		}
		if(req.files[4] != null){
			product.linkAnh5 = req.files[4].filename;
		}else{
			product.linkAnh5 = "";
		}
		product.save(function(err,docs){
			if(err){
				res.send(err);
			}
			
			return docs;
		});
		req.flash('action', "Thêm thành công");
		res.redirect("/xemtatcasp");
       }
   	})
});


// EDit san pham qa post
postRouter.post("/editss",function(req,res){
		upload(req,res,function(err) {
       if(req.fileValidationError) {
            return res.end(req.fileValidationError);
       }else{
       	/* 
			kiem tra neu co hinh moi thi gan vao
			con khong thi lay gia trinh hinh cu~
       	**/
       	var linkAnh1 , linkAnh2 , linkAnh3, linkAnh4,linkAnh5;
       	var product  = {};
       	var id = req.body.id;
		if(req.files[0] != null){
			linkAnh1 = req.files[0].filename;	
		}else{
			linkAnh1= req.body.hinh_an_1;
		}
		if(req.files[1] != null){
			linkAnh2 = req.files[1].filename;	
		}else{
			linkAnh2 = req.body.hinh_an_2;
		}
		if(req.files[2] != null){
			linkAnh3 = req.files[2].filename;	
		}else{
			linkAnh3 = req.body.hinh_an_3;
		}
		if(req.files[3] != null){
			linkAnh4 = req.files[3].filename;	
		}else{
			linkAnh4 = req.body.hinh_an_4;
		}
		if(req.files[4] != null){
			linkAnh5 = req.files[4].filename;	
		}else{
			linkAnh5 = req.body.hinh_an_5;
		}
		Manage.update({_id: mongojs.ObjectId(id)}, {
			moTa: req.body.moTa,
			diaDiem:req.body.diaDiem,
			ngayThang: req.body.ngayThang,
			tenQuan: req.body.tenQuan,
			linkAnh5:linkAnh5,
			linkAnh4:linkAnh4,
			linkAnh3:linkAnh3,
			linkAnh2:linkAnh2,
			linkAnh1:linkAnh1},
			 {new: true},
			  function(err, doc){
    		if(err){
       			 console.log("Something wrong when updating data!");
    		}

    		console.log(doc);
		});
		req.flash('action', "Sửa thành công");
		res.redirect("/xemtatcasp");
       }
   	});
});
module.exports = postRouter;