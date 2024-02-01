// fetch countries and flags.
apiKey = 'IZ3Jet89Cn5Z6VkL7lFYgkqB7TJ4XM9h'
queryURL = `https://calendarific.com/api/v2/countries?api_key=${apiKey}`

fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        $('#countryGrid').empty();
        var alphabet = [...('abcdefghijklmnopqrstuvwyz').toUpperCase()];
        for (var i = 0; i < alphabet.length; i++) {
            $('#countryGrid').append($('<div>').addClass('country-items')
                                .append($('<h4>').addClass(`header-${alphabet[i]}`).text(alphabet[i]), $('<div>').addClass(`country-alphabet`).attr({id: `country-${alphabet[i]}`, 'data-id': `${alphabet[i]}`}), $('<hr>')))
        }

        for (var i = 0; i < alphabet.length; i++) {
            var getLetter = $(`#country-${alphabet[i]}`).attr('data-id');
            for (var j = 0; j < data.response.countries.length; j++) {
                var getCity = data.response.countries[j].country_name[0];
                if (getLetter === getCity) {
                    $(`#country-${alphabet[i]}`).append($('<button>').addClass('country-btn').attr({'data-bs-dismiss': 'modal'}).html(
                        `${`<img src="https://flagcdn.com/${(data.response.countries[j]['iso-3166']).toLowerCase()}.svg" width="24" alt="${data.response.countries[j].country_name}">`} ${data.response.countries[j].country_name}`)
                    )
                }
            }
        }
    })

// toggles country modal.
$('.country-btn').on('click', function(event) {
    event.preventDefault();
})

// response for countries button click.
$(document).on('click', '.country-btn', function(event) {
    event.preventDefault();
})