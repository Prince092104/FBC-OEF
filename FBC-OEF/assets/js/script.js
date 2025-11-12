// General script for FBC Online Enrollment Portal

// Function to show login modal
function showLogin(type) {
    document.getElementById('loginModalLabel').textContent = type === 'admin' ? 'Admin Login' : 'Student Login';
    const modal = new bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
}

// Function to show register modal
function showRegister() {
    const modal = new bootstrap.Modal(document.getElementById('registerModal'));
    modal.show();
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Firebase auth logic will be added here
    console.log('Login attempt:', email);
});

// Handle register form submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const captcha = document.getElementById('captcha').value;
    // Firebase auth logic will be added here
    console.log('Register attempt:', email);
});
