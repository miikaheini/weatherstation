var mongoose = require("mongoose");

var locationSchema = new mongoose.Schema({
	city: String,
	image: String,
	tzOffset: Number,
	lon: Number,
	lat: Number,
	observations: [
		{
			time: Date,
			temp: Number,
			condition: String
		}
	]
});

module.exports = mongoose.model("Location", locationSchema);