// fetch countries and flags.
// let apiKey1 = 'IZ3Jet89Cn5Z6VkL7lFYgkqB7TJ4XM9h'
// let apiKey1 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";

let apiKey1 = "Okaf0L9aadr7gnB1eemtZUMfwYHfEgw9";

// response to clicking user input buttons.
$(document).on('click', '.country-btn', function(event) {
	event.preventDefault();
});

// response for countries and years options button click.
$(document).on("click", '#countryBtn', async function(event) {
    event.preventDefault();
    $('.country-btn').attr({value: $(this).attr('data-countryCode')}).html(`${`<img src="https://flagcdn.com/${$(this).attr('data-countryCode').toLowerCase()}.svg" width="36" alt="${
    $(this).attr('value')}">`} ${$(this).attr('value')}`)
	
});

// render countries buttons with flags.
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
        var getCounty = data.response.countries[j].country_name[0];
        if (getLetter === getCounty) {
          $(`#country-${alphabet[i]}`).append(
            $("<button>")
              .addClass("country-btn-select")
              .attr({"data-bs-dismiss": "modal", "data-countryCode": data.response.countries[j]["iso-3166"], value: data.response.countries[j].country_name, id: 'countryBtn'})
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

// response for countries button click.
$(document).on("click", ".country-btn-select", function (event) {
  event.preventDefault();
  var $button = $(this);
  // console.log($button);
  // console.log($button.textContent);
  console.log($button.attr("data-countryCode"));
  countryCode = $button.attr("data-countryCode");
  localStorage.setItem("countryCode", countryCode);
});

$("#toggle-modal-btn").on("click", function () {
  localStorage.clear();
});

// var apiKey2 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
var country = "";
console.log("trying to retrieve country from local storage");
try {
  console.log("try block");
  var retrievedCountry = localStorage.getItem("countryCode");
  //check if retrievedCountry is falsey
  if (!retrievedCountry) {
    console.log("no country found in local storage, defaulting to GB");
    country = "GB";
  } else {
    console.log("country in local storage is found");
    console.log(retrievedCountry);
    country = retrievedCountry;
  }
} catch (error) {
  console.log("catch block");
  console.log(
    "error: " +
      error +
      "\nin retrieving country code from local storage. Defaulting to GB"
  );
  country = "GB";
}

console.log("country before query: " + country);

var year = dayjs().format("YYYY");
var queryURL2 =
  "https://calendarific.com/api/v2/holidays?&api_key=" +
  apiKey1 +
  "&country=" +
  country +
  "&year=" +
  year;

// console.log(queryURL2);

// function to run when special day is clicked
function clickEvent(index, description) {
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
    var specialDay = document.getElementById("special-day");
    // define event div for use in eventAppend function
    var divEvent = document.createElement("div");
    divEvent.setAttribute("id", "eventContainer");
    divEvent.setAttribute("class", "panel-text text-light p-5");
    specialDay.appendChild(pDescription);
    specialDay.appendChild(divEvent);
    var holidays = data.response.holidays;

    setInterval(function () {
      var dateInstance = date;
      var month = dateInstance.$M;
      //actively selected day is given the .active class in calendar.js
      //get element that is actively selected and assign to variable
      var selectedDay = document.querySelector(".active");

      //if no day is selected clear the description p tag in info panel
      if (selectedDay === null) {
        pDescription.textContent = "";
        return;
      }

      var holidayFound = false;
      for (i = 0; i < data.response.holidays.length; i++) {
        // get the holiday object
        var dayObject = holidays[i];
        //returns date object with numbers for day, month, year and assign to variable
        var holidayDate = dayObject.date.datetime;
        //gets actively selected day
        var day = selectedDay.textContent;
        if (holidayDate.month - 1 == month && holidayDate.day == day) {
          clickEvent(i, dayObject.description);
          holidayFound = true;
        }
      }
      if (holidayFound === false) {
        pDescription.textContent = "";
      }
    }, 500);
  });

function eventAppend() {
  // Ticketmaster Event API
  var tmApiKey = "q0l21GRx9ZQLd56CEAfwDZM3CdeAJIv5";
  var countryCode = $("#countryBtn").attr("data-countryCode");
  var eventsURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=${tmApiKey}`;

  fetch(eventsURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(countryCode)
      var events = data._embedded.events;
      console.log(events);
      var selectedDay = document.querySelector(".panel-text");
      var day = dayjs(selectedDay.textContent).format("YYYY-MM-DD");
      var eventEl = $("#eventContainer");
      eventEl.empty();
      var eventsTitleEl = $("<p>");
      eventsTitleEl.text("Events");
      eventEl.append(eventsTitleEl);
      for (let i = 0; i < events.length; i++) {
        if (
          dayjs(events[i].dates.start.localDate).format("YYYY-MM-DD") === day
        ) {
          console.log(events[i].name);
          var allEventsEl = $("<p>");
          var anchorEl = $("<a>");
          anchorEl.attr("href", events[i].url);
          anchorEl.attr("target", "_blank");
          anchorEl.text(events[i].name);
          anchorEl.addClass("eventLink");
          allEventsEl.append(anchorEl);
          eventEl.append(allEventsEl);
        }
      }
    });
}
