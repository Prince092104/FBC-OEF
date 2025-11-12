// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login function
function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Register function
function registerUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

// Logout function
function logoutUser() {
    return auth.signOut();
}

// Check auth state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user.email);
        // Redirect based on user role (implement role checking)
    } else {
        console.log('User is signed out');
    }
});

// Handle login form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await loginUser(email, password);
        alert('Login successful!');
        // Redirect to appropriate dashboard
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
});

// Handle register form
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        await registerUser(email, password);
        alert('Registration successful!');
        // Redirect or close modal
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
});
