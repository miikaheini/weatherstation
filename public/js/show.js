function GetClock(tzOffset) {
	var currentDate = new Date();
	var currentHours = currentDate.getUTCHours() + tzOffset;
	var currentMinutes = currentDate.getUTCMinutes();
	var currentSeconds= currentDate.getUTCSeconds();

	if (currentHours < 10) {
		currentHours = "0" + currentHours;
	}

	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}

	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds;
	}

	document.getElementById("clockbox").textContent = "" + currentHours + ":" + currentMinutes + ":" + currentSeconds + "";
}

window.onload = function(){
	GetClock(tzOffset);
	setInterval(function(){GetClock(tzOffset)} , 1000);
}