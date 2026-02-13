// Home Page JavaScript

// Display featured trails on home page
function displayFeaturedTrails() {
    const container = document.getElementById('featured-trails-container');
    if (!container) return;
    
    const ratings = getRatings();
    
    // Get first 3 trails for featured section
    const featuredTrails = trailsData.slice(0, 3);
    
    const trailCards = featuredTrails.map(trail => {
        const trailRating = ratings[trail.id] || { average: 0, count: 0 };
        
        return `
            <div class="trail-card" data-trail-id="${trail.id}">
                <img src="https://via.placeholder.com/400x200/2c5f2d/ffffff?text=${encodeURIComponent(trail.name)}" 
                     alt="${trail.name}" 
                     loading="lazy">
                <div class="trail-card-content">
                    <h3>${trail.name}</h3>
                    <span class="trail-difficulty ${getDifficultyClass(trail.difficulty)}">${trail.difficulty}</span>
                    <div class="trail-info">
                        <span>📏 ${trail.length}</span>
                        <span>📈 ${trail.elevation}</span>
                    </div>
                    <div class="trail-rating">
                        <div class="stars">
                            ${createStarRating(trailRating.average)}
                        </div>
                        <span class="rating-count">(${trailRating.count} reviews)</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = trailCards;
    
    // Add click listeners to trail cards
    const cards = container.querySelectorAll('.trail-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const trailId = card.getAttribute('data-trail-id');
            window.location.href = `trails.html?trail=${trailId}`;
        });
    });
}

// Update stats section
function updateStats() {
    const ratings = getRatings();
    const comments = getComments();
    
    // Count total reviews
    let totalReviews = 0;
    Object.values(ratings).forEach(rating => {
        totalReviews += rating.count;
    });
    
    Object.values(comments).forEach(commentArray => {
        totalReviews += commentArray.length;
    });
    
    const totalReviewsElement = document.getElementById('total-reviews');
    if (totalReviewsElement) {
        totalReviewsElement.textContent = totalReviews;
    }
}

// Initialize home page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedTrails();
    updateStats();
});
