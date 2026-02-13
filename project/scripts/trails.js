// Trails Page JavaScript

let currentFilter = 'all';
let currentSort = 'name';
let filteredTrails = [];

// Initialize filtered trails from trailsData
function initializeFilteredTrails() {
    if (typeof trailsData !== 'undefined' && filteredTrails.length === 0) {
        filteredTrails = [...trailsData];
    }
}

// Display all trails
function displayTrails() {
    console.log('displayTrails called');
    const container = document.getElementById('trails-container');
    console.log('Container found:', container);
    
    if (!container) {
        console.error('trails-container element not found!');
        return;
    }
    
    // Check if trailsData exists
    if (typeof trailsData === 'undefined') {
        console.error('trailsData is not defined! Make sure main.js loaded properly.');
        container.innerHTML = '<p style="padding: 2rem; text-align: center; color: red;">Error: Trail data not loaded. Please refresh the page.</p>';
        return;
    }
    
    // Initialize filteredTrails if not already done
    initializeFilteredTrails();
    
    console.log('trailsData:', trailsData);
    console.log('filteredTrails length:', filteredTrails.length);
    
    const ratings = getRatings();
    console.log('Ratings:', ratings);
    
    const trailCards = filteredTrails.map(trail => {
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
                    <p>${trail.description.substring(0, 120)}...</p>
                    <div class="trail-rating">
                        <div class="stars">
                            ${createStarRating(trailRating.average)}
                        </div>
                        <span class="rating-count">(${trailRating.count} ratings)</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('Generated HTML length:', trailCards.length);
    container.innerHTML = trailCards;
    
    // Add click listeners
    const cards = container.querySelectorAll('.trail-card');
    console.log('Trail cards found:', cards.length);
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const trailId = card.getAttribute('data-trail-id');
            openTrailModal(trailId);
        });
    });
}

// Filter trails by difficulty
function filterTrails(difficulty) {
    currentFilter = difficulty;
    applyFiltersAndSort();
}

// Sort trails
function sortTrails(sortBy) {
    currentSort = sortBy;
    applyFiltersAndSort();
}

// Apply both filters and sorting
function applyFiltersAndSort() {
    // Make sure trailsData is loaded
    if (typeof trailsData === 'undefined') {
        console.error('trailsData not loaded');
        return;
    }
    
    const ratings = getRatings();
    
    // First, filter
    if (currentFilter === 'all') {
        filteredTrails = [...trailsData];
    } else {
        filteredTrails = trailsData.filter(trail => trail.difficulty === currentFilter);
    }
    
    // Then, sort
    if (currentSort === 'name') {
        filteredTrails.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'rating-high') {
        filteredTrails.sort((a, b) => {
            const ratingA = ratings[a.id]?.average || 0;
            const ratingB = ratings[b.id]?.average || 0;
            return ratingB - ratingA;
        });
    } else if (currentSort === 'rating-low') {
        filteredTrails.sort((a, b) => {
            const ratingA = ratings[a.id]?.average || 0;
            const ratingB = ratings[b.id]?.average || 0;
            return ratingA - ratingB;
        });
    } else if (currentSort === 'difficulty') {
        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        filteredTrails.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }
    
    displayTrails();
}

// Open trail modal
function openTrailModal(trailId) {
    const trail = getTrailById(trailId);
    if (!trail) return;
    
    const modal = document.getElementById('trail-modal');
    const modalBody = document.getElementById('modal-body');
    const ratings = getRatings();
    const comments = getComments();
    
    const trailRating = ratings[trail.id] || { average: 0, count: 0 };
    const trailComments = comments[trail.id] || [];
    
    const modalContent = `
        <div class="modal-trail-header">
            <h2>${trail.name}</h2>
            <span class="trail-difficulty ${getDifficultyClass(trail.difficulty)}">${trail.difficulty}</span>
        </div>
        
        <div class="modal-trail-info">
            <div><strong>Length:</strong> ${trail.length}</div>
            <div><strong>Elevation Gain:</strong> ${trail.elevation}</div>
            <div><strong>Difficulty:</strong> ${trail.difficulty}</div>
        </div>
        
        <div class="modal-trail-description">
            <h3>Description</h3>
            <p>${trail.description}</p>
        </div>
        
        <div class="trail-features">
            <h3>Features</h3>
            <ul>
                ${trail.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="rate-trail">
            <h3>Rate This Trail</h3>
            <div class="current-rating">
                <div class="stars">
                    ${createStarRating(trailRating.average)}
                </div>
                <span>${trailRating.average.toFixed(1)} average (${trailRating.count} ratings)</span>
            </div>
            <div class="rating-input">
                ${createStarRating(0, true, trail.id)}
            </div>
            <p id="rating-message"></p>
        </div>
        
        <div class="comment-section">
            <h3>Comments</h3>
            <div class="comment-form">
                <textarea id="comment-text" placeholder="Share your experience on this trail..."></textarea>
                <button id="submit-comment" data-trail-id="${trail.id}">Add Comment</button>
            </div>
            <div class="comments-list" id="comments-list">
                ${renderComments(trailComments)}
            </div>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modal.style.display = 'block';
    
    // Add event listeners for rating
    const ratingStars = modalBody.querySelectorAll('.rating-input .star');
    ratingStars.forEach(star => {
        star.addEventListener('click', handleRatingClick);
        star.addEventListener('mouseenter', handleRatingHover);
    });
    
    const ratingContainer = modalBody.querySelector('.rating-input');
    ratingContainer.addEventListener('mouseleave', () => {
        ratingStars.forEach(star => star.classList.remove('filled'));
    });
    
    // Add event listener for comment submission
    const submitCommentBtn = document.getElementById('submit-comment');
    submitCommentBtn.addEventListener('click', handleCommentSubmit);
}

// Handle rating click
function handleRatingClick(event) {
    const rating = parseInt(event.target.getAttribute('data-rating'));
    const trailId = parseInt(event.target.getAttribute('data-trail-id'));
    
    const updatedRating = saveRating(trailId, rating);
    
    const messageElement = document.getElementById('rating-message');
    messageElement.textContent = `Thank you for rating this trail ${rating} stars!`;
    messageElement.style.color = 'var(--success-color)';
    
    // Update the display
    setTimeout(() => {
        const modal = document.getElementById('trail-modal');
        modal.style.display = 'none';
        displayTrails();
    }, 1500);
}

// Handle rating hover
function handleRatingHover(event) {
    const rating = parseInt(event.target.getAttribute('data-rating'));
    const stars = event.target.parentElement.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Handle comment submission
function handleCommentSubmit(event) {
    const trailId = parseInt(event.target.getAttribute('data-trail-id'));
    const commentText = document.getElementById('comment-text').value.trim();
    
    if (commentText.length === 0) {
        alert('Please enter a comment before submitting.');
        return;
    }
    
    if (commentText.length < 10) {
        alert('Please enter a comment with at least 10 characters.');
        return;
    }
    
    const newComment = saveComment(trailId, commentText);
    
    // Clear the textarea
    document.getElementById('comment-text').value = '';
    
    // Update comments display
    const comments = getComments();
    const trailComments = comments[trailId] || [];
    document.getElementById('comments-list').innerHTML = renderComments(trailComments);
    
    // Show success message
    alert('Comment added successfully!');
}

// Render comments HTML
function renderComments(comments) {
    if (comments.length === 0) {
        return '<p>No comments yet. Be the first to share your experience!</p>';
    }
    
    // Sort comments by date, newest first
    const sortedComments = [...comments].sort((a, b) => b.timestamp - a.timestamp);
    
    return sortedComments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-date">${formatDate(comment.date)}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `).join('');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('trail-modal');
    modal.style.display = 'none';
}

// Initialize trails page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Trails Page');
    console.log('trailsData available:', typeof trailsData !== 'undefined');
    if (typeof trailsData !== 'undefined') {
        console.log('Number of trails:', trailsData.length);
    }
    
    // Display all trails initially
    displayTrails();
    
    // Set up filter listener
    const difficultyFilter = document.getElementById('difficulty-filter');
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', (e) => {
            console.log('Filter changed to:', e.target.value);
            filterTrails(e.target.value);
        });
    }
    
    // Set up sort listener
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            console.log('Sort changed to:', e.target.value);
            sortTrails(e.target.value);
        });
    }
    
    // Set up modal close listeners
    const modal = document.getElementById('trail-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Check if we should open a specific trail from URL
    const urlParams = new URLSearchParams(window.location.search);
    const trailId = urlParams.get('trail');
    if (trailId) {
        console.log('Opening trail from URL:', trailId);
        openTrailModal(trailId);
    }
});
