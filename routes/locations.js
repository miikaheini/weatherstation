// ======================================================
//  ROUTER FOR ALL LOCATION ROUTES IN THE APPLICATION
// ======================================================

// Require packages for this router
var express = require("express"),
	router = express.Router(),
	Location = require("../models/location"),
	moment = require("moment"),
	momentTz = require("moment-timezone"),
	ts = require("../ts");

// Show route for one particular location
router.get("/:id", function(req, res){
	Location.findById(req.params.id, function(err, location){
		if(err){
			console.log(ts() + err);
		} else{
			console.log(ts() + "Opening location: " + location.city);
			res.render("show", {location: location, moment: moment, momentTz: momentTz});
		}
	});
});

// Post route to post new observation for one location
router.post("/:id", function(req, res){
	Location.findById(req.params.id, function(err, location){
		if (err){
			console.log(ts() + err);
			res.redirect("/");
		} else{
			var temp = req.body.observation.temp;
			// Check that temperature input is valid, otherwise don't save to database
			if (temp == "") {
				res.redirect("/locations/" + location._id);
			} else {
				var condition = req.body.observation.condition;
				var time = moment();
				location.observations.push({temp: temp, condition: condition, time: time});
				location.save();
				console.log(ts() + "Added new observation to:" + location.city);
				res.redirect("/locations/" + location._id);
			}
		}
	})
});

module.exports = router;