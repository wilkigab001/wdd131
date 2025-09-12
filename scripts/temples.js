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
