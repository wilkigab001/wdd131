const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

  window.onload = () => {
    const select = document.getElementById("productName");
    const ratingDisplay = document.getElementById("averageRating");

    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Select a Product ...";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    products.forEach(product => {
      const option = document.createElement("option");
      option.value = product.id;
      option.textContent = product.name;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      const selectedProduct = products.find(p => p.id === select.value);
      if (selectedProduct) {
        ratingDisplay.textContent = `Average Rating: ${selectedProduct.averagerating} ★`;
      } else {
        ratingDisplay.textContent = "";
      }
    });

    if (window.location.pathname.includes("review.html")) {
      let reviewCount = localStorage.getItem("reviewCount");
      reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
      localStorage.setItem("reviewCount", reviewCount);
      const counterDisplay = document.getElementById("reviewCounter");
      if (counterDisplay) {
        counterDisplay.textContent = `You have submitted ${reviewCount} review(s).`;
      }
    }
  };