// ======================================================
//  ROUTER FOR ALL GENERIC ROUTES IN THE APPLICATION
// ======================================================

// Require packages for this router
var express = require("express"),
	router = express.Router(),
	Location = require("../models/location"),
	moment = require("moment"),
	momentTz = require("moment-timezone"),
	ts = require("../ts");

// Route for the landing page
router.get("/", function(req, res){
	Location.find({}, function(err, locations){
		if(err){
			console.log(ts() + err);
		} else{
			res.render("landing", {locations: locations, moment: moment, momentTz: momentTz});
		}
	});
});

// Route for about page
router.get("/about", function(req, res){
	res.render("about");
});

module.exports = router;