var park_description;
var parks;
var smells;
var smell_data;


// MAPBOX API
mapboxgl.accessToken = 'pk.eyJ1IjoibWluaGFuaDA2MDQiLCJhIjoiY2t3M3JvYWdlNmJ4MDJvbXRuNHNsb2tjaiJ9.EfBNsJV4cSS6qOVcSBOyvg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/minhanh0604/ckw3ruppx0pgp14mysghdrqnj', // style URL
    center: [-74.0060, 40.7128], // starting position [lng, lat]
    zoom: 10 // starting zoom
});


// Load local json file
$.getJSON("json/dogparks_smell_test.json", function(json_data) {
    smell_data=json_data;
});


// NYC OPEN DATA API
$.ajax({
    url: "https://data.cityofnewyork.us/resource/hxx3-bwgv.json",
    type: "GET",
    data: {
        "$limit": 5000,
        "$$app_token": "b7BvXhoQtrpqpXyTENeyptTYX"
    }
}).done(function(data) {

    // console.log(data[0].name);

    for (i = 0; i < data.length; i++) {
        var park_pos = data[i].the_geom.coordinates[0][0][0];
        var park_name = data[i].name;

        // console.log(park_name);

        for (let j in smell_data) {
            parks = smell_data[j].park;
            smells = smell_data[j].scent;

            if (park_name == parks) {
                park_description = smells;
                break;
            } else {
                park_description = "Use your own snoops";
            }
        }

        // Set marker options.
        const marker = new mapboxgl.Marker({
                color: "#B0947D",
                draggable: true
            }).setLngLat(park_pos)
            .setPopup(new mapboxgl.Popup().setHTML("<h3>" + park_name + "</h3>" + "<p>" + park_description + "</p>")) // add popup
            // .setPopup(popup) // sets a popup on this marker
            .addTo(map);
        marker.setDraggable(false);
    }
});
