
// fetch countries and flags.
apiKey = 'IZ3Jet89Cn5Z6VkL7lFYgkqB7TJ4XM9h'
queryURL = `https://calendarific.com/api/v2/countries?api_key=${apiKey}`

fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        $('#countryGrid > fieldset').empty();
        for (var i = 0; i < data.response.countries.length; i++) {
            $('#countryGrid > fieldset').append(
                $('<button>').addClass('country-btn').attr({'data-bs-dismiss': 'modal'}).html(
                    `${`<img src="https://flagcdn.com/${(data.response.countries[i]['iso-3166']).toLowerCase()}.svg" width="24" alt="${data.response.countries[i].country_name}">`} ${data.response.countries[i].country_name}`)
            )
        }
    })

// toggles country modal.
$('.country-btn').on('click', function(event) {
    event.preventDefault();
    // getCountry();
})

// response for countries button click.
$(document).on('click', '.country-btn', function(event) {
    event.preventDefault();
})