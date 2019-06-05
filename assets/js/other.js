$(document).ready(function(){   
    $.ajax({
        url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=fnjJ385THxcJvnHMGuG8BLnIaLcUwpNv',
        request: "GET"
    }).then(function(response){
        console.log(response)

    })

});