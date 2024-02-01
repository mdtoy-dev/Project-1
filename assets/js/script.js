var apikey = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
var country = "GB";
var year = 2024;
var queryURL =
  "https://calendarific.com/api/v2/holidays?&api_key=" +
  apikey +
  "&country=" +
  country +
  "&year=" +
  year;

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var holidays = data.response.holidays;
    console.log(holidays);
    var main = document.querySelector(".test");
    for (let i = 0; i < holidays.length; i++) {
      var dayObject = holidays[i];
      var holidayName = dayObject.name;
      console.log(holidayName);
      var pName = document.createElement("p");
      pName.setAttribute("class", "my-2 mx-2");
      pName.textContent = holidayName;
      main.appendChild(pName);
    }
  });

var titles = "New_Year's_Day";
var wikiQueryURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${titles}&origin=*&formatversion=2`;

fetch(wikiQueryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
