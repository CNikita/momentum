const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
  getCity();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=b2cb245415007d3a4134476cbcfeb9eb&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.message == "city not found") {
    temperature.textContent = `Город "${city.textContent}" не найден`;
    humidity.textContent = '';
    wind.textContent = '';
    weatherDescription.textContent = '';
    weatherIcon.className = 'weather-icon owf';
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    humidity.textContent = `Влажность: ${data.main.humidity.toFixed(0)}%`;
    wind.textContent = `Ветер: ${data.wind.speed.toFixed(0)}м/с`;
    weatherDescription.textContent = data.weather[0].description;
  }
}

function getCity() {
    if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
      city.textContent = 'Москва';
    } else {
      city.textContent = localStorage.getItem('city');
    }
}

function setCity(event) {
    if (event.type === 'click') {
        event.target.innerText ='';
      } else if (event.type === 'keypress') {
          if (event.which == 13 || event.keyCode == 13) {
            if (event.target.innerText.trim() == '') {
                getCity()
                city.blur();
            } else {
                localStorage.setItem('city', event.target.innerText.trim());
                getWeather();
                city.blur();
          }
          }
        } else {
            if (event.target.innerText.trim() == '') {
                getCity()
                city.blur();
            } else {
                localStorage.setItem('city', event.target.innerText.trim());
                getWeather();
                city.blur();
        }
  }
} 
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', setCity);