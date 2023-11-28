// Today variables 
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")

// next data 
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")
let nextConditionText = document.getElementsByClassName("next_condition_text")

// search inpuy
let searchInput = document.getElementById("search")


async function getweatherData(cityName) {
 let weatherResponse = await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=1d435c826b1e4082a7a92347231408&q=${cityName}&days=3`)
 let weatherData = await weatherResponse.json()
return weatherData
}



// /////////////////////////////////////////////

function displayData(data){
    let todayData = new Date()
    todayName.innerHTML = todayData.toLocaleString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayData.getDate()
    todayMonth.innerHTML =todayData.toLocaleDateString("en-US",{month:"long"})
        todayLocation.innerHTML = data.location.name
        todayTemp.innerHTML = data.current.temp_c
        todayConditionImg.setAttribute("src",data.current.condition.icon)
        todayConditionText.innerHTML = data.current.condition.text
        humidity.innerHTML = data.current.humidity+"%"
        wind.innerHTML = data.current.wind_kph+"km/h"
        windDirection.innerHTML = data.current.wind_dir
        
}

function displayNextData(data){
let forecastData = data.forecast.forecastday
for(i = 0; i<2; i++){
    let nextDate = new Date(forecastData[i+1].date)
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
   
    nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
    nextConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
    nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text

}
}



 async function startApp(city = "Cairo"){
    let weatherData = await getweatherData(city)
    if(!weatherData.error){
        displayData(weatherData);
        displayNextData(weatherData);
    }

}
startApp()

searchInput.addEventListener("input", function(){
startApp(searchInput.value)
})