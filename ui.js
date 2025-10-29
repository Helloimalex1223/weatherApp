let cityName = document.getElementById("city");
let tempCurrent = document.getElementById("tempCurrent");
let tempFHighLow = document.getElementById("tempFHighLow");
let weatherDescription = document.getElementById("weatherDescription");
let iconDescriptionContainer = document.getElementById("iconDescription");
//create the weather icon image elements
let weatherIcon = document.createElement("img");
weatherIcon.classList.add("weatherIcon");

let bigWeatherIcon = document.createElement("img");
bigWeatherIcon.classList.add("bigWeatherIcon");

let windSpeed = document.getElementById("wind");
let humidity = document.getElementById("humidity");

let bigWeatherIconContainer = document.getElementById("rightSideWeatherData");

//calls the API data from the getData() function. Uses this information to update the UI elements
getData("Miami").then(tempData =>
{
    // console.log(tempData);
    
    //city name
    cityName.innerHTML = tempData.name;

    //current temp
    tempCurrent.innerHTML = tempData.main.temp + " F";
    
    //high and low temp
    tempFHighLow.innerHTML += tempData.main.temp_max + "/" + tempData.main.temp_min + " F";

    //get weather icon type and assign it to the image elements
    let weatherIconInfo = tempData.weather[0]["icon"];
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconInfo}.png`;
    
    bigWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconInfo}.png`;

    iconDescriptionContainer.appendChild(weatherIcon);

    bigWeatherIconContainer.appendChild(bigWeatherIcon);

    //weather description
    weatherDescription.innerHTML += tempData.weather[0]["description"];

    //wind speed and humidity
    windSpeed.innerHTML += tempData.wind.speed + " km/h";

    humidity.innerHTML += tempData.main.humidity + "%";
},)

let dateField = document.getElementById("date");

// fills in today's date in the date field
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;

dateField.innerHTML = month+ "/" + day;

getDataNextThreeDays("Miami");



