async function getWeather() {

    const cityInput = document.getElementById("cityInput");

    const city = cityInput.value || "Kolkata";

    try {

        // 1. Find latitude and longitude of city
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            alert("City not found!");
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        const cityName = geoData.results[0].name;

        // 2. Get weather using latitude and longitude
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code`
        );

        const weatherData = await weatherResponse.json();

        // 3. Get current weather
        const temperature =
            weatherData.current.temperature_2m;

        const wind =
            weatherData.current.wind_speed_10m;

        const weatherCode =
            weatherData.current.weather_code;

        // 4. Display data
        document.getElementById("city").innerText =
            cityName;

        document.getElementById("temperature").innerText =
            `${temperature} °C`;

        document.getElementById("wind").innerText =
            `Wind: ${wind} km/h`;

        document.getElementById("condition").innerText =
            getWeatherCondition(weatherCode);

    } catch (error) {

        console.log("Error:", error);

        alert("Something went wrong!");

    }
}


// Convert weather code into readable text
function getWeatherCondition(code) {

    if (code === 0) {
        return " Clear Sky";
    }

    if (code >= 1 && code <= 3) {
        return " Partly Cloudy";
    }

    if (code >= 51 && code <= 67) {
        return " Rain";
    }

    if (code >= 71 && code <= 77) {
        return " Snow";
    }

    if (code >= 80 && code <= 82) {
        return " Rain Showers";
    }

    if (code >= 95) {
        return "Thunderstorm";
    }

    return " Cloudy";
}


// Load Kolkata weather when page opens
getWeather();