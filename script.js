const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');


const weather = {};

weather.temperature = {
    unit: 'celsius'
};


const key = 'e331895f05e333e1f345e461ac6f519e';



if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
}else{
    notificationElement.style.display = 'block';
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = 'Bloqueado';
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e331895f05e333e1f345e461ac6f519e`;
   
    fetch(api)
    .then(function(response){
        let data =response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp);
        weather.description = data.weather[0].description;
        weather.iconID = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function() {
        displayWeather();
    });
}  

function displayWeather(){
    iconElement.innerHTML = `<img src="imagens/${weather.iconID}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}. ${weather.country}`;
}

document.querySelector('.buttonIn').addEventListener('click', function(event) {
    const store = {
        city: document.querySelector('.location p').innerHTML,
        temp: document.querySelector('.temperature-value p').innerHTML,
        description: document.querySelector('.temperature-description').innerHTML,
        icon: document.querySelector('.weather-icon').innerHTML
    };
    localStorage.setItem('weather.value', JSON.stringify(store));
    localStorage.setItem("date", new Date().toString())
  });

document.getElementById('details').innerHTML = JSON.stringify(localStorage.getItem('weather.value'));

document.getElementById('time').innerHTML = JSON.stringify(localStorage.getItem('date'));