var passport = require("passport");
var User = require("../models/user");
var Fb = require("../models/face");
var configAuth = require("./auth");
//neu ng dung dang ki thanh cong thong tin nguoi dung se duoc tao trong csdl
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

//middleware của Passport
//lay thong tin user ma duoc tra ve passport.authenticate xac dinh xem thanh phan nao cua doi tuong do se duoc luu trong session
//sesion user.id
passport.serializeUser(function(user,done){
	done(null,user.id);
});
//ham duoc goi boi passport.session dua vao thong tin luu tren session va gan vao req.user
passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		done(err,user);
	});
});

// chung thuc 
passport.use('local.signup',new LocalStrategy({
	//gia tri mat dinh
	usernameField: 'email',
	passwordField: 'password',
	//cho phep goi kiem tra da dang nhap hay chua
	passReqToCallback: true
},
function(req,email,password,done){

	//su dung express-validatior de kiem tra co rong req tu body hay khong
	req.checkBody('email','Invalid email').notEmpty().isEmail();
	req.checkBody('password','Invalid password').notEmpty().isLength({min:4});
	var errors = req.validationErrors();
	if(errors){
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null,false,req.flash('error',messages));
	}
	//kiem tra email nhap co trung hay khong , ham nay co trong module
	User.findOne({'email': email},function(err,user){
		if(err){
			return done(err);
		}
		if(user){
			//message -> req.flash('message','Email is already in use.');
			//ng dung dang nhap vao co trung vs tai khoang se hien ra tin nhan 
			return done(null,false,{message:"Email is already in use."});
		}
		var newUser = new User();
		newUser.email = email;
		// newUser.encryptPassword(password);->User.build({localemail:email,localpassword: User.encryptPassword(password)})
		newUser.password = newUser.encryptPassword(password);
		//luu lai vao mongodb
		newUser.save(function(err,result){
			if(err){
				return done(err);
			}
			return done(null,newUser);
		});
	});
}));

//chung thuc dang nhap tuong tu
passport.use('local.signin',new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	//cho phep goi kiem tra da dang nhap hay chua
	passReqToCallback: true
},function(req,email,password,done){
	//check form nhap co rong hay loi~ khong
	req.checkBody('email','Invalid email').notEmpty().isEmail();
	req.checkBody('password','Invalid password').notEmpty().isLength({min:4});
	var errors = req.validationErrors();
	if(errors){
		var messages = [];
		errors.forEach(function(error){
			messages.push(error.msg);
		});
		return done(null,false,req.flash('error',messages));
	}
	User.findOne({'email': email},function(err,user){
		if(err){
			return done(err);
		}
		if(!user){
			//message -> req.flash('message','Email is already in use.');
			return done(null,false,{message:"No user found"});
		}
		if(!user.validPassword(password)){
			return done(null,false,{message:"Wrong password."});
		}
		return done(null,user);
	});
}));

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    Fb.findOne({'id':profile.id},function(err,error){
    	if(err)
    		return done(err);

    	if(user)
    		return done(null,user);
    	else{


    		var newUserFb=  new Fb();
    		newUserFb.id  = profile.id;
    		newUserFb.token  = profile.accessToken;
    		newUserFb.name = profile.name.giveName + ' ' + profile.name.familyName;
    		newUserFb.email = profile.emails[0].value;

    		newUserFb.save(function(err){
    			if(err)
    				throw err;
    			return done(null,newUser);
    		})
    	}
    });
    
  }
));