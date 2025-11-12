// Admin dashboard JavaScript

// Load dashboard data
function loadDashboardData() {
    const db = firebase.firestore();

    // Load stats
    Promise.all([
        db.collection('users').where('role', '==', 'student').get(),
        db.collection('users').where('role', '==', 'teacher').get(),
        db.collection('courses').get(),
        db.collection('enrollments').where('status', '==', 'pending').get()
    ]).then(([studentsSnap, teachersSnap, coursesSnap, pendingSnap]) => {
        document.getElementById('totalStudents').textContent = studentsSnap.size;
        document.getElementById('totalTeachers').textContent = teachersSnap.size;
        document.getElementById('totalCourses').textContent = coursesSnap.size;
        document.getElementById('pendingApprovals').textContent = pendingSnap.size;
    });

    // Load recent activity
    db.collection('enrollments').orderBy('submittedAt', 'desc').limit(5).get().then((querySnapshot) => {
        const activityList = document.getElementById('recentActivity');
        activityList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${data.firstName} ${data.lastName} submitted ${data.type} enrollment`;
            activityList.appendChild(li);
        });
    });

    // Load analytics
    loadAnalytics();
}

// Load analytics data
function loadAnalytics() {
    const db = firebase.firestore();
    db.collection('prospectus').get().then((querySnapshot) => {
        const labels = [];
        const regularData = [];
        const irregularData = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            labels.push(data.title);
            regularData.push(data.regularCount || 0);
            irregularData.push(data.irregularCount || 0);
        });

        const ctx = document.getElementById('analyticsChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Regular Students',
                    data: regularData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }, {
                    label: 'Irregular Students',
                    data: irregularData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

// Refresh data
function refreshData() {
    loadDashboardData();
}

// Logout function
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = '../index.html';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});
