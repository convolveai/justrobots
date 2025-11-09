// Password protection
document.addEventListener('DOMContentLoaded', function() {
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    
    // Set the correct password code here
    const CORRECT_PASSWORD = 'arcanabytes2025'; // Change this to your desired password
    
    // Check if user is already authenticated
    if (sessionStorage.getItem('authenticated') === 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const enteredPassword = passwordInput.value.trim();
            
            if (!enteredPassword) {
                showError('Please enter a code.');
                return;
            }
            
            if (enteredPassword === CORRECT_PASSWORD) {
                // Store authentication in sessionStorage
                sessionStorage.setItem('authenticated', 'true');
                // Redirect to main page
                window.location.href = 'index.html';
            } else {
                showError('Incorrect code. Please try again.');
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(function() {
            errorMessage.style.opacity = '0';
        }, 3000);
    }
    
    // Clear error on input
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (errorMessage.style.display === 'block') {
                errorMessage.style.display = 'none';
                errorMessage.style.opacity = '1';
            }
        });
    }
});

