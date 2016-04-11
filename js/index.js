'use strict';

//Use the API Sandbox to get the correct URLs

let $search = $(".search");
let $searchBox = $("#searchbox");
let $searchLink = $(".searchLink");
let $outputArea = $("#outputArea");
let fieldText = $($searchBox).val();
let baseURL = "http://en.wikipedia.org/w/api.php?";
let searchAddon;

//This will fill in the search text in the API request
$searchBox.on("input", function() {
  fieldText = this.value;
  console.log("The current search term is " + fieldText);

  //Stick JSON in a JSON prettifier to organize stuff
  searchAddon = baseURL + "action=query&format=json&list=search&callback=&utf8=1&srsearch=" + fieldText + "&utf8&callback=?";
  $searchLink.attr("href", searchAddon);
});

//Get JSON and loop over search array
function displayInfo() {
  $outputArea.empty();
  //$search.attr("href", searchAddon);

  //Get JSON and loop over array and get title and snippet keys
  $.getJSON(searchAddon, function(json) {
    let searchResults = json.query.search;

    for (var i = 0; i < searchResults.length; i++) {

      console.log(searchResults[i].title);
      console.log(searchResults[i].snippet);

      //Output the title and snippet keys to the DOM
      $outputArea.append(
        "<div id='searchContainer'>" +
        "<a href='https://en.wikipedia.org/wiki/" + searchResults[i].title + "' target='_blank'>" +
        "<div class='title'>" + searchResults[i].title + "</div>" + "</a>" +
        "<div class='snippet'>" + searchResults[i].snippet.slice(0, -3) + "..." + "</div>" +
        "</div>"
      );
    }

  });
}

$search.on("click", function() {
  displayInfo();
});

$("#searchbox").on("keydown", function(e) {
  if (e.keyCode === 13) {
    displayInfo();
    //console.log("dank memes");
  }

});