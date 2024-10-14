//Connecting to the OpenWeather API
console.log ('Hello World');
const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'fbbcb1b14e3d3d22462311d0e835f1e2'; // my API key

const searchForm = document.getElementById('search-form');
console.log(searchForm);
const searchInput = document.getElementById('search-input');
const todayContainer= document.getElementById('today');
const forecastContainer = document.getElementById('forecast');
const searchHistory = document.getElementById('history');
const storedHistory = localStorage.getItem('searchHistory');
// fetchWeatherData based on the city name
function fetchWeatherData(cityName) {
    const apiUrl = `${weatherApiRootUrl}/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}`;
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            renderCurrentWeather(cityName, data);
            renderForecast(data);
        })
        .catch(error => console.error('Error fetching wearther data', error));
  
}
//weather Api call
function handleSearchFormSubmit(event) {
    console.log('handleSearchFormSubmit');
    event.preventDefault();
    const cityName = searchInput.value.trim();
    if (cityName) {
        fetchWeatherData(cityName);
        searchInput.value = '';
    }
}
searchForm.addEventListener('submit', handleSearchFormSubmit);

//renderCurrentWeather
function renderCurrentWeather(city, weather) {
    const date = new Date().toLocaleDateString();
    const temp = weather.main.temp;
    const wind = weather.wind.speed;
    const humidity = weather.main.humidity;
    const iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    const html = `
      <div class="card">
        <h2>${city} (${date})</h2>
        <img src="${iconUrl}" alt+"Weather icon">
        <p>Temperature: ${temp} &deg;F</p>
        <p>Wind: ${wind} MPH</p>
        <p>Humidity: ${humidity}%</p>
        </div>
        `;
    todayContainer.innerHTML += html;


}

function renderForcast() {
    searchHistoryContainer.innerHTML = '';
    searchHistory.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click', () => fetchWeatherData(city));
        searchHistoryContainer.appendChild(button);
    });
}

function initSearchHistory() {
   // const storedHistory = JSON.parse(storedHistory);
}
// renderSearchHistory();
initSearchHistory();
