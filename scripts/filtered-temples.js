const today = new Date();

const year = today.getFullYear();

document.getElementById('currentyear').textContent = `© ${year} WDD 131 Temples`
document.getElementById('lastModified').textContent = `Last Modified : ${document.lastModified}`

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  
  if (hamburger.textContent === "☰") {
    hamburger.textContent = "✖";
  } else {
    hamburger.textContent = "☰";
  }
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: 'Apia Samoa',
    location: 'Pesega Apia, Samoa',
    dedicated:'1983, August, 7',
    area: 18691,
    imageUrl: 'https://churchofjesuschristtemples.org/apia-samoa-temple/photographs/#Gallery-2'
  },
  {
    templeName: 'Monticello Utah',
    location: 'Monticello, Utah',
    dedicated:'1198, July, 16',
    area: 11225,
    imageUrl: 'https://churchofjesuschristtemples.org/monticello-utah-temple/photographs/#Gallery-2'
  },
  {
    templeName: 'Elko Nevada',
    location: 'Elko, Nevada',
    dedicated:'2025, October, 12',
    area: 12901,
    imageUrl: 'https://churchofjesuschristtemples.org/elko-nevada-temple/photographs/#Gallery-2'
  }
];


// Get the container where temple cards will be displayed
// Get the container where temple cards will be displayed
const templeContainer = document.getElementById('temple-container'); // Update with your actual container ID

// Function to create a temple card
function createTempleCard(temple) {
  // Create figure element
  const figure = document.createElement('figure');
  figure.classList.add('temple-card');
  
  // Create and configure the image
  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = 'lazy'; // Native lazy loading
  
  // Create figcaption with temple details
  const figcaption = document.createElement('figcaption');
  figcaption.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p><strong>Location:</strong> ${temple.location}</p>
    <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
    <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
  `;
  
  // Append image and figcaption to figure
  figure.appendChild(img);
  figure.appendChild(figcaption);
  
  return figure;
}

// Function to display temples
function displayTemples(filteredTemples) {
  // Clear the container
  templeContainer.innerHTML = '';
  
  // Add each temple card to the container
  filteredTemples.forEach(temple => {
    const card = createTempleCard(temple);
    templeContainer.appendChild(card);
  });
}

// Function to get the year from the dedicated date string
function getYear(dedicatedDate) {
  // Extract year from format "YYYY, Month, Day"
  return parseInt(dedicatedDate.split(',')[0]);
}

// Filter functions
function filterOld() {
  const oldTemples = temples.filter(temple => getYear(temple.dedicated) < 1900);
  displayTemples(oldTemples);
}

function filterNew() {
  const newTemples = temples.filter(temple => getYear(temple.dedicated) > 2000);
  displayTemples(newTemples);
}

function filterLarge() {
  const largeTemples = temples.filter(temple => temple.area > 90000);
  displayTemples(largeTemples);
}

function filterSmall() {
  const smallTemples = temples.filter(temple => temple.area < 10000);
  displayTemples(smallTemples);
}

function showAllTemples() {
  displayTemples(temples);
}

// Add event listeners to navigation menu items
document.getElementById('home').addEventListener('click', showAllTemples);
document.getElementById('old').addEventListener('click', filterOld);
document.getElementById('new').addEventListener('click', filterNew);
document.getElementById('large').addEventListener('click', filterLarge);
document.getElementById('small').addEventListener('click', filterSmall);

// Display all temples on initial load
showAllTemples();