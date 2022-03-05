function geocode(search, token) {
    var baseUrl = 'https://api.mapbox.com';
    var endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
        .then(function(res) {
            return res.json();
            // to get all the data from the request, comment out the following three lines...
        }).then(function(data) {
            return data.features[0].center;
        });
}



// geocode("18310 Blanco Rd, San Antonio, TX 78258", 'pk.eyJ1Ijoibm9haC1icnVubyIsImEiOiJja3l4aGVrNHEwMGZ2MnZueHl0OW1lYm03In0.OV3KW0mj-qm9MvYWOpIYAA').then(function(result) {
//     console.log(result);
//     map.setCenter(result);
//     map.setZoom(15);
//
// });