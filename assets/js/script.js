// fetch countries and flags.
// let apiKey1 = 'IZ3Jet89Cn5Z6VkL7lFYgkqB7TJ4XM9h'
// let apiKey1 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
let apiKey1 = "Okaf0L9aadr7gnB1eemtZUMfwYHfEgw9";

// response to clicking user input buttons.
$(document).on('click', '.country-btn', function(event) {
	event.preventDefault();
});

// response for countries and years options button click.
$(document).on("click", '#country-option-btn', function (event) {
	event.preventDefault();
    var clickedCountry = $(this).attr('id');
	if (clickedCountry === 'country-option-btn') {
        $('.country-btn').attr({value: $(this).attr('data-countryCode')}).text(`Country: ${$(this).attr('value')}`)
        return;
	}
});

// render countries and flags.
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
              .attr({"data-bs-dismiss": "modal", "data-countryCode": data.response.countries[j]["iso-3166"], value: data.response.countries[j].country_name, id: 'country-option-btn'})
              .html(
                `${`<img src="https://flagcdn.com/${data.response.countries[j]["iso-3166"].toLowerCase()}.svg" width="24" alt="${
                  data.response.countries[j].country_name
                }">`} ${data.response.countries[j].country_name}`
              )
          );
        }
      }
    }
  });

// var countryCode = "";

// // response for countries button click.
// $(document).on("click", ".country-btn-select", function (event) {
//   event.preventDefault();
//   var $button = $(this);
//   // console.log($button);
//   // console.log($button.textContent);
//   console.log($button.attr("data-countryCode"));
//   countryCode = $button.attr("data-countryCode");
//   localStorage.setItem("countryCode", countryCode);
//   location.reload();
// });

// $("#toggle-modal-btn").on("click", function () {
//   localStorage.clear();
// });

// // var apiKey2 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
// var country = "";
// console.log("trying to retrieve country from local storage");
// try {
//   console.log("try block");
//   var retrievedCountry = localStorage.getItem("countryCode");
//   //check if retrievedCountry is truthy
//   if (retrievedCountry == false) {
//     console.log("no country found in local storage, defaulting to GB");
//     country = "GB";
//   } else {
//     console.log("country in local storage is found");
//     console.log(retrievedCountry);
//     country = retrievedCountry;
//   }
// } catch (error) {
//   console.log("catch block");
//   console.log(
//     "error: " +
//       error +
//       "\nin retrieving country code from local storage. Defaulting to GB"
//   );
//   country = "GB";
// }

// // if (countryCode != "") {
// //   country = countryCode;
// // }
// console.log("country before query: " + country);

// var year = dayjs().format("YYYY");
// var queryURL2 =
//   "https://calendarific.com/api/v2/holidays?&api_key=" +
//   apiKey1 +
//   "&country=" +
//   country +
//   "&year=" +
//   year;

// // console.log(queryURL2);

// // function to run when special day is clicked
// function clickEvent(index, description) {
//   //log arguments
//   // console.log("Clicked!");
//   // console.log("index: " + index);
//   // console.log("description: " + description);
//   //update description p element with relevant description
//   var pDescription = document.getElementById("infoDescription");
//   var clickedId = "p" + index;
//   var pClicked = document.getElementById(clickedId);
//   pDescription.textContent = description;
// }

// fetch(queryURL2)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     //define description p element and set id and class attributes
//     var pDescription = document.createElement("p");
//     pDescription.setAttribute("id", "infoDescription");
//     pDescription.setAttribute("class", "ms-auto my-2 me-2 text-white");
//     var main = document.querySelector(".test");
//     var specialDay = document.getElementById("special-day");
//     // define event div for use in eventAppend function
//     var divEvent = document.createElement("div")
//     divEvent.setAttribute("id", "eventContainer")
//     divEvent.setAttribute("class", "panel-text text-light p-5")
//     //add description p element to main
//     specialDay.appendChild(pDescription);
//     specialDay.appendChild(divEvent)
//     var holidays = data.response.holidays;
//     //create holiday name p tags and assign clickEvent function on click within for loop
//     // for (let i = 0; i < holidays.length; i++) {
//     //   let dayObject = holidays[i];
//     //   var holidayName = dayObject.name;
//     //   let holidayDescription = dayObject.description;
//     //   var pName = document.createElement("p");
//     //   pName.setAttribute("class", "my-2 mx-2");
//     //   var idToSet = "p" + i.toString();
//     //   pName.setAttribute("id", idToSet);
//     //   pName.textContent = holidayName;
//     //   //pName is each p element with the holiday name as its text content
//     //   // pName.onclick = function () {
//     //   //   //arguments are the index of the for loop used to find the id of the holiday name p element
//     //   //   //and the description to update the description p element with
//     //   //   clickEvent(i, holidayDescription);
//     //   // };
//     //   //add holiday name p element to main
//     //   main.appendChild(pName);
//     // }
//     setInterval(function () {
//       var dayInstance = date;
//       var month = dayInstance.$M;
//       // console.log(dayInstance);
//       // console.log(currentDate);
//       //actively selected day is given the .active class in calendar.js
//       //get element that is actively selected and assign to variable
//       var selectedDay = document.querySelector(".active");
//       //if no day is selected clear the description p tag in info panel
//       if (selectedDay === null) {
//         pDescription.textContent = "";
//         return;
//       }
//       var holidayFound = false;
//       for (i = 0; i < data.response.holidays.length; i++) {
//         // get the holiday object
//         var dayObject = holidays[i];
//         //returns date object with numbers for day, month, year and assign to variable
//         var holidayDate = dayObject.date.datetime;
//         //gets actively selected day
//         var day = selectedDay.textContent;
//         // console.log(holidayDate.month);
//         // console.log(month);
//         // console.log(holidayDate.day);
//         // console.log(day);
//         if (holidayDate.month - 1 == month && holidayDate.day == day) {
//           // console.log("if is true");
//           // console.log(dayObject.description);
//           clickEvent(i, dayObject.description);
//           holidayFound = true;
//         }
//       }
//       if (holidayFound === false) {
//         pDescription.textContent = "";
//       }
//     }, 500);
//     });

// function eventAppend() {
//   // Ticketmaster Event API
//   var tmApiKey = "q0l21GRx9ZQLd56CEAfwDZM3CdeAJIv5";
//   // countryCode will need linking to output of the country modal
//   var countryCode = "US";
//   var eventsURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${countryCode}&apikey=${tmApiKey}`;

//   fetch(eventsURL)
//     .then(function(response) {
//       return response.json();
//     }).then(function(data) {
//       var events = data._embedded.events;
//       console.log(events);
//       var selectedDay = document.querySelector(".panel-text");
//       var day = dayjs(selectedDay.textContent).format("YYYY-MM-DD");
//       var eventEl = $("#eventContainer");
//         eventEl.empty();
//         var eventsTitleEl = $("<p>");
//           eventsTitleEl.text("Events");
//         eventEl.append(eventsTitleEl)
//       for (let i = 0; i < events.length; i++) {
//         if (dayjs(events[i].dates.start.localDate).format("YYYY-MM-DD") === day) {
//           // This alert is a test to make sure it works, will be replaced with element appends once it does
//           console.log(events[i].name);
//           var allEventsEl = $("<p>");
//             var anchorEl = $("<a>");
//               anchorEl.attr("href", events[i].url)
//               anchorEl.attr("target", "_blank")
//               anchorEl.text(events[i].name)
//               anchorEl.addClass("eventLink")
//             allEventsEl.append(anchorEl)
//           eventEl.append(allEventsEl)
//         };
//       };
//     });
// };