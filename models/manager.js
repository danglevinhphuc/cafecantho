var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	email : {type:String,  required:true},
	linkAnh1 : {type:String, required:false},
	linkAnh2 : {type:String, required:false},
	linkAnh3 : {type:String, required:false},
	linkAnh4 : {type:String, required:false},
	linkAnh5 : {type:String, required:false},

	moTa: {type:String, required:true},
	diaDiem : {type:String, required:true},
	ngayThang : {type:String , required:true},
	tenQuan :{ type:String, required:true},
	price : {type: Number, required:true}
	
},{collection: 'manager'});

module.exports = mongoose.model("Manage",schema);