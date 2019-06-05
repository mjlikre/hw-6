$(document).ready(function(){
    var gifList = [];

    getGif = function(){
        $('#gif-list').empty();
        var q = $(this).attr('data-name');
        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=LMWR2FxNQlsnpNJ3a9yZI7KjBGNyK5VG&q=${q}&limit=25&offset=0&rating=G&lang=en`
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        
        for ( var i = 0; i < response.data.length; i++){
            
            var gifImage = $("<img>");
            var gifTag = $('<p>').text('Rating: '+response.data[i].rating);

            gifImage.attr("src", response.data[i].images.fixed_height_still.url);
            gifImage.attr('data-state', 'still')
            gifImage.attr('data-still', response.data[i].images.fixed_height_still.url)
            gifImage.attr('data-moving', response.data[i].images.fixed_height.url)
            $('#gif-list').prepend(gifTag, gifImage).addClass('container')

        }
        });
    }

    getAnimated = function(){
        var state = $(this).attr('data-state')
        if (state === 'still'){
            $(this).attr('src', $(this).attr('data-moving'))
            $(this).attr('data-state', 'animate')
        }
        else if(state === 'animate'){
            $(this).attr('src', $(this).attr('data-still'))
            $(this).attr('data-state', 'still')
        }
    }

    getButtons = function(){
        $('#gif-div').empty();

        for(var i = 0; i < gifList.length; i++){
            var $buttons = $('<button>')
            $buttons.addClass('gifs btn btn-primary');
            $buttons.attr('data-name', gifList[i]);
            $buttons.text(gifList[i])
            $('#gif-div').append($buttons);
        }
    }


    $('#select-gif').on('click', function(event){
        event.preventDefault();
        var gif = $('#gif-input').val().trim();
        $('#gif-input').val("");
        gifList.push(gif);
        
        getButtons();   
    });
    $(document).on('click', ".gifs", getGif);
    $(document).on('click', 'img', getAnimated);

    
});
