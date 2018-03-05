const request = superagent;
const getWeatherButton = document.getElementById('getWeather');

function geolocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    console.log(latitude, longitude);
    
};

const geolocation = () => {
    if (!navigator.geolocation) {
        document.getElementById('contaner-weather').innerHTML = "<p>Geolocation is not supported by your browser</p>";
    } else {
        getLocation();
    }
}

window.addEventListener("load", function () {
    getWeatherButton.addEventListener('click', geolocation);
});