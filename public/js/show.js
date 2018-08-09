// Select elements for functions and set variables
var timeMin = 0;
var data = parseChartData(observations, tz);
var ctx = document.getElementById("myChart").getContext("2d");
var timeFrames = document.querySelectorAll(".frame");

// Create a clock and input timezone as parameter
function GetClock(tz) {
	var time = moment().tz(tz).format("HH:mm:ss");

	document.getElementById("clockbox").textContent = time;
}

// Get highest and lowest
function getHighLow(observations){
	var highLow = document.getElementById("highLow");

	if (moment(observations[observations.length - 1].t) < moment().add(-1, "day")){
		highLow.textContent = "No observations in 24 hours."
	} else {
		var min = observations[observations.length - 1].y;
		var max = observations[observations.length - 1].y;

		for (var i = observations.length - 1; i >= 0; i--) {
			if (moment(observations[i].t) > moment().add(-1, "day") && observations[i].y < min){
				min = observations[i].y;
			}
			if (moment(observations[i].t) > moment().add(-1, "day") && observations[i].y > max){
				max = observations[i].y;
			}
		}

		highLow.innerHTML = "During last 24 hours highest temperature has been " + max + "&degC and lowest " + min + "&degC."
	}
}

// Parse data for chart
function parseChartData(observations, tz) {
	var data = [];
	var limit = 0;

	for( var i = 0; i < observations.length; i++){
		data.push({t: moment(observations[i].t).tz(tz).format("DD.MM.YYYY, HH:mm"), y: observations[i].y});
	};

	return data;
}

// Draw temperature chart
function drawChart(ctx, data, city, timeFrame) {
	var myChart = new Chart(ctx, {
		type: "line",
		data: {
			datasets: [{
				label: "Temperature",
				data: data,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255,99,132,1)"],
				fill: false,
				borderWidth: 2
			}]
		},
		options: {
			legend: {
				display: false
			},
			responsive: true,
			title: {
				display: true,
				text: "Temperature trend in " + city
			},
			scales: {
				xAxes: [{
					type: "time",
					time: {
						min: timeFrame,
						unit: "day",
						parser: "DD.MM.YYYY, HH:mm"
					},
					display: true,
					scaleLabel: {
						display: true,
						labelString: "Date"
					},
					ticks: {
						major: {
							fontStyle: "bold",
							fontColor: "#FF0000"
						}
					},
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: ""
					},
					ticks: {
						suggestedMin: 0,
						suggestedMax: 30
					}
				}]
			}
		}
	});
}

// Add event listeners to time selection buttons
function initialiseButtons(){
	for (var i = 0; i < timeFrames.length; i++){
		// Add click listeners to time frame buttons
		timeFrames[i].addEventListener("click", function(){
			// Remove highlighting from time frame buttons
			for (var j = 0; j < timeFrames.length; j++){
				timeFrames[j].classList.remove("primary");
			}
			// Add highlighting to selected time frame
			this.classList.add("primary");
			// Grab text from selected time frame button
			var frame = this.textContent;
			// Compare color to pickedColor
			if (frame === "3 days"){
				timeMin = moment().add(-3, "day");
			} else if (frame === "Past week") {
				timeMin = moment().add(-1, "week");
			} else if (frame === "Past month") {
				timeMin = moment().add(-1, "month");
			} else {
				timeMin = 0;
			}
			drawChart(ctx, data, city, timeMin);
		});
	}
}

// Load dynamic content on page load and set update intervals
window.onload = function(){
	GetClock(tz);
	setInterval(function(){GetClock(tz)} , 1000);
	drawChart(ctx, data, city, timeMin);
	initialiseButtons();
	getHighLow(observations);
}
