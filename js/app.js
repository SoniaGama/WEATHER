window.addEventListener("load", () => {
    getJsonImage();
    document.getElementById('getWeather').addEventListener('click', getLocation);
});

getJsonImage = () => {
    fetch('https://cors-anywhere.herokuapp.com/https://api.unsplash.com/photos/random/?client_id=e88d235483797e4439540cd6aac519cffc62926d060654ba2499dc1e5a031033')
        .then(response => {
            response.json().then(result => {
                paintImage(result.urls.regular);
            })
        }).catch(error => {
            console.log(error);
        });
}

paintImage = (image) => {
    document.body.style.backgroundImage = `url(${image})`;
}

clearContainer = () => {
    document.getElementById('container-table-currently').innerHTML = '';
    document.getElementById('title').innerHTML = '';
    document.getElementById('container-table-week').innerHTML = '';
}

getLocation = (e) => {
    clearContainer();
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
            response.json().then(result => {
                getDataJson(result)
            })
        })
        .catch(error => {
            console.log(error);
        })
}

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
        const date = element.time;
        const temperatureMax = Math.round(element.temperatureMax);
        const temperatureMin = Math.round(element.temperatureMin);
        paintCardWeek(iconDay, date, temperatureMax, temperatureMin);
    });
}

paintCardCurrently = (temperature, wind, humidity, uv, pressure, icon) => {
    const containerCurrently = document.getElementById('container-table-currently');
    const containerTitle = document.getElementById('title');
    
    const outputCard = `
        <tr>
            <td>Wind</td>
            <td class="data-currently">${wind} m/s</td>
        </tr>
        <tr>
            <td>Humidity</td>
            <td class="data-currently">${humidity}%</td>
        </tr>
        <tr>
            <td>Uv Index</td>
            <td class="data-currently">${uv}</td>
        </tr>
        <tr>
            <td>Pressure</td>
            <td class="data-currently">${pressure} hPa</td>
        </tr>   
    `
    const outputTitle = `        
        <span id="add-icon" class="card-title activator center">
            Today we are at
            <br>
            ${temperature}°C
            <i class="material-icons right">add_circle</i>
        </span>    
    `;
    containerCurrently.innerHTML = outputCard;
    containerTitle.innerHTML = outputTitle;
    document.getElementById('add-icon').addEventListener('click', hideCardDay);
}

hideCardDay = (e) => {
    document.getElementById('card-currently').classList.add('hide');
    document.getElementById('close-card').addEventListener('click', showCardDay);
}

showCardDay = (e) => {
    document.getElementById('card-currently').classList.remove('hide');
}

paintCardWeek = (iconDay, date, temperatureMax, temperatureMin) => {
    const dayWeek = new Date(date * 1000).toLocaleString('en-Mx', { weekday: 'long' });
    const output = `
        <tr>
            <td class="data-week">${dayWeek}</td>
            <td class="data-week">${temperatureMin} °C</td>
            <td class="data-week">-</td>
            <td class="data-week">${temperatureMax} °C</td>
        </tr>                        
    `
    document.getElementById('container-table-week').insertAdjacentHTML('beforeEnd', output);
}