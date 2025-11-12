// Admin users management JavaScript

// Load users
function loadUsers() {
    const db = firebase.firestore();
    db.collection('users').get().then((querySnapshot) => {
        const tableBody = document.getElementById('usersTable');
        tableBody.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.name || 'N/A'}</td>
                <td>${data.email}</td>
                <td>${data.role}</td>
                <td>${data.status || 'Active'}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editUser('${doc.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser('${doc.id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Add user
document.getElementById('addUserForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const role = document.getElementById('userRole').value;

    try {
        const db = firebase.firestore();
        await db.collection('users').add({
            name: name,
            email: email,
            role: role,
            status: 'Active',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('User added successfully!');
        loadUsers();
        bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
        document.getElementById('addUserForm').reset();
    } catch (error) {
        alert('Error adding user: ' + error.message);
    }
});

// Edit user
function editUser(userId) {
    // Implement edit functionality
    alert('Edit functionality to be implemented');
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        const db = firebase.firestore();
        db.collection('users').doc(userId).delete().then(() => {
            alert('User deleted successfully!');
            loadUsers();
        }).catch((error) => {
            alert('Error deleting user: ' + error.message);
        });
    }
}

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = '../index.html';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});
