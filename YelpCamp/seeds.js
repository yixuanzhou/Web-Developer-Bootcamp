var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
	 	image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5259404.jpg",
	 	description: "Test sirloin doner.",	 	
	},
	{
		name: "Granite Hill",
	 	image: "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
	 	description: "Test sirloin doner."
	},
	{
		name: "Desert Mesa",
	 	image: "https://www.nps.gov/nabr/planyourvisit/images/campground_utahscyncty.jpg",
	 	description: "Test sirloin doner."
	},
	{
		name: "Liza Bovec",
	 	image: "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-1.jpg",
	 	description: "Test sirloin doner."
	}
];

function seedDB(){
	//Remove all campgrounds
	Campground.remove({}, function(err){
		if (err) console.log(err);		
		console.log("Remove all campgrounds");
		//Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if (err) console.log(err);
				else {
					console.log("Added new data");
					Comment.create(
					{
						text: "This place is great, but I wish there was internet.",
						author: "Yixuan"
					}, function(err, comment){
						if (err) console.log(err);
						else {
							campground.comments.push(comment);
							campground.save();
							console.log("create new comment");
						};					
					});
				};
			});
		});
	});
};

module.exports = seedDB;