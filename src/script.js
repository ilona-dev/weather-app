//1. Feature #1: In your project, display the current date and time using JavaScript: Tuesday 16:00

let today = new Date();
let dateElement = document.querySelector("#current-date"); //use IDs, not elements!

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satruday",
];
let dayIndex = today.getDay();

let hours = today.getHours(); //it returns only 1 digit number, e.g. 2 instead of 02 >> create if statement
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes(); //same problem as hours - it would return 14:5 instead of 14:05 >> if statement
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateElement.innerHTML = `${days[dayIndex]} ${hours}:${minutes}`;

// retrieve data from searched city
// 1. HW week 5 - here we need to change the search engine - add the API call
function changeCity(event) {
  event.preventDefault();
  let key = "9d6c954e679111c7fc0e3c0db6771c74";
  let cityElement = document.querySelector("#input-search-city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityElement}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather); //put axios script in head
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm = addEventListener("submit", changeCity);

// display weather conditions - step 2 (HW 5)
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
