// =============================================
//  Main application for the WeatherStation app
// =============================================

// Require packages for the application
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	moment = require("moment"),
	momentTz = require("moment-timezone"),
	ts = require("./ts"),
	Location = require("./models/location"),
	seedDB = require("./seed");

// Require route files
var indexRoutes = require("./routes/index"),
	// adminRoutes = require("./routes/admin"),
	locationRoutes = require("./routes/locations");

// Set general variables for the application
require("dotenv").config();

// Connect to MongoDB database
mongoose.connect(process.env.DBURL, function(err){
	if(err){
		console.log(err);
	} else{
		console.log(ts() + "Connected to database");
	}
});

// Configure packages for Express
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// Run database seeding script to first empty possibly existing data and crete base data
seedDB();

// Declare routes for the application
app.use("/", indexRoutes);
// app.use("/admin", adminRoutes);
app.use("/locations", locationRoutes);


// Start the application server and listen for incoming connections
app.listen(process.env.PORT, process.env.IP, function(){
	console.log(ts() + "WeatherLogger is listening incoming connections on port " + process.env.PORT + "...");
});