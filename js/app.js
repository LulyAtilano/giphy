$(document).ready(function() {
    var dibujarGifs = function(data) {
        var gif= "";
        var url= "";
        data.forEach(function (element) {
            gif = element.images.downsized_large.url;
            url = element.bitly_gif_url;
            $("#elementos").append(armarTemplate(gif, url));
        });
    }

    var armarTemplate = function(gif,url) {
        var t= "div class='elemento'><img src='" + gif + "'/><a href='" + url + "'> See more </a></div>"
        return t;
    }

    var ajaxGif = function(gif) {
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?',
            type: 'GET',
            datatype: 'json',
            data: {
                q: gif,
                api_key: 'P84KIqeOxMX4BkzM8nbh97dj38fVYOW8'
            }
        })
        .done(function(response) {
            console.log(response);
            dibujarGifs(response.data);
        })
        .fail(function() {
            console.log("error");
        });
    }

    $("#buscar-gif").click(function(event) {
        console.log("Entro");
        $("#elementos").empty();
        var gif= $("#gif-text").val();
        ajaxGif(gif);
    });
});