// fetch countries and flags.
// let apiKey1 = 'IZ3Jet89Cn5Z6VkL7lFYgkqB7TJ4XM9h'
let apiKey1 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";

let queryURL1 = `https://calendarific.com/api/v2/countries?api_key=${apiKey1}`;

fetch(queryURL1)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
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
          $(`#country-${alphabet[i]}`).append(
            $("<button>")
              .addClass("country-btn")
              .attr({ "data-bs-dismiss": "modal" })
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

// toggles country modal.
$(".country-btn").on("click", function (event) {
  event.preventDefault();
});

// response for countries button click.
$(document).on("click", ".country-btn", function (event) {
  event.preventDefault();
});

// var apiKey2 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
var country = "GB";
var year = 2024;
var queryURL2 =
  "https://calendarific.com/api/v2/holidays?&api_key=" +
  apiKey1 +
  "&country=" +
  country +
  "&year=" +
  year;

// function to run when special day is clicked
function clickEvent(index, description) {
  //log arguments
  console.log("Clicked!");
  console.log("index: " + index);
  console.log("description: " + description);
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
    pDescription.setAttribute("class", "ms-auto my-2 me-2");
    var main = document.querySelector(".test");
    //add description p element to main
    main.appendChild(pDescription);
    var holidays = data.response.holidays;
    //create holiday name p tags and assign clickEvent function on click within for loop
    for (let i = 0; i < holidays.length; i++) {
      let dayObject = holidays[i];
      var holidayName = dayObject.name;
      let holidayDescription = dayObject.description;
      var pName = document.createElement("p");
      pName.setAttribute("class", "my-2 mx-2");
      var idToSet = "p" + i.toString();
      pName.setAttribute("id", idToSet);
      pName.textContent = holidayName;
      //pName is each p element with the holiday name as its text content
      pName.onclick = function () {
        //arguments are the index of the for loop used to find the id of the holiday name p element
        //and the description to update the description p element with
        clickEvent(i, holidayDescription);
      };
      //add holiday name p element to main
      main.appendChild(pName);
    }
  });
