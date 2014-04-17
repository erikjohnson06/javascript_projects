//This file will be loaded if no geolocation support is detected

function  getLocation() {
    alert(" Geolocation is not supported in this browser.\n Please turn on the geolocation feature or upgrade to your browser's latest version.");
    console.log("Geolocation is not supported. Latlong is: " + latlong);
}

