var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
	email : {type:String,  required:true},
	id_sp: {type:String, required:true},
	price: {type:Number, required:true},
	count : {type:Number, required:true},
	name : {type:String, required:true},
	status: {type: Boolean, required: true}
},{collection: 'shopcart'});

module.exports = mongoose.model("Shopcart",schema);