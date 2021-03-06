var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var userSchema= new Schema({
	email: {type: String, required:true},
	password: {type:String, required:true}
},{collection: "users"});
//ham bam password
userSchema.methods.encryptPassword = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
//kim tra password ng dung nhap vao voi pass co trong csdl dung trong form login
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password);
};

module.exports = mongoose.model("User",userSchema);