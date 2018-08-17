var express = require("express");
var router = express.Router();
var Campround = require("../models/campground");

 // INDEX -- SHOW ALL CAMPGROUNDS
router.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err) console.log(err);
		else res.render("campground/index", {campgrounds:campgrounds, currentUser: req.user});
	});
});

// CREATE -- ADD NEW CAMPGROUND TO DB
router.post("/campgrounds", isLoggedIn, function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author};
	// create new campground and save to db
	Campground.create(newCampground, function(err, newCreated){
		if (err) console.log(err);
		else res.redirect("/campgrounds"); // redirect back to campgrounds page
	});
})

// NEW -- SHOW FROM TO CREATE NEW CAMPGROUND
router.get("/campgrounds/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new.ejs");
})

// SHOW -- SHOW MORE INFO ABOUT ONE CAMPGROUND
router.get("/campgrounds/:id", function(req, res){
	//Find the campground with provided ID
	Campround.FindById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) console.log(err);
		else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = router;