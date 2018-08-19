var express = require("express");
var router = express.Router();
var Campround = require("../models/campground");
var Comment = require("../models/comment");

router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
	Campround.findById(req.params.id, function(err, campground){
		if(err) console.log(err);
		else {
			res.render("comments/new", {campground: campground});
		}
	});	
});

router.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
	Campround.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
					req.flash("error", "Something Went Wrong!");
				}
				else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully Added Comment!");
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
});

// EDIT COMMENT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit", checkCommentOwnership, function(req, res){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
	});
});

// UPDATE COMMENT ROUTE
router.put("/campgrounds/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) res.redirect("/back");
		else res.redirect("/campgrounds/" + req.params.id);
	});
});

// DESTROY COMMENT ROUTE
router.delete("/campgrounds/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) res.redirect("back");
		else {
			req.flash("success", "Comment Deleted!");
			res.redirect("/campgrounds" + req.params.id);
		}
	});
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect("/login");
};

function checkCommentOwnership(req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err) res.redirect("back");
			else {
				if (foundComment.author.id.equals(req.user._id)) {
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