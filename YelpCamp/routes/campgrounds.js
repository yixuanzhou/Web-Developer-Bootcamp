var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

 // INDEX -- SHOW ALL CAMPGROUNDS
router.get("/campgrounds", function(req, res){
	if(req.query.search && req.xhr) {
	    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
	    // Get all campgrounds from DB
	    Campground.find({name: regex}, function(err, allCampgrounds){
	        if(err) console.log(err);
	        else res.status(200).json(allCampgrounds);
	    });
	} else {
		Campground.find({}, function(err, campgrounds){
			if(err) console.log(err);
			else res.render("campgrounds/index", {campgrounds:campgrounds, currentUser: req.user});
		});
	};	
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
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) console.log(err);
		else {
			console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", checkCampgroundOwnership, function(req, res){
		Campround.findById(req, params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
	});
});

// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
	Campround.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) res.redirect("/campgrounds");
		else res.redirect("/campgrounds/" + req.params.id);
	});
});

// DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", checkCampgroundOwnership, function(req, res){
	Campround.findByIdAndRemove(req.params.id, function(err){
		if (err) res.redirect("/campgrounds");
		else res.redirect("/campgrounds");
	});
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
};

function checkCampgroundOwnership(req, res, next) {
	if (req.isAuthenticated()){
		Campround.findById(req.params.id, function(err, foundCampground){
			if (err) {
				req.flash("error", "Campround Not Found!");
				res.redirect("back");
			}
			else {
				if (campground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "Permission Denied!");
					res.redirect("back");
				}				
			}
		});	
	} else {
		req.flash("error", "You Need To Be Logged In!");
		res.redirect("back");
	};	
};

module.exports = router;