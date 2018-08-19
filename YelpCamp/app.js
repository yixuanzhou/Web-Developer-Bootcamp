var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	flash      = require("connect-flash"),
	Campground = require("./models/campground"),
	seedDB     = require("./seeds"),
	methodOverride = require("method-override"),
	Comment    = require("./models/comment"),
	passport   = require("passport"),
    User       = require("./models/user"),
	LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

var campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes    = require("./routes/comments"),
	indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// call this funtion on all routes
app.use(function(req, res, next){
	res.locals.currentUser = req.user; // Empty if there is not user login
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});