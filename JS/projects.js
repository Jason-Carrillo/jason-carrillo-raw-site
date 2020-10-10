(function () {


    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        "APPID": weatherKey,
        "q": "Dallas, US",
        "units": "imperial"
    }).done(function (data) {
        console.log(data)
        console.log(data.city.name)
        console.log(data.list[0].main)
        console.log(data.list[0].main.temp)
        console.log(data.list[0].main.temp_max)

        for (let i = 0; i < data.list.length; i += 8) {

            let thisCity =
                "<div class='card bg-dark text-white col-10 text-center'>" +
                "<img class='card-img'" +
                "<div class='card-img-overlay'>" +
                "<h2 class='card-title'>City: " + data.city.name + "</h2>" +
                "<h3 class='card-text'>Temperature: " + Math.round(data.list[i].main.temp) + " °F</h3>" +
                "<h5 class='card-text'> Max Temperature: " + Math.round(data.list[i].main.temp_max) + " °F</h5>" +
                "</div>" +
                "</div>"

            $("#weather").append(thisCity)

        }


    });


    function searchCity() {
        var typedCitySearch = $("#box-city-search").val()

        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            "APPID": weatherKey,
            "q": typedCitySearch,
            "units": "imperial"
        }).done(function (data) {

            $("#weather").empty()

            for (let i = 0; i < data.list.length; i += 8) {


                var thisCity =
                    "<div class='card bg-dark text-white '>" +
                    "<img class='card-img'" +
                    "<div class='card-img-overlay'>" +
                    "<h2 class='card-title'>City: " + data.city.name + "</h2>" +
                    "<h3 class='card-text'>Temperature: " + Math.round(data.list[i].main.temp) + " °F</h3>" +
                    "<h6 class='card-text'> Max Temperature: " + Math.round(data.list[i].main.temp_max) + " °F</h6>" +
                    "</div>" +
                    "</div>"
                $("#weather").append(thisCity)
            }
            ;
        });
    };


    $("#button-city-search").click(searchCity)


    geocode("El Paso", weatherKey)
        .then(function(result) {
            console.log(result)
            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/navigation-guidance-night-v4', // stylesheet location
                center: result, // starting position [lng, lat]
                zoom:10 // starting zoom
            });

            var marker = new mapboxgl.Marker()
                .setLngLat(result)
                .addTo(map);

        });


    mapboxgl.accessToken = weatherKey;

    function searchMap() {

        var typedCitySearch = $("#box-city-search").val()

        geocode(typedCitySearch, weatherKey)
            .then(function (result) {
                console.log(result)
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/navigation-guidance-night-v4', // stylesheet location
                    center: result, // starting position [lng, lat]
                    zoom: 10 // starting zoom

                });

                var marker = new mapboxgl.Marker()
                    .setLngLat(result)
                    .addTo(map);


            });

    };


    $("#button-city-search").click(searchMap)

})()

