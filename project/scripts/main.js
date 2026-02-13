// Main JavaScript - Shared functionality across all pages

// Trail data
const trailsData = [
    {
        id: 1,
        name: "Bonneville Shoreline Trail",
        difficulty: "intermediate",
        length: "8.2 miles",
        elevation: "800 ft",
        description: "A scenic trail following the ancient shoreline of Lake Bonneville with stunning views of Utah Valley. This well-maintained trail offers a mix of flowing singletrack and technical sections, perfect for intermediate riders looking to improve their skills.",
        features: ["Scenic views", "Well-maintained", "Year-round access"]
    },
    {
        id: 2,
        name: "Dry Canyon Trail",
        difficulty: "beginner",
        length: "3.5 miles",
        elevation: "600 ft",
        description: "An excellent beginner trail with gradual climbs and smooth terrain. This trail is perfect for newcomers to mountain biking or those looking for a relaxed ride. The lower sections are particularly family-friendly with minimal technical challenges.",
        features: ["Beginner-friendly", "Smooth terrain", "Family-friendly"]
    },
    {
        id: 3,
        name: "Frank Trail",
        difficulty: "advanced",
        length: "6.7 miles",
        elevation: "1,400 ft",
        description: "A challenging ascent with technical rock gardens and steep switchbacks. Frank Trail rewards skilled riders with thrilling descents and breathtaking panoramic views of Provo Canyon. This trail demands excellent bike handling skills and strong climbing ability.",
        features: ["Technical sections", "Great views", "Challenging climbs"]
    },
    {
        id: 4,
        name: "Ridge Trail 157",
        difficulty: "intermediate",
        length: "5.3 miles",
        elevation: "950 ft",
        description: "A popular connector trail featuring flowing descents and moderate technical features. Ridge Trail 157 offers consistent challenges without being overwhelming, making it ideal for intermediate riders. The trail provides excellent opportunities to practice cornering and momentum management.",
        features: ["Flowing descents", "Popular", "Good connectors"]
    },
    {
        id: 5,
        name: "Y Trail",
        difficulty: "beginner",
        length: "2.8 miles",
        elevation: "400 ft",
        description: "Short and accessible trail leading to the iconic BYU Y landmark. While primarily a hiking trail, mountain bikers can enjoy the lower sections with beautiful valley views. This is an excellent choice for a quick after-work ride or introducing friends to mountain biking.",
        features: ["Iconic landmark", "Short distance", "Easy access"]
    },
    {
        id: 6,
        name: "Squaw Peak Trail",
        difficulty: "advanced",
        length: "7.1 miles",
        elevation: "2,700 ft",
        description: "One of Provo's most demanding trails with relentless climbing and technical rocky terrain. Squaw Peak Trail is reserved for experienced riders seeking a serious workout and technical challenge. The summit rewards with unparalleled 360-degree views of the Wasatch Range and Utah Valley.",
        features: ["Extreme climbing", "Rocky terrain", "Summit views"]
    }
];

// Initialize localStorage for ratings if not exists
function initializeRatings() {
    if (!localStorage.getItem('trailRatings')) {
        const initialRatings = {};
        trailsData.forEach(trail => {
            initialRatings[trail.id] = {
                totalRating: 0,
                count: 0,
                average: 0
            };
        });
        localStorage.setItem('trailRatings', JSON.stringify(initialRatings));
    }
}

// Initialize localStorage for comments if not exists
function initializeComments() {
    if (!localStorage.getItem('trailComments')) {
        localStorage.setItem('trailComments', JSON.stringify({}));
    }
}

// Get ratings from localStorage
function getRatings() {
    return JSON.parse(localStorage.getItem('trailRatings')) || {};
}

// Get comments from localStorage
function getComments() {
    return JSON.parse(localStorage.getItem('trailComments')) || {};
}

// Save rating to localStorage
function saveRating(trailId, rating) {
    const ratings = getRatings();
    
    if (!ratings[trailId]) {
        ratings[trailId] = { totalRating: 0, count: 0, average: 0 };
    }
    
    ratings[trailId].totalRating += rating;
    ratings[trailId].count += 1;
    ratings[trailId].average = ratings[trailId].totalRating / ratings[trailId].count;
    
    localStorage.setItem('trailRatings', JSON.stringify(ratings));
    return ratings[trailId];
}

// Save comment to localStorage
function saveComment(trailId, commentText) {
    const comments = getComments();
    
    if (!comments[trailId]) {
        comments[trailId] = [];
    }
    
    const newComment = {
        text: commentText,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    comments[trailId].push(newComment);
    localStorage.setItem('trailComments', JSON.stringify(comments));
    return newComment;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return 'Today';
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Create star rating HTML
function createStarRating(rating, interactive = false, trailId = null) {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
        const filled = i <= fullStars ? 'filled' : '';
        const dataAttr = interactive && trailId ? `data-rating="${i}" data-trail-id="${trailId}"` : '';
        stars.push(`<span class="star ${filled}" ${dataAttr}>★</span>`);
    }
    
    return stars.join('');
}

// Get trail by ID
function getTrailById(id) {
    return trailsData.find(trail => trail.id === parseInt(id));
}

// Get difficulty class
function getDifficultyClass(difficulty) {
    return `difficulty-${difficulty.toLowerCase()}`;
}

// Hamburger menu functionality
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => img.classList.add('loaded'));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeRatings();
    initializeComments();
    initializeHamburgerMenu();
    initializeLazyLoading();
});
