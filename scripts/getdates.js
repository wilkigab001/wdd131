const today = new Date();

const year = today.getFullYear();

document.getElementById('currentyear').textContent = `© ${year} WDD 131 Home Page`
document.getElementById('lastModified').textContent = `Last Modified : ${document.lastModified}`