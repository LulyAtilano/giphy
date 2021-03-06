$(document).ready(function() {
    var dibujarGifs = function(data) {
        var gif= "";
        var countGifs= "";
        countGifs = data.length;

        /* Crear el parrafo donde aparecen los gifs encontrados */
        var paragraph = document.createElement('p');
        var countText = document.createTextNode("We found: " + countGifs + " gifs");
        /*$(countText).append(countGifs);*/
        paragraph.appendChild(countText);
        $('#elementos').append(paragraph);

        data.forEach(function (element) {
            gif = element.images.downsized_large.url;
            $("#elementos").append(armarTemplate(gif));
        });
    }

    var armarTemplate = function(gif) {
        var t= "<img class='elemento'src='" + gif + "'/>"
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

