const getWeatherButton = document.getElementById('getWeather');
const container = document.getElementById('container-weather');

window.addEventListener("load", () => {
    getWeatherButton.addEventListener('click', getLocation);
});

getLocation = (e) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position);
    } else {         
        container.innerHTML = "Geolocation is not supported by this browser.";
    }
}

position = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getJson(latitude, longitude);
}

getJson = (latitude, longitude) => {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4cb26c92181c81f2021169241176604f/${latitude},${longitude}/units=si`)
    .then(response => {     
        response.json().then( result => {
            getDataJson(result)            
        })        
    })
    .catch(error =>{
        console.log(error);        
    })
}

getDataJson = json => {   
    const infoCurrently = json.currently;
    const infoDaily = json.daily;    
    
    const temperature = infoCurrently.temperature;
    const wind = infoCurrently.windSpeed;
    const humidity = infoCurrently.humidity;
    const uv = infoCurrently.uvIndex;
    const pressure = infoCurrently.pressure;
    const icon = infoCurrently.icon;

    infoDaily.data.forEach(element => {         
        const iconDay = element.icon;
        const temperatureMax = Math.round(element.temperatureMax);
        const temperatureMin = Math.round(element.temperatureMin);  
        console.log();
              
    });   
}