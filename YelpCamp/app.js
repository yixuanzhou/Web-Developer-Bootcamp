var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	seedDB     = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing")

})

// INDEX -- SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err) console.log(err);
		else res.render("index", {campgrounds:campgrounds});
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
	res.render("new.ejs");
})

// SHOW -- SHOW MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req,res){
	//Find the campground with provided ID
	Campround.FindById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if (err) console.log(err);
		else {
			console.log(foundCampground);
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});