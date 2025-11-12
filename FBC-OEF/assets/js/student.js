// Student dashboard JavaScript

// Load prospectus
function loadProspectus() {
    const db = firebase.firestore();
    db.collection('prospectus').get().then((querySnapshot) => {
        const prospectusContent = document.getElementById('prospectusContent');
        prospectusContent.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            prospectusContent.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.description}</p>
                        <p><strong>Regular Students:</strong> ${data.regularCount}</p>
                        <p><strong>Irregular Students:</strong> ${data.irregularCount}</p>
                    </div>
                </div>
            `;
        });
    });
}

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = '../index.html';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProspectus();
});
