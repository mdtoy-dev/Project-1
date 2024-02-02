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

function clickEvent(index, description) {
  console.log("Clicked!");
  console.log("index: " + index);
  console.log("description: " + description);
  var pDescription = document.getElementById("infoDescription");
  var clickedId = "p" + index;
  var pClicked = document.getElementById(clickedId);
  pDescription.textContent = description;
}

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var pDescription = document.createElement("p");
    pDescription.setAttribute("id", "infoDescription");
    pDescription.setAttribute("class", "ms-auto my-2 me-2");
    var main = document.querySelector(".test");
    main.appendChild(pDescription);
    var holidays = data.response.holidays;
    for (let i = 0; i < holidays.length; i++) {
      let dayObject = holidays[i];
      var holidayName = dayObject.name;
      let holidayDescription = dayObject.description;
      var pName = document.createElement("p");
      pName.setAttribute("class", "my-2 mx-2");
      var idToSet = "p" + i.toString();
      pName.setAttribute("id", idToSet);
      pName.textContent = holidayName;

      pName.onclick = function () {
        clickEvent(i, holidayDescription);
      };
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
