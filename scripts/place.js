const temperature = 45 ;
const windSpeed = 5;

function calculateWindChill(temp, wind) {
    return 35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16);
}

function isWindChillViable(temp, wind) {
    return temp <= 50 && wind > 3;
}

function updateWeatherData() {
        // Get all the value spans in the weather section
        const weatherValues = document.querySelectorAll('.weather .value');
        
        // Update each weather value
        weatherValues[0].textContent = `${temperature}°F`; // Temperature
        weatherValues[1].textContent = 'Sunny'; // Conditions
        weatherValues[2].textContent = `${windSpeed} mph`; // Wind
        
        // Calculate and display windchill
        if (isWindChillViable(temperature, windSpeed)) {
            const windChill = calculateWindChill(temperature, windSpeed);
            weatherValues[3].textContent = `${Math.round(windChill)}°F`;
        } else {
            weatherValues[3].textContent = 'N/A';
        }
    }

    // Update the last modified date
    document.getElementById("lastModified").textContent = document.lastModified;

    // Initialize weather data when the page loads
    document.addEventListener('DOMContentLoaded', updateWeatherData);

