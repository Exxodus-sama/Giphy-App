//  Reaction array g65PXiD54SQVfVuDN15djm82P6BZCaNV <---- This is my own API key but, it didn't work. For the sake of displaying, I used the one from previous assignments.

var reactions = ["Happy", "Sad", "Kiss", "LOL", "Yes", "No", "Wink", "Eye-Roll", "High-Five", "Shrug", "Thumbs-Up"];

// Functions

function displayGifs(){
    var reaction = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        $("#view-gifs").empty();

        var results = response.data; 

        if (results == ""){
          alert("There isn't a gif for this selected button");
        }
        for (var i=0; i<results.length; i++){

            var reactionDiv = $("<div>"); 
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            reactionDiv.append(gifRating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still");
            gifImage.addClass("image");
            reactionDiv.append(gifImage);
            $("#view-gifs").prepend(reactionDiv);
        }
    });
}

function createGifButtons(){
    $("#gif-buttons").empty();

    for (var i = 0; i < reactions.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("reaction");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", reactions[i]);
        gifButton.text(reactions[i]);
        $("#gif-buttons").append(gifButton);
    }
}


function addButton(){
    $("#gif-adder").on("click", function(){
    var reaction = $("#reaction-input").val().trim();
    if (reaction == ""){
      return false;
    }
    reactions.push(reaction);

    createGifButtons();
    return false;
    });
}

//Calls the functions previously created
createGifButtons();
addButton();

$(document).on("click", ".reaction", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});