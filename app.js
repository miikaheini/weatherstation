var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var moment = require("moment");
var momentTz = require("moment-timezone");
var ts = require("./ts");
var Location = require("./models/location");
var seedDB = require("./seed");

// Set ports and IPs for listening
const PORT = "3000";
const IP = "0.0.0.0";
const DBuri = "mongodb://192.168.20.1/weatherstation";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Connect to MongoDB
mongoose.connect(DBuri, function(err){
	if(err){
		console.log(err);
	} else{
		console.log(ts() + "Connected to database");
	}
});


seedDB();


app.get("/", function(req, res){
	Location.find({}, function(err, locations){
		if(err){
			console.log(ts() + err);
		} else{
			res.render("landing", {locations: locations, moment: moment, momentTz: momentTz});
		}
	});
});

app.get("/locations/:id", function(req, res){
	Location.findById(req.params.id, function(err, location){
		if(err){
			console.log(ts() + err);
		} else{
			console.log(ts() + "Opening location: " + location.city);
			res.render("show", {location: location, moment: moment, momentTz: momentTz});
		}
	});
});

app.post("/locations/:id/", function(req, res){
	Location.findById(req.params.id, function(err, location){
		if (err){
			console.log(ts() + err);
			res.redirect("/");
		} else{
			var temp = req.body.observation.temp;
			var condition = req.body.observation.condition;
			var time = moment();
			location.observations.push({temp: temp, condition: condition, time: time});
			location.save();
			console.log(ts() + "Added new observation to:" + location.city);
			res.redirect("/locations/" + location._id);
		}
	})
});

app.get("/about", function(req, res){
	res.render("about");
});


// Start the application server and listen for incoming connections
app.listen(PORT, IP, function(){
	console.log(ts() + "WeatherLogger is listening incoming connections on port " + PORT + "...");
});