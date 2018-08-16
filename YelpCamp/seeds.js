var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest", 
	 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWHYh1SC1qIQGF2iE5Y0DY8uaTH2rKHAuatY8PZmUXNybEUMn",
	 	description: "adsa"
	},
	{
		name: "Cloud's Rest", 
	 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWHYh1SC1qIQGF2iE5Y0DY8uaTH2rKHAuatY8PZmUXNybEUMn",
	 	description: "adsa"
	},
	{
		name: "Cloud's Rest", 
	 	image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWHYh1SC1qIQGF2iE5Y0DY8uaTH2rKHAuatY8PZmUXNybEUMn",
	 	description: "adsa"
	}
];

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if (err) console.log(err);
		else {
			console.log("Remove all campgrounds");
			//Add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if (err) console.log(err);
					else {
						console.log("Added new data");
						Comment.create(
						{
							text: "This place is grate!",
							author: "yixuan"
						}, function(err, comment){
							if (err) console.log(err);
							else {
								campground.comments.push(comment);
								campground.save();
								console.log("create new comment");
							};							
						})
					}
				});
			});
		}
	});
};

module.exports = seedDB;