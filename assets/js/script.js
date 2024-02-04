// fetch countries and flags.
// let apiKey1 = 'IZ3Jet89Cn5Z6VkL7lFYgkqB7TJ4XM9h'
let apiKey1 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";

let queryURL1 = `https://calendarific.com/api/v2/countries?api_key=${apiKey1}`;

fetch(queryURL1)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    $("#countryGrid").empty();
    var alphabet = [..."abcdefghijklmnopqrstuvwyz".toUpperCase()];
    for (var i = 0; i < alphabet.length; i++) {
      $("#countryGrid").append(
        $("<div>")
          .addClass("country-items")
          .append(
            $("<h4>").addClass(`header-${alphabet[i]}`).text(alphabet[i]),
            $("<div>")
              .addClass(`country-alphabet`)
              .attr({
                id: `country-${alphabet[i]}`,
                "data-id": `${alphabet[i]}`,
              }),
            $("<hr>")
          )
      );
    }

    for (var i = 0; i < alphabet.length; i++) {
      var getLetter = $(`#country-${alphabet[i]}`).attr("data-id");
      for (var j = 0; j < data.response.countries.length; j++) {
        var getCity = data.response.countries[j].country_name[0];
        if (getLetter === getCity) {
          // console.log(data.response.countries[j]["iso-3166"]);
          $(`#country-${alphabet[i]}`).append(
            $("<button>")
              .addClass("country-btn")
              .attr({ "data-bs-dismiss": "modal" })
              .attr({
                "data-countryCode": data.response.countries[j]["iso-3166"],
              })
              .html(
                `${`<img src="https://flagcdn.com/${data.response.countries[j][
                  "iso-3166"
                ].toLowerCase()}.svg" width="24" alt="${
                  data.response.countries[j].country_name
                }">`} ${data.response.countries[j].country_name}`
              )
          );
        }
      }
    }
  });

var countryCode = "";
// toggles country modal.
$(".country-btn").on("click", function (event) {
  event.preventDefault();
  localStorage.clear();
});

// response for countries button click.
$(document).on("click", ".country-btn", function (event) {
  event.preventDefault();
  var $button = $(this);
  // console.log($button);
  // console.log($button.textContent);
  // console.log($button.attr("data-countryCode"));
  countryCode = $button.attr("data-countryCode");
  localStorage.setItem("countryCode", countryCode);
  location.reload();
});

// var apiKey2 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
var country = "";
try {
  var retrievedCountry = localStorage.getItem("countryCode");
  country = retrievedCountry;
  if (retrievedCountry === undefined || retrievedCountry === null) {
    console.log("no country selected, defaulting to GB");
    country = "GB";
  }
} catch (error) {
  console.log(
    "error: " +
      error +
      "\nin retrieving country code from local storage. Defaulting to GB"
  );
  country = "GB";
}
if (countryCode != "") {
  country = countryCode;
}

var year = dayjs().format("YYYY");
var queryURL2 =
  "https://calendarific.com/api/v2/holidays?&api_key=" +
  apiKey1 +
  "&country=" +
  country +
  "&year=" +
  year;

console.log(queryURL2);

// function to run when special day is clicked
function clickEvent(index, description) {
  //log arguments
  // console.log("Clicked!");
  // console.log("index: " + index);
  // console.log("description: " + description);
  //update description p element with relevant description
  var pDescription = document.getElementById("infoDescription");
  var clickedId = "p" + index;
  var pClicked = document.getElementById(clickedId);
  pDescription.textContent = description;
}

fetch(queryURL2)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    //define description p element and set id and class attributes
    var pDescription = document.createElement("p");
    pDescription.setAttribute("id", "infoDescription");
    pDescription.setAttribute("class", "ms-auto my-2 me-2 text-white");
    var main = document.querySelector(".test");
    var specialDay = document.getElementById("special-day");
    //add description p element to main
    specialDay.appendChild(pDescription);
    var holidays = data.response.holidays;
    //create holiday name p tags and assign clickEvent function on click within for loop
    // for (let i = 0; i < holidays.length; i++) {
    //   let dayObject = holidays[i];
    //   var holidayName = dayObject.name;
    //   let holidayDescription = dayObject.description;
    //   var pName = document.createElement("p");
    //   pName.setAttribute("class", "my-2 mx-2");
    //   var idToSet = "p" + i.toString();
    //   pName.setAttribute("id", idToSet);
    //   pName.textContent = holidayName;
    //   //pName is each p element with the holiday name as its text content
    //   // pName.onclick = function () {
    //   //   //arguments are the index of the for loop used to find the id of the holiday name p element
    //   //   //and the description to update the description p element with
    //   //   clickEvent(i, holidayDescription);
    //   // };
    //   //add holiday name p element to main
    //   main.appendChild(pName);
    // }
    setInterval(function () {
      var dayInstance = date;
      var month = dayInstance.$M;
      // console.log(dayInstance);
      // console.log(currentDate);
      //actively selected day is given the .active class in calendar.js
      //get element that is actively selected and assign to variable
      var selectedDay = document.querySelector(".active");
      //if no day is selected clear the description p tag in info panel
      if (selectedDay === null) {
        pDescription.textContent = "";
        return;
      }
      var holidayFound = false;
      for (i = 0; i < holidays.length; i++) {
        // get the holiday object
        var dayObject = holidays[i];
        //returns date object with numbers for day, month, year and assign to variable
        var holidayDate = dayObject.date.datetime;
        //gets actively selected day
        var day = selectedDay.textContent;
        // console.log(holidayDate.month);
        // console.log(month);
        // console.log(holidayDate.day);
        // console.log(day);
        if (holidayDate.month - 1 == month && holidayDate.day == day) {
          // console.log("if is true");
          // console.log(dayObject.description);
          clickEvent(i, dayObject.description);
          holidayFound = true;
        }
      }
      if (holidayFound === false) {
        pDescription.textContent = "";
      }
    }, 500);
  });
