document.addEventListener("DOMContentLoaded", function () {
    // Static values for temperature and wind speed
    const temperatureF = 45; // Example in Fahrenheit
    const windSpeedMph = 10; // Example in mph

    // Function to calculate wind chill
    function calculateWindChill(tempF, windSpeedMph) {
        return (
            35.74 + 
            (0.6215 * tempF) - 
            (35.75 * Math.pow(windSpeedMph, 0.16)) + 
            (0.4275 * tempF * Math.pow(windSpeedMph, 0.16))
        ).toFixed(1); // Rounded to 1 decimal place
    }

    // Check if conditions allow wind chill calculation
    let windChillText = "N/A";
    if (temperatureF <= 50 && windSpeedMph > 3) {
        windChillText = calculateWindChill(temperatureF, windSpeedMph) + "°F";
    }

    // Display wind chill in the "Weather" section
    document.getElementById("wind-chill").textContent = windChillText;
});