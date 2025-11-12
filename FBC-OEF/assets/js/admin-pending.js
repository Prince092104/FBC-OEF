// Admin pending students JavaScript

let currentEnrollmentId = null;

// Load pending enrollments
function loadPendingEnrollments() {
    const db = firebase.firestore();
    db.collection('enrollments').where('status', '==', 'pending').get().then((querySnapshot) => {
        const tableBody = document.getElementById('pendingStudentsTable');
        tableBody.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.firstName} ${data.lastName}</td>
                <td>${data.type}</td>
                <td>${data.email}</td>
                <td>${data.intendedProgram || data.currentProgram || 'N/A'}</td>
                <td>${data.submittedAt ? data.submittedAt.toDate().toLocaleDateString() : 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="showApprovalModal('${doc.id}')">Approve</button>
                    <button class="btn btn-sm btn-danger" onclick="rejectEnrollment('${doc.id}')">Reject</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    });
}

// Show approval modal
function showApprovalModal(enrollmentId) {
    currentEnrollmentId = enrollmentId;
    const db = firebase.firestore();
    db.collection('enrollments').doc(enrollmentId).get().then((doc) => {
        const data = doc.data();
        const details = document.getElementById('studentDetails');
        details.innerHTML = `
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Program:</strong> ${data.intendedProgram || data.currentProgram || 'N/A'}</p>
        `;
        const modal = new bootstrap.Modal(document.getElementById('approvalModal'));
        modal.show();
    });
}

// Approve enrollment
function approveEnrollment() {
    if (!currentEnrollmentId) return;

    const db = firebase.firestore();
    db.collection('enrollments').doc(currentEnrollmentId).update({
        status: 'approved',
        approvedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('Enrollment approved successfully!');
        loadPendingEnrollments();
        bootstrap.Modal.getInstance(document.getElementById('approvalModal')).hide();
    }).catch((error) => {
        alert('Error approving enrollment: ' + error.message);
    });
}

// Reject enrollment
function rejectEnrollment(enrollmentId) {
    if (confirm('Are you sure you want to reject this enrollment?')) {
        const db = firebase.firestore();
        db.collection('enrollments').doc(enrollmentId).update({
            status: 'rejected',
            rejectedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert('Enrollment rejected.');
            loadPendingEnrollments();
        }).catch((error) => {
            alert('Error rejecting enrollment: ' + error.message);
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
    loadPendingEnrollments();
});
