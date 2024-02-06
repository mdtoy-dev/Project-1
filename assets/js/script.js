
// response to clicking user input buttons.
$(document).on('click', '.country-btn, .year-btn, .reset-btn, .update-btn', function(event) {
	event.preventDefault();
    var clickedEl = $(this).attr('class');
    // response to year button click.
	if (clickedEl === 'year-btn') {
		var currYear = parseInt(dayjs().format('YYYY'));
  		renderYears(currYear);
    // response to reset button click.
	} else if (clickedEl === 'reset-btn') {
        resetInputs()
    // response to update button click.
    } else if (clickedEl === 'update-btn') {
        // throws a feedback instruction if both country and year inputs hasn't been selected.
        if ($('.country-btn').attr('value') === '' && $('.year-btn').attr('value') === '') {
            $('#feedbackText').text('Please select a county and year to update the calender!');
            clearFeedback();
            return;
        // feedback instruction if country has not been selected.
        } else if ($('.country-btn').attr('value') === '') {
            $('#feedbackText').text('Please select a county!');
            clearFeedback();
            return;
        // feedback instruction if year has not been selected.
        } else if ($('.year-btn').attr('value') === '') {
            $('#feedbackText').text('Please select a year!');
            clearFeedback();
            return;
        } else {
        // takes user input as arguments for api request.
            var userCountry = $('.country-btn').attr('value')
            var userYear = $('.year-btn').attr('value');
            console.log(userCountry, userYear)
            resetInputs()
        }
    }
});

// reset user inputs to original state.
function resetInputs() {
    $('.year-btn').attr('value', '').text('Choose a year');
    $('.country-btn').attr('value', '').text('Choose a country');
}

// clears the feedback text.
function clearFeedback() {
    setTimeout(function() {
        $("#feedbackText").text('');
      }, 3000);
}

// switching to different decades.
$(document).on('click', '.switch-btn', function(event) {
	event.preventDefault();
	var year = parseInt($('.year-option-btn').attr('value'));
    var clickedEl = $(this).data('direction');
	if (year <= 1949 && clickedEl === 'backward' || year >= 2024 && clickedEl === 'forward') {
		return;
	} else if (clickedEl === 'backward') {
		renderYears(year - 25);
        return;
	} else if (clickedEl === 'forward') {
		renderYears(year + 25);
        return;
	} else {
		return;
	}
})

// renders the buttons of years for user to pick and decade text.
function renderYears(year) {
  var numYears = 24;
  $('#decadeText').text(`${year} - ${year + numYears}`)
	$('#yearList').empty();
	for (var i = 0; i <= numYears; i++) {
		$('#yearList').append(
			$('<li>')
				.addClass('year-item')
				.append(
					$('<button>')
						.addClass('year-option-btn')
						.attr({id: `data-year-${year + i}`, value: year + i, "data-bs-dismiss": "modal"})
						.text(year + i)
				)
				
		)
	}
}

// response for countries and years options button click.
$(document).on("click", '.country-option-btn, .year-option-btn', function (event) {
	event.preventDefault();
    var clickedEl = $(this).attr('class');
	if (clickedEl === 'year-option-btn') {
        $('.year-btn').attr({value: $(this).attr('value')}).text(`Year: ${$(this).attr('value')}`)
        return;
	} else if (clickedEl === 'country-option-btn') {
        $('.country-btn').attr({value: $(this).attr('value')}).text(`Country: ${$(this).attr('value')}`)
        return;
	} else {
        return;
  }
});

// render countries and flags.
apiKey1 = 'Okaf0L9aadr7gnB1eemtZUMfwYHfEgw9'
let queryURL1 = `https://calendarific.com/api/v2/countries?api_key=${apiKey1}`;

// generate buttons of countries for user to pick.
fetch(queryURL1)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
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
        var getCountry = data.response.countries[j].country_name[0];
        if (getLetter === getCountry) {
          $(`#country-${alphabet[i]}`).append(
            $("<button>")
              .addClass("country-option-btn")
              .attr({"data-bs-dismiss": "modal", value: data.response.countries[j].country_name})
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

var apiKey2 = "XvFWChUAog5bDCASmYccuidsOvVPlSns";
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
