//This file will be loaded if Geolocation is detected on the browser

//Get the user's current location
function  getLocation() {
    navigator.geolocation.getCurrentPosition(displayLocation);
}

//Get the latitude and longitude coordinates and send them to the
//showMap and addMarker functions
function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    latlong = parseFloat(latitude).toFixed(2) + ", " + parseFloat(longitude).toFixed(2);
    
    console.log("Geolocation is supported. Latlong is: " + latlong);
    
    if (!map) {
        showMap(latitude, longitude);
    }    
    addMarker(latitude, longitude);
}

//Display a Google map based on the user's location
function showMap(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var mapOptions = {
        zoom: 12,
        center: googleLatLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv, mapOptions);
    map.panTo(googleLatLong);
        console.log("Geo Test: " + latlong);
}

//Add a marker to the Google map of the user exact location
function addMarker(lat, long) {
    var googleLatLong = new google.maps.LatLng(lat, long);
    var markerOptions = {
        position: googleLatLong,
        map: map,
        title: "Task location"
    }
    var marker = new google.maps.Marker(markerOptions);
}