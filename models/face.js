var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var userSchema= new Schema({
	id: {type: String, required:true},
	token: {type:String, required:true},
	email: {type:String, required:true},
	name: {type:String, required:true}
},{collection: "facebook"});


module.exports = mongoose.model("Facebook",userSchema);