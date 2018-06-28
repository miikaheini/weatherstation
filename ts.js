// Timestamp function for logging purposes
function ts() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds() ];

// If seconds and minutes are less than 10, add a zero
  for ( var i = 0; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
    if ( date[i] < 10 ) {
      date[i] = "0" + date[i];
    }
  }

// If milliseconds is less than 10 or 100 add zeros
  if ( time[3] < 10 ) {
    time[3] = "00" + time[3];
  } else if ( time[3] < 100 ) {
    time[3] = "0" + time[3];
  }

// Return the formatted string
  return date.join("-") + " " + time.join(":") + ": ";
}
// Export ts() function to be used
module.exports = ts;