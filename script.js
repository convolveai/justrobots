// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('notificationForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnLoader = document.getElementById('submitBtnLoader');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Basic validation
            if (!fullName || !email) {
                showMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            hideMessage();
            
            try {
                const formData = new FormData(form);
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showMessage('Thank you! We\'ll notify you when a robot is ready for you to play with.', 'success');
                    form.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showMessage(data.errors.map(error => error.message).join(', '), 'error');
                    } else {
                        showMessage('Oops! There was a problem submitting your form. Please try again.', 'error');
                    }
                }
            } catch (error) {
                showMessage('Oops! There was a problem submitting your form. Please try again.', 'error');
                console.error('Form submission error:', error);
            } finally {
                setLoadingState(false);
            }
        });
    }
    
    function setLoadingState(loading) {
        if (loading) {
            submitBtn.disabled = true;
            submitBtnText.style.display = 'none';
            submitBtnLoader.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            submitBtnText.style.display = 'inline-block';
            submitBtnLoader.style.display = 'none';
        }
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll to message if needed
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function hideMessage() {
        formMessage.style.display = 'none';
        formMessage.textContent = '';
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});
