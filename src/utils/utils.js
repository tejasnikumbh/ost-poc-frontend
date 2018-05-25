export function getProperDate(dateString) {
  var date = new Date(dateString);
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayName = days[date.getDay()];
  var months= ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var monthName = months[date.getMonth()];
  var formatted = `${dayName}, ${date.getDate()} ${monthName} - ${date.getFullYear()}`;
  return formatted;
}

export function getProperTime(dateString) {
  var date = new Date(dateString);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}
