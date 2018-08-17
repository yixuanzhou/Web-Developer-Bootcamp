var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB     = require("./seeds"),
	Comment    = require("./models/comment");
	passport   = require("passport"),
    User       = require("./models/user"),
	LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();
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
	next();
});

// ROUTES
app.get("/", function(req, res){
	res.render("landing")

})

// INDEX -- SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err) console.log(err);
		else res.render("campground/index", {campgrounds:campgrounds, currentUser: req.user});
	});
});

// CREATE -- ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description:description };
	// create new campground and save to db
	Campground.create(newCampground, function(err, newCreated){
		if (err) console.log(err);
		else res.redirect("/campgrounds"); // redirect back to campgrounds page
	});
})

// NEW -- SHOW FROM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new.ejs");
})

// SHOW -- SHOW MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res){
	//Find the campground with provided ID
	Campround.FindById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) console.log(err);
		else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campround.FindById(req.params.id, function(err, campground){
		if(err) console.log(err);
		else {
			res.render("comments/new", {campground: campground});
		}
	});	
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campround.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) console.log(err);
				else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campground/"+campground._id);
				}
			})

		}
	})
});

// Auth Route
// show sign up form
app.get("/register", function(req, res){
	res.render("register");
});
// handle sign up logic
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	})
});

// LOGIN ROUTES
// render login form
app.get("/login", function(req, res){
	res.render("login");
});

// login logic
// middleware: codes run before final callback
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), function(req, res){
	
});

// logout logic
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});