const WEATHER_API_KEY = '24d406821e2317c7855432c7f0b2a7a0';
const DISCORD_USER_ID = '832420003432103958';

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    document.getElementById('clock').innerText = `${hours}:${minutes} ${ampm}`;
}

function fetchWeather() {
    const latitude = 33.17017931509078;
    const longitude = -96.76586896076903;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('weather').innerText = `${data.weather[0].description}, ${data.main.temp}°F`;
        })
        .catch(() => document.getElementById('weather').innerText = 'Weather unavailable');
}

function fetchDiscordStatus() {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const status = `${data.data.discord_status}`;
            const spotify = data.data.listening_to_spotify ? `<div class="info"><span class="label">Listening:</span> ${data.data.spotify.song} - ${data.data.spotify.artist}</div>` : '';
            document.getElementById('discord-status').innerHTML = `${status} ${spotify}`;
        }
    })
    .catch(() => document.getElementById('discord-status').innerText = 'Discord status unavailable');
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial calls
    updateClock();
    fetchWeather();
    fetchDiscordStatus();
    
    // Set intervals
    setInterval(updateClock, 30000);
    setInterval(fetchWeather, 600000);
    setInterval(fetchDiscordStatus, 5000);
});