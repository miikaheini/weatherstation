// Create a clock and input timezone as parameter
function GetClock(tz) {
	var time = moment().tz(tz).format("HH:mm:ss");

	document.getElementById("clockbox").textContent = time;
}

// Load dynamic content on page load and set update intervals
window.onload = function(){
	GetClock(tz);
	setInterval(function(){GetClock(tz)} , 1000);
}