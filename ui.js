//Get the city value from the text input
let changeCity = document.getElementById("cityInput");
let changeCitySubmitButton = document.getElementById("cityInputButton");

//UI for the current day's weather info
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

//on page load, default to New York City
window.addEventListener("load", () => {
    changeCity.value = "New York";
    changeCitySubmitButton.click();
    changeCity.value = "";
  });

changeCitySubmitButton.addEventListener("click", () =>
{
    let userCityChoice = changeCity.value;
    changeCity.value = "";

    if(document.getElementById("futureWeatherContainer").hasChildNodes)
    {
        document.getElementById("futureWeatherContainer").innerHTML = "";
    }
//calls the API data from the getData() function. Uses this information to update the UI elements
getData(userCityChoice).then(tempData =>
    {
        //clear existing text when the button is clicked
        cityName.innerHTML = "";
        tempCurrent.innerHTML = "";
        tempFHighLow.innerHTML = "";
        weatherDescription.innerHTML = "";
        weatherIcon.innerHTML = "";
        windSpeed.innerHTML = "";
        humidity.innerHTML = "";
        
        //city name
        cityName.innerHTML = tempData.name;
    
        //current temp
        tempCurrent.innerHTML = tempData.main.temp + " F";
        
        //high and low temp
        tempFHighLow.innerHTML += tempData.main.temp_max + "/" + tempData.main.temp_min + " F";
    
        //get weather icon type and assign it to the image elements
        let weatherIconInfo = tempData.weather[0]["icon"];
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconInfo}@2x.png`;
        
        bigWeatherIcon.src = `https://openweathermap.org/img/wn/${weatherIconInfo}@2x.png`;
    
        iconDescriptionContainer.appendChild(weatherIcon);
    
        bigWeatherIconContainer.appendChild(bigWeatherIcon);
    
        //weather description
        weatherDescription.innerHTML += tempData.weather[0]["description"];
    
        //wind speed and humidity
        windSpeed.innerHTML += "Wind speed: " + tempData.wind.speed + " km/h";
    
        humidity.innerHTML += "Humidity: " + tempData.main.humidity + "%";
    },)
    
    let dateField = document.getElementById("date");
    
    // fills in today's date in the date field
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    
    dateField.innerHTML = month+ "/" + day;
    
    
    //UI for the future weather info
    let futureWeatherContainer = document.getElementById("futureWeatherContainer");
    
    getDataNextThreeDays(userCityChoice).then(futureTempData =>    
    {
        //loop through the next 4 entries from the API and create elements in the HTML page using API data
        for(let i = 0; i < 4; i++)
        {
            //container
            let futureDayContainer = document.createElement("div");
            futureDayContainer.setAttribute("id", "futureDayContainer" + i);
    
            //heading
            let futureDayHeading = document.createElement("h3");
            futureDayHeading.setAttribute("id", "futureDayHeading" + i);
    
            //setting date object for each future card
    
                //split the date info from the API. Then splice this to only get the month and day. Split this again on the dash character as we will add this to the date info element
            let dateInfo = futureTempData[i].dt_txt;
            let dateInfoSplit = dateInfo.split(" ")[0].slice(5).split("-");
    
            futureDayHeading.innerHTML = dateInfoSplit[0] + "/" + dateInfoSplit[1];
            futureDayContainer.appendChild(futureDayHeading);
    
            //weather img
            let futureImg = document.createElement("img");
            futureImg.setAttribute("id", "futureImg" + i);
    
            //get the weather img from the OpenWeather API. Plug that into the openWeatherAPI to get the image
            let iconCode = futureTempData[i].weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            futureImg.src = iconUrl;
            
            futureDayContainer.appendChild(futureImg);
    
            //description
            let weatherDescription = document.createElement("p");
            weatherDescription.setAttribute("id", "weatherDescription" + i);
            weatherDescription.innerHTML = futureTempData[i].weather[0].description;
            futureDayContainer.appendChild(weatherDescription);
    
            //description
            let futureLowHigh = document.createElement("p");
            futureLowHigh.setAttribute("id", "futureLowHigh" + i);
            futureLowHigh.innerHTML = "Temperature at noon: " + futureTempData[i].main.temp + " F";
            futureDayContainer.appendChild(futureLowHigh);
    
            futureWeatherContainer.appendChild(futureDayContainer);
        }
    }
    );


})




