function whatIsTheDay(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let currentDay = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayAndTime = `${currentDay} ${hours}:${minutes}`;
    return dayAndTime;
  }
  
  let now = new Date();
  let present = document.querySelector("#current-time");
  present.innerHTML = whatIsTheDay(now);
  
  function displayWeatherTemperature(response) {
    console.log(response);
    document.querySelector("#now").innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let locationTemperature = document.querySelector("#location-temp");
    let revisedTemperature = `${temperature}°C`;
    locationTemperature.innerHTML = revisedTemperature;
    let humidity = response.data.main.humidity;
    let locationHumidity = document.querySelector("#location-humidity");
    let humidityPercentage = `Humidity: ${humidity}%`;
    locationHumidity.innerHTML = humidityPercentage;
    let speed = response.data.wind.speed;
    let windSpeed = document.querySelector("#wind-speed");
    let locationWind = `Wind: ${speed} kM/h`;
    windSpeed.innerHTML = locationWind;
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].description;
  }
  
  function search(city) {
    let apiKey = "399e957e8f76382378f1ff5b0308246a";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayWeatherTemperature);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "399e957e8f76382378f1ff5b0308246a";
    let city = document.querySelector("#enter-city").value;
    search(city);
  }
  
  // let cityElement = document.querySelector("#now");
  // let searchedCity = document.querySelector("#enter-city");
  // cityElement.innerHTML = searchedCity.value;
  
  let searchForm = document.querySelector("#choose-city");
  searchForm.addEventListener("submit", handleSubmit);
  
  function searchLocation(position) {
    let apiKey = "399e957e8f76382378f1ff5b0308246a";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayWeatherTemperature);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault;
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let currentLocationButton = document.querySelector("#current-city-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  search("New York");
  