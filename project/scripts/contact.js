// Contact Page JavaScript

// Form validation functions
function validateName(name) {
    if (name.trim().length === 0) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    return '';
}

function validateEmail(email) {
    if (email.trim().length === 0) {
        return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    
    return '';
}

function validateSkillLevel(skillLevel) {
    if (!skillLevel || skillLevel === '') {
        return 'Please select your skill level';
    }
    return '';
}

// Display error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field && errorElement) {
        field.classList.add('error');
        errorElement.textContent = message;
    }
}

// Clear error message
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field && errorElement) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skillLevel = document.getElementById('skill-level').value;
    const joinGroup = document.getElementById('join-group').checked;
    
    // Clear all previous errors
    clearError('name');
    clearError('email');
    clearError('skill-level');
    
    // Validate all fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const skillError = validateSkillLevel(skillLevel);
    
    let hasErrors = false;
    
    if (nameError) {
        showError('name', nameError);
        hasErrors = true;
    }
    
    if (emailError) {
        showError('email', emailError);
        hasErrors = true;
    }
    
    if (skillError) {
        showError('skill-level', skillError);
        hasErrors = true;
    }
    
    // If there are errors, stop submission
    if (hasErrors) {
        return;
    }
    
    // Create submission object
    const formData = {
        name: name.trim(),
        email: email.trim(),
        skillLevel: skillLevel,
        joinGroup: joinGroup,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    saveFormSubmission(formData);
    
    // Hide form and show success message
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    form.classList.add('hidden');
    successMessage.classList.remove('hidden');
    
    // Reset form after a delay
    setTimeout(() => {
        form.reset();
        form.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }, 5000);
}

// Save form submission to localStorage
function saveFormSubmission(formData) {
    let submissions = [];
    
    const existingData = localStorage.getItem('contactSubmissions');
    if (existingData) {
        submissions = JSON.parse(existingData);
    }
    
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}

// Real-time validation
function setupRealtimeValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const skillField = document.getElementById('skill-level');
    
    if (nameField) {
        nameField.addEventListener('blur', () => {
            const error = validateName(nameField.value);
            if (error) {
                showError('name', error);
            } else {
                clearError('name');
            }
        });
        
        nameField.addEventListener('input', () => {
            if (nameField.classList.contains('error')) {
                const error = validateName(nameField.value);
                if (!error) {
                    clearError('name');
                }
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', () => {
            const error = validateEmail(emailField.value);
            if (error) {
                showError('email', error);
            } else {
                clearError('email');
            }
        });
        
        emailField.addEventListener('input', () => {
            if (emailField.classList.contains('error')) {
                const error = validateEmail(emailField.value);
                if (!error) {
                    clearError('email');
                }
            }
        });
    }
    
    if (skillField) {
        skillField.addEventListener('change', () => {
            const error = validateSkillLevel(skillField.value);
            if (error) {
                showError('skill-level', error);
            } else {
                clearError('skill-level');
            }
        });
    }
}

// Initialize contact page
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        setupRealtimeValidation();
    }
});
