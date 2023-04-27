function createMap(earthquakes) {
    let streetMap = L.titleLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let map = L.map("map", {
        center: [40.73, -74.0059],
        zoom: 2,
        layers: [map, earthquakes]
    });

    streetMap.addTo(map);
}

function createMarkers(response) {
    let earthquakes = response.features;

    let Markers = [];
    let color = "";

    for (let index = 0; index < earthquakes.length; index++) {
        let earthquakes = earthquakes[index];

        let color="";
    if (earthquakes.geometry.coordinates[0] >= 100) {
        color = "red";
    }
    else if (earthquakes.geometry.coordinates[1] >=50) {
        color = "orange";
    
    }
    else if (earthquakes.geometry.coordinates[1] >=10) {
        color = "yellow";
    }
    else if (earthquakes.geometry.coordinates[1] <=-1) {
        color = "green";
    }
    else {
        color = 'black';
    }

    let radius = "";
    if (earthquakes.properties.mag < 1) {
        radius = earthquakes.properties.mag + 1;
    }
    else {
        radius = earthquakes.properties.mag;
    }
    let Marker = L.circleMarker([earthquakes.geometry.coordinates[1],earthquakes.geometry.coordinates[0]],
        { fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius: radius*4})
        .bindpopup("<h3> Mag:" + earthquakes.properties.mag + "<h3><h3>Place: " + earthquakes.properties.place + "</h3>" + "<h3><h3>Depth: " + earthquakes.geometry.coordinates[2] + "</h3>")

    Markers.push(Markers);
}

    createMap(L.layerGroup(Markers));

console.log(map);

    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = [10,30,50,70,90];
        let colors = ['red', 'purple', 'blue'];

        limits.forEach(function(limit, index) {
            div.innerHTML +=
                "<i style='background: " + colors[index] + "'></i>" + limits[index] + (limits[index + 1] ? "&ndash;" + limits[index +1] + "<br>" : "+");
        });
        return div;
    };
    legend.addTo(map);
}
    d3.json("https://eartquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
