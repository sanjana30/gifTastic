var inputArr = ["Harry Potter", "Hermoine", "Ron Weasley", "Dumbledore", "Quidditch", "Malfoy", "Snape", "Sirius Black", "Dobby", "Fred and George"];
var list = JSON.parse(localStorage.getItem("todolist"));
if (!Array.isArray(list)) {
    list = inputArr;
  }
function renderButtons() {
    $("#buttons-go-here").empty();
    var insideList = JSON.parse(localStorage.getItem("todolist"));
    if (!Array.isArray(insideList)) {
        insideList = [];
      }

    for (var i = 0; i < insideList.length; i++) {
        var btn = $("<button>");
        btn.addClass("gifButton");
        btn.addClass("btn btn-dark");
        btn.attr("value", inputArr[i]);
        btn.text(inputArr[i]);
        $("#buttons-go-here").append(btn);
    }
}
renderButtons();


$("#go").on("click", function (event) {
    event.preventDefault();
    var inputTerm = $("#search").val().trim();
    list.push(inputTerm);
      localStorage.setItem("todolist", JSON.stringify(list));

    renderButtons();
    $("#search").val("");
});

$(document).on("click", ".gifButton", function () {
    var searchTerm = $(this).attr("value");
    console.log(searchTerm);
    var APIkey = "xMwQdZB3q1IMumL63H8YM9uiP8yxhcQf";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + searchTerm + "&limit=5";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        $("#gifs-go-here").empty();
        for (var i = 0; i < results.length; i++) {
            var imgDiv = $("<div>");
            imgDiv.addClass("floated-div");
            var p = $("<p>");
            p.text("Ratings: " + results[i].rating);
            var img = $("<img>");
            img.addClass("gif");
            img.attr("data-state", "still");
            img.attr("still-url", results[i].images.fixed_height_still.url);
            img.attr("animate-url", results[i].images.fixed_height.url)
            img.attr("src", results[i].images.fixed_height_still.url);
            imgDiv.append(p).append(img);
            $("#gifs-go-here").append(imgDiv);

        }      //close for loop

    }) // close .then()
});     //close on-click button

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        var animateValue = $(this).attr("animate-url");
        $(this).attr("src", animateValue);
        $(this).attr("data-state", "animate");
    }
    else if (state === "animate") {
        var stillValue = $(this).attr("still-url");
        $(this).attr("src", stillValue);
        $(this).attr("data-state", "still");
    }
});    //close on-click gif

renderButtons();