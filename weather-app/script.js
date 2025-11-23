const apiKey = "a9481c6bd8763b535041c368826fa301";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherData(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    document.querySelector(".error").style.display = "none";

    const data = await response.json();

    document.querySelector(".weather-city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.src = "images/snow.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchButton.addEventListener("click", () => {
    getWeatherData(searchBox.value);
});

getWeatherData("Nairobi");
