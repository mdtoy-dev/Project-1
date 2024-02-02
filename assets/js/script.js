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

fetch(queryURL)
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

var titles = "New_Year's_Day";
var wikiQueryURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${titles}&origin=*&formatversion=2`;

fetch(wikiQueryURL)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        var wiki = data.parse;
        console.log(wiki);
        var mainEl = $("main");
            var articleEL = $("<article>");
                articleEL.addClass("holidayBox");
                var titleEl = $("<h3>");
                    var anchorEl = $("<a>");
                        anchorEl.attr("href", `https://en.wikipedia.org/wiki/${wiki.title}`);
                        anchorEl.text(wiki.title);
                        anchorEl.addClass("wikiURL");
                    titleEl.append(anchorEl);
                    titleEl.addClass("holidayName");
            articleEL.append(titleEl);
        mainEl.append(articleEL);
    });