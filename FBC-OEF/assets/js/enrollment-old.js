// Multi-step enrollment form JavaScript for old students

let currentStep = 1;
const totalSteps = 3;

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(content => {
        content.classList.add('d-none');
    });

    // Show current step
    document.getElementById(`step${step}`).classList.remove('d-none');

    // Update progress bar
    const progress = (step / totalSteps) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;

    // Update step indicators
    document.querySelectorAll('.step').forEach((indicator, index) => {
        if (index + 1 === step) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Handle payment method change
document.getElementById('paymentMethod').addEventListener('change', function() {
    const referenceDiv = document.getElementById('referenceNumberDiv');
    if (this.value === 'online') {
        referenceDiv.style.display = 'block';
        document.getElementById('referenceNumber').required = true;
    } else {
        referenceDiv.style.display = 'none';
        document.getElementById('referenceNumber').required = false;
    }
});

// Handle form submission
document.getElementById('enrollmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        studentId: document.getElementById('studentId').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        currentProgram: document.getElementById('currentProgram').value,
        fatherName: document.getElementById('fatherName').value,
        fatherOccupation: document.getElementById('fatherOccupation').value,
        motherName: document.getElementById('motherName').value,
        motherOccupation: document.getElementById('motherOccupation').value,
        siblings: document.getElementById('siblings').value,
        paymentMethod: document.getElementById('paymentMethod').value,
        amount: document.getElementById('amount').value,
        referenceNumber: document.getElementById('referenceNumber').value,
        status: 'pending',
        type: 'old',
        submittedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    try {
        const db = firebase.firestore();
        await db.collection('enrollments').add(formData);
        alert('Enrollment submitted successfully! Please wait for approval.');
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Error submitting enrollment: ' + error.message);
    }
});

// Initialize first step
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);
});
