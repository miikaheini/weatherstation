// Create a clock and input timezone as parameter
function GetClock(tz) {
	var time = moment().tz(tz).format("HH:mm:ss");

	document.getElementById("clockbox").textContent = time;
}

// Parse data for chart
function parseChartData() {
	var data = [ 
	{t: moment(), y: 10},
	{t: moment().add(12, "hour"), y: 12},
	{t: moment().add(1, "day"), y: 8},
	{t: moment().add(36, "hour"), y: 19},
	{t: moment().add(2, "day"), y: 15}
	];

	return data;
}

// Draw temperature chart
function drawChart(data, city) {
	var ctx = document.getElementById("myChart").getContext("2d");
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
					time: {
						unit: "day"
					}
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

// Load dynamic content on page load and set update intervals
window.onload = function(){
	// formatDates(tz);
	GetClock(tz);
	setInterval(function(){GetClock(tz)} , 1000);
	drawChart(parseChartData(), city);
}
