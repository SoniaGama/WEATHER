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
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4cb26c92181c81f2021169241176604f/${latitude},${longitude}/?units=ca`)
    .then(response => {     
        response.json().then( result => {
            getDataJson(result)            
        })        
    })
    .catch(error =>{
        console.log(error);        
    })
}

// cuando se concatenan metodos si no son anidados debe especificarse el return

getDataJson = json => {   
    const infoCurrently = json.currently;
    const infoDaily = json.daily;    
    
    const temperature = Math.round(infoCurrently.temperature);
    const wind = Math.round(infoCurrently.windSpeed);
    const humidity = Math.round(infoCurrently.humidity);
    const uv = Math.round(infoCurrently.uvIndex);
    const pressure = Math.round(infoCurrently.pressure);
    const icon = infoCurrently.icon;
    
    paintCardCurrently(temperature, wind, humidity, uv, pressure, icon);

    infoDaily.data.forEach(element => {         
        const iconDay = element.icon;
        const temperatureMax = Math.round(element.temperatureMax);
        const temperatureMin = Math.round(element.temperatureMin);
        paintCardWeek(iconDay, temperatureMax, temperatureMin);           
    });   
}

paintCardCurrently = (temperature, wind, humidity, uv, pressure, icon) => {
    const containerCurrently = document.getElementById('container-table-currently');
     const output = `
         <tr>
            <td>Temperature</td>
            <td class="data-currently">${temperature}°C</td>
        </tr>
        <tr>
            <td>Wind</td>
            <td class="data-currently">${wind}</td>
        </tr>
        <tr>
            <td>Humidity</td>
            <td class="data-currently">${humidity}</td>
        </tr>
        <tr>
            <td>Uv Index</td>
            <td class="data-currently">${uv}</td>
        </tr>
        <tr>
            <td>Pressure</td>
            <td class="data-currently">${pressure}</td>
        </tr>   
    `
    containerCurrently.innerHTML = output;

}

paintCardWeek = (iconDay, temperatureMax, temperatureMin) => {
    const containerWeek = document.getElementById('container-table-week');

    const output = `
        <tr>
            <td class="data-week">${temperatureMin}°C</td>
            <td class="data-week">${temperatureMax}°C</td>
        </tr>                        
    `
    containerWeek.insertAdjacentHTML('beforeEnd', output); 
}
