//Makes Map
const weatherMapKey = "db9d773a32a1821c2784e04feac8e841";
const mapKey =  'pk.eyJ1Ijoibm9haC1icnVubyIsImEiOiJja3l4aGVrNHEwMGZ2MnZueHl0OW1lYm03In0.OV3KW0mj-qm9MvYWOpIYAA';
mapboxgl.accessToken = mapKey;

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-98.50,29.61], // starting position [lng, lat]
    zoom: 5 // starting zoom
});


//Deletes cards on click
$('.new').click(function(){
    $(".newCard").empty();
})


//Beginning weather cards (San Antonio)
getWeather(29.9857,-98.6578);

//Appends info to cards from API
function getWeather (latitude, longitude){
    $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${"hour;y"}&appid=${weatherMapKey}&units=${"imperial"}`)

        .done(function(weather) {
            console.log(weather)


            //DAY ONE
            var myDate = new Date(weather.daily[0].dt * 1000);
            var iconCode = weather.daily[0].weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            $("#iconOne").append("<img src='" + iconUrl + "'>");
            $('#cardOne').append(`<p>${myDate.getMonth() + 1} / ${myDate.getDate()}</p>`);
            $('#cardOne').append(`<span>Temp : Low & High<span>`);
            $('#cardOne').append(`<p>${weather.daily[0].temp.min} / ${weather.daily[0].temp.max}</p>`);
            $('#cardOne').append(`<p>${weather.daily[0].weather[0].description.toUpperCase()}</p>`);
            $('#cardOne').append(`<p>Humidity: ${weather.daily[0].humidity}</p>`);
            $('#cardOne').append(`<p>Wind Speed: ${weather.daily[0].wind_speed}</p>`);

            //DAY TWO
            var myDate2 = new Date(weather.daily[1].dt * 1000);
            var iconCodeTwo = weather.daily[1].weather[0].icon;
            var iconUrlTwo = "http://openweathermap.org/img/wn/" + iconCodeTwo + "@2x.png";
            $("#iconTwo").append("<img src='" + iconUrlTwo + "'>");
            $('#cardTwo').append(`<p>${myDate2.getMonth() + 1} / ${myDate2.getDate()}</p>`);
            $('#cardTwo').append(`<span>Temp : Low & High<span>`);
            $('#cardTwo').append(`<p>${weather.daily[1].temp.min} / ${weather.daily[1].temp.max}</p>`);
            $('#cardTwo').append(`<p>${weather.daily[1].weather[0].description.toUpperCase()}</p>`);
            $('#cardTwo').append(`<p>Humidity: ${weather.daily[1].humidity}</p>`);
            $('#cardTwo').append(`<p>Wind Speed: ${weather.daily[1].wind_speed}</p>`);

            //DAY THREE
            var myDate3 = new Date(weather.daily[2].dt * 1000);
            var iconCodeThree = weather.daily[2].weather[0].icon;
            var iconUrlThree = "http://openweathermap.org/img/wn/" + iconCodeThree + "@2x.png";
            $("#iconThree").append("<img src='" + iconUrlThree + "'>");
            $('#cardThree').append(`<p>${myDate3.getMonth() + 1} / ${myDate3.getDate()}</p>`);
            $('#cardThree').append(`<span>Temp : Low & High<span>`);
            $('#cardThree').append(`<p>${weather.daily[2].temp.min} / ${weather.daily[2].temp.max}</p>`);
            $('#cardThree').append(`<p>${weather.daily[2].weather[0].description.toUpperCase()}</p>`);
            $('#cardThree').append(`<p>Humidity: ${weather.daily[2].humidity}</p>`);
            $('#cardThree').append(`<p>Wind Speed: ${weather.daily[2].wind_speed}</p>`);

            //DAY FOUR
            var myDate4 = new Date(weather.daily[3].dt * 1000);
            var iconCodeFour = weather.daily[3].weather[0].icon;
            var iconUrlFour = "http://openweathermap.org/img/wn/" + iconCodeFour + "@2x.png";
            $("#iconFour").append("<img src='" + iconUrlFour + "'>");
            $('#cardFour').append(`<p>${myDate4.getMonth() + 1} / ${myDate4.getDate()}</p>`);
            $('#cardFour').append(`<span>Temp : Low & High<span>`);
            $('#cardFour').append(`<p>${weather.daily[3].temp.min} / ${weather.daily[3].temp.max}</p>`);
            $('#cardFour').append(`<p>${weather.daily[3].weather[0].description.toUpperCase()}</p>`);
            $('#cardFour').append(`<p>Humidity: ${weather.daily[3].humidity}</p>`);
            $('#cardFour').append(`<p>Wind Speed: ${weather.daily[3].wind_speed}</p>`);

            //DAY FIVE
            var myDate5 = new Date(weather.daily[4].dt * 1000);
            var iconCodeFive = weather.daily[4].weather[0].icon;
            var iconUrlFive = "http://openweathermap.org/img/wn/" + iconCodeFive + "@2x.png";
            $("#iconFive").append("<img src='" + iconUrlFive + "'>");
            $('#cardFive').append(`<p>${myDate5.getMonth() + 1} / ${myDate5.getDate()}</p>`);
            $('#cardFive').append(`<span>Temp : Low & High<span>`);
            $('#cardFive').append(`<p>${weather.daily[4].temp.min} / ${weather.daily[4].temp.max}</p>`);
            $('#cardFive').append(`<p>${weather.daily[4].weather[0].description.toUpperCase()}</p>`);
            $('#cardFive').append(`<p>Humidity: ${weather.daily[4].humidity}</p>`);
            $('#cardFive').append(`<p>Wind Speed: ${weather.daily[4].wind_speed}</p>`);
        })
}

//Geocoder
const geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, // Set the access token
    mapboxgl: mapboxgl, // Set the mapbox-gl instance
    marker: true // Do not use the default marker style
});

//Places Geocoder outside of map
document.getElementById('cityName').appendChild(geocoder.onAdd(map))

//Takes search result and changes card
geocoder.on('result', (event) => {
    console.log(event)
    var lats = event.result.geometry.coordinates[0]
    var lngs = event.result.geometry.coordinates[1]
    $(".newCard").empty();
    getWeather(lats, lngs)
});


//Sets marker on click and changes cards
map.on('click', (e) => {
    console.log(e)
    const marker = new mapboxgl.Marker();

    const lngLat = marker.getLngLat();

    var lats = e.lngLat.lat;
    var lngs = e.lngLat.lng;
    marker.setLngLat([lngs, lats])
    marker.addTo(map);

    getWeather(lats, lngs);

    $('#button').click(function () {
        marker.remove()
    })
})
