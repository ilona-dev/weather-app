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

  let hours = now.getHours(); //it returns only 1 digit number, e.g. 2 instead of 02 >> create if statement
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes(); //same thing as hours - it would return 14:5 instead of 14:05 >> if statement
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
let dateElement = document.querySelector("#current-date"); //use IDs, not elements!
dateElement.innerHTML = formatDate(now);

// retrieve data from searched city

function changeCity(event) {
  event.preventDefault();
  let key = "9d6c954e679111c7fc0e3c0db6771c74";
  let cityElement = document.querySelector("#input-search-city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather); //put axios script in head
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

  //icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  ); //necessary to change code attribute 01d

  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}

//geolocation
function showPosition(positon) {
  //5
  let apiKey = "9d6c954e679111c7fc0e3c0db6771c74";
  let lat = positon.coords.latitude;
  let lon = positon.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather); //same API call as previous task - calling function again that is build above
}

function searchLocation(event) {
  //2
  event.preventDefault(); //3
  navigator.geolocation.getCurrentPosition(showPosition); //4
}

let myLocationBtn = document.querySelector("#geolocation-btn"); //1
myLocationBtn = addEventListener("submit", searchLocation);

//fahrenheit conversion

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#today-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null; //??? returning 0 degrees
