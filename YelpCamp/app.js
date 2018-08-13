var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing")

})

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Salmon Creek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh1IhLxwuWb0uZ9xoeUsohFsB65TwtM318cLHxvZcGcnxqhKaQ"},
	    {name: "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6HUhwy8SjpufLpCxDAE-P3O_sls5BCywalrMCpLLF9k1ZoCYg9A"},
	    {name: "Mountain Goat's Rest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sSrQeVBEsigi8ub-FuEjNus92buQ1M4j9feaIorI_vVIbuzK8g"}
	]
	res.render("campgrounds", {campgrounds:campgrounds});

});

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	// redirect back to campgrounds page
	res.redirect("/campgrounds");
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
})

app.listen(3000, function(){
	console.log("The YelpCamp Server Has Started!");
});