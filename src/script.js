// Time and date display

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satruday",
  ];
  let day = days[now.getDay()];

  let hours = now.getHours(); //returning 2-digit number(01-09)
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes(); //returning 2-digit number in minutes(01-09)
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let now = new Date();
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatDate(now);

// retrieve data from searched city

function changeCity(event) {
  event.preventDefault();

  let cityElement = document.querySelector("#input-search-city").value;
  search(cityElement);
}

function search(city) {
  let key = "9d6c954e679111c7fc0e3c0db6771c74";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm = addEventListener("submit", changeCity);

// display weather conditions

function displayWeather(response) {
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#country`).innerHTML = response.data.sys.country;
  document.querySelector(`#today-temperature`).innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].description;
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  celsiusTemperature = response.data.main.temp;

  //icon of current weather

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );

  getForecast(response.data.coord);
}

//geolocation

function showPosition(positon) {
  let apiKey = "9d6c954e679111c7fc0e3c0db6771c74";
  let lat = positon.coords.latitude;
  let lon = positon.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let myLocationBtn = document.querySelector("#geolocation-btn");
myLocationBtn = addEventListener("submit", searchLocation);

//forecast functions

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    //looping through forecast variable (originally array of 8 upcoming days)
    if (index < 6) {
      //displaying  6 days forecast
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="day">${formatDay(forecastDay.dt)}</div>
              
              <div class="forecast-icon"><img class="forecast-icon"
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              /></div>
              <div class="temp">
                <span class="forecast-max-temp">${Math.round(
                  forecastDay.temp.max
                )}°  </span> ${Math.round(forecastDay.temp.min)}°
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9d6c954e679111c7fc0e3c0db6771c74";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  //changing timestamp numbers to day names
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
search("Playa del Carmen");
