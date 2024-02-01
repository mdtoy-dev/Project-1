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

// Code Block for the Wikipedia Query, commented because it is currently not working but pushed to branch in case we can debug it somehow
    // var titles = "New_Year's_Day"
    // var wikiQueryURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${titles}&formatversion=2`;

    // fetch(wikiQueryURL)
    //     .then(function(response) {
    //         return response.json();
    //     }).then(function(data) {
    //         console.log(data)
    //     })