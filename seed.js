var mongoose = require("mongoose");
var moment = require("moment");
var momentTz = require("moment-timezone");
var Location = require("./models/location");
var ts = require("./ts");

var obsHel = [];
var obsTok = [];
var obsNYC = [];
var obsAms = [];
var obsDub = [];
var cond = ["Clear", "Overcast", "Sunny", "Cloudy", "Rainy"];

for (var i = -45; i < 1; i++) {
	obsHel.push({
		time: moment().add(i, "day"),
		temp: Math.floor(Math.random() * (35 - 13 + 1)) + 13,
		condition: cond[Math.floor(Math.random() * 5)]
	});

	obsTok.push({
		time: moment().add(i, "day"),
		temp: Math.floor(Math.random() * (35 - 13 + 1)) + 13,
		condition: cond[Math.floor(Math.random() * 5)]
	});

	obsNYC.push({
		time: moment().add(i, "day"),
		temp: Math.floor(Math.random() * (35 - 13 + 1)) + 13,
		condition: cond[Math.floor(Math.random() * 5)]
	});

	obsAms.push({
		time: moment().add(i, "day"),
		temp: Math.floor(Math.random() * (35 - 13 + 1)) + 13,
		condition: cond[Math.floor(Math.random() * 5)]
	});

	obsDub.push({
		time: moment().add(i, "day"),
		temp: Math.floor(Math.random() * (35 - 13 + 1)) + 13,
		condition: cond[Math.floor(Math.random() * 5)]
	});
}

var data = [
	{
		city: "Helsinki",
		image: "https://www.m-brain.com/wp-content/uploads/2017/04/Visit-Helsinki-2-M-Brain.jpg",
		tz: "Europe/Helsinki",
		lon: 24.9490830,
		lat: 60.1697530,
		observations: obsHel
	},
	{
		city: "Tokyo",
		image: "https://media.timeout.com/images/103941355/image.jpg",
		tz: "Asia/Tokyo",
		lon: 139.7328635,
		lat: 35.6584421,
		observations: obsTok
	},
	{
		city: "New York",
		image: "https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg",
		tz: "America/New_York",
		lon: -73.9938438,
		lat: 40.7406905,
		observations: obsNYC
	},
	{
		city: "Amsterdam",
		image: "https://www.myholidayguru.co.uk/wp-content/uploads/2017/10/Zuiderkerk-in-Amsterdam-iStock-528503566-2_titel.jpg",
		tz: "Europe/Amsterdam",
		lon: 4.9040238,
		lat: 52.3650691,
		observations: obsAms
	},
	{
		city: "Dubai",
		image: "https://www.missaestheticbeauty.com/wp-content/uploads/2018/03/About-Dubai-1.jpg",
		tz: "Asia/Dubai",
		lon: 55.1562243,
		lat: 25.092535,
		observations: obsDub
	}
];

function seedDB(){
	// Remove all courses from database
	Location.remove({}, function(err){
		if(err){
			console.log(ts() + err);
		} else{
			console.log(ts() + "Location database cleared!");
			// Create courses to database in data array
			data.forEach(function(seed){
				Location.create(seed, function(err, location){
					if(err){
						console.log(ts() + err);
					} else{
						console.log(ts() + "Added location to database: " + location.city);
					}
				});
			});
		}
	});
}

module.exports = seedDB;