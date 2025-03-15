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
