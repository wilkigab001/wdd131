document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const nav = document.querySelector("nav");

    hamburgerBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
        if (nav.classList.contains("active")) {
            hamburgerBtn.innerHTML = "&#10006;"; // Show 'X' when active
        } else {
            hamburgerBtn.innerHTML = "&#9776;"; // Show hamburger icon
        }
    });
});

const CurrentYear = new Date().getFullYear();
document.querySelector('#currentyear').textContent = CurrentYear

const LastModified = document.lastModified;
document.querySelector('#lastmodified').textContent = LastModified

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
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
          "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-4594.jpg"
      },
      {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53082,
        imageUrl:
          "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-8154.jpg"
      },
      {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19080,
        imageUrl:
          "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22478.jpg"
      }
  ];

  const templeContainer = document.querySelector(".filtered-temples");
  const navLinks = document.querySelectorAll("nav ul li a");


  function displayTemples(filteredTemples) {
      templeContainer.innerHTML = "";
      filteredTemples.forEach(temple => {
          const templeCard = document.createElement("div");
          templeCard.classList.add("temple-card");
          templeCard.innerHTML = `
              <h3>${temple.templeName}</h3>
              <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" width="400px" height="250px">
              <p><strong>Location:</strong> ${temple.location}</p>
              <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
              <p><strong>Area:</strong> ${temple.area} sq ft</p>
          `;
          templeContainer.appendChild(templeCard);
      });
  }

  function filterTemples(filter) {
      switch (filter) {
          case "old":
              return temples.filter(t => parseInt(t.dedicated.split(", ")[0]) < 1900);
          case "new":
              return temples.filter(t => parseInt(t.dedicated.split(", ")[0]) >= 2000);
          case "large":
              return temples.filter(t => t.area > 90000);
          case "small":
              return temples.filter(t => t.area <= 10000);
          default:
              return temples;
      }
  }

  navLinks.forEach(link => {
      link.addEventListener("click", (event) => {
          event.preventDefault();
          const filter = event.target.textContent.toLowerCase();
          displayTemples(filterTemples(filter));
      });
  });

  displayTemples(temples);

