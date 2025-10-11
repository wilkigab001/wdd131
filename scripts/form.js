
const products = [
    { name: "Smart Thermostat Pro" },
    { name: "LED Light Bulb Set" },
    { name: "Cordless Drill XL" },
    { name: "Bluetooth Speaker Mini" },
    { name: "Kitchen Mixer Deluxe" }
];

const selectElement = document.getElementById('productName');
products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    selectElement.appendChild(option);
});


// Increment and display review counter
let reviewCount = localStorage.getItem('reviewCount') || 0;
reviewCount = parseInt(reviewCount) + 1;
localStorage.setItem('reviewCount', reviewCount);

// Display the count (add an element with id="reviewCounter" to your HTML)
document.getElementById('reviewCounter').textContent = reviewCount;