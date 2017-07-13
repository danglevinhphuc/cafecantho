var express=  require('express');
var path = require('path');
var io = require('socket.io');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHandler = require('express-handlebars');
var shopcart = require("./routes/shoping");
var manager = require("./routes/manager");
var user = require("./routes/user");
var search = require("./routes/search");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');
var flash = require("connect-flash");
var validator = require("express-validator");
var multer = require("multer");
var app = express();
mongoose.connect('localhost:27017/shopping');
require('./config/passport');
//View engine
//app.set("views",path.join(__dirname , 'views'));
//Su dung express handlebar de mac dinh teample default
app.engine('.hbs',expressHandler({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine','.hbs');


//get param
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// goi cookie
app.use(cookieParser());
// goi session
app.use(session(
	{secret: 'mysupersecret',
	resave: false ,
	saveUninitialized: false
}
));
app.use(express.static(path.join(__dirname,'public')));
app.use(validator());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	var email = [];
	res.locals.login = req.isAuthenticated();
	if(req.user){
		// Tao moi 1 cookie co user để phân quyền cho ng dung 
		email = req.user.email;
		res.cookie("Email",email,{expires: new Date() + 9999,maxAge:9999});
		
	}
	next();
});
app.use(shopcart);
app.use('/',manager);
app.use("/user",user);
app.use("/search",search);

app.use("*",function(req,res){
	res.send("404");
});



// inside middleware handler
app.listen(process.env.PORT || 3000,function(){
	console.log("connect node");
});

