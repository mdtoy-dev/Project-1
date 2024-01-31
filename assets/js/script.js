var apikey = "XvFWChUAog5bDCASmYccuidsOvVPlSns"
var country = "GB"
var year = 2024
var queryURL = "https://calendarific.com/api/v2/holidays?&api_key=" +  apikey  + "&country=" + country +"&year=" + year;

fetch(queryURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    })