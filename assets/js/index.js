document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");

    // OPEN
    window.openModal = function () {
        document.getElementById("feedbackModal").style.display = "flex";
    };

    // CLOSE
    window.closeModal = function () {
        document.getElementById("feedbackModal").style.display = "none";
    };

    // SUBMIT
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("fbName").value.trim();
        let role = document.getElementById("fbRole").value;
        let rating = document.getElementById("fbRating").value;
        let message = document.getElementById("fbMessage").value.trim();

        if (!name || !role || !message) {
            alert("Fill all fields!");
            return;
        }

        let feedback = { name, role, rating, message };

        let data = JSON.parse(localStorage.getItem("mtc_feedbacks")) || [];
        data.push(feedback);

        localStorage.setItem("mtc_feedbacks", JSON.stringify(data));

        form.reset();
        closeModal();
        loadFeedback();
    });

    // DISPLAY
    function loadFeedback() {
        let container = document.getElementById("feedbackCards");

        // ❗ IMPORTANT: don't delete default cards
        let saved = JSON.parse(localStorage.getItem("mtc_feedbacks")) || [];

        saved.forEach(fb => {

            let stars = "⭐".repeat(fb.rating);

            let card = document.createElement("div");
            card.className = "feedback-card";

            card.innerHTML = `
                <div style="color:#f1c40f;">${stars}</div>
                <p>"${fb.message}"</p>
                <h5>${fb.name}</h5>
                <span>${fb.role}</span>
            `;

            container.appendChild(card);
        });
    }

    loadFeedback();

    // CLOSE OUTSIDE
    window.onclick = function (e) {
        let modal = document.getElementById("feedbackModal");
        if (e.target === modal) {
            modal.style.display = "none";
        }
    };

});
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("fbName").value.trim();
    const role = document.getElementById("fbRole").value;
    const rating = document.getElementById("fbRating").value;
    const message = document.getElementById("fbMessage").value.trim();

    // ❌ VALIDATION
    if (name.length < 3) {
        alert("Name must be at least 3 characters");
        return;
    }

    if (role === "") {
        alert("Please select your role");
        return;
    }

    if (message.length < 10) {
        alert("Feedback must be at least 10 characters");
        return;
    }

    // SAVE FEEDBACK
    let feedback = { name, role, rating, message };

    let data = JSON.parse(localStorage.getItem("mtc_feedbacks")) || [];
    data.push(feedback);

    localStorage.setItem("mtc_feedbacks", JSON.stringify(data));

    this.reset();
    closeModal();
    loadFeedback();
});
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btnText = document.getElementById('btn-text');
    const alertBox = document.getElementById('form-alert');

    // GET VALUES
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // RESET ALERT
    alertBox.style.display = "none";

    // ❌ VALIDATION RULES
    if (name.length < 3) {
        showAlert("Name must be at least 3 characters", "error");
        return;
    }

    if (!validateEmail(email)) {
        showAlert("Please enter a valid email", "error");
        return;
    }

    if (subject.length < 3) {
        showAlert("Subject is too short", "error");
        return;
    }

    if (message.length < 10) {
        showAlert("Message must be at least 10 characters", "error");
        return;
    }

    // LOADING
    btnText.innerText = 'Sending...';

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (response.ok) {
            showAlert(result.success, "success");
            this.reset();
        } else {
            showAlert(result.error || "Failed to send message", "error");
        }

    } catch (error) {
        showAlert("Server not running", "error");
    } finally {
        btnText.innerText = 'Send Message';
    }
});

// EMAIL VALIDATION FUNCTION
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ALERT FUNCTION
function showAlert(msg, type) {
    const alertBox = document.getElementById("form-alert");

    alertBox.style.display = "block";
    alertBox.innerText = msg;

    if (type === "success") {
        alertBox.style.background = "#d4edda";
        alertBox.style.color = "#155724";
    } else {
        alertBox.style.background = "#f8d7da";
        alertBox.style.color = "#721c24";
    }
}

    // Handle form submission via Fetch API
    document.getElementById('contact-form').addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent page refresh

        const btnText = document.getElementById('btn-text');
        const alertBox = document.getElementById('form-alert');
        
        // Collect form data
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Loading state
        btnText.innerText = 'Sending...';
        alertBox.style.display = 'none';

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                // Success message
                alertBox.style.display = 'block';
                alertBox.style.backgroundColor = '#d4edda';
                alertBox.style.color = '#155724';
                alertBox.innerText = result.success;
                this.reset(); // Clear form
            } else {
                // Error from server
                alertBox.style.display = 'block';
                alertBox.style.backgroundColor = '#f8d7da';
                alertBox.style.color = '#721c24';
                alertBox.innerText = result.error || 'Failed to send message.';
            }
        } catch (error) {
            console.error('Error:', error);
            alertBox.style.display = 'block';
            alertBox.style.backgroundColor = '#f8d7da';
            alertBox.style.color = '#721c24';
            alertBox.innerText = 'An error occurred. Make sure the server is running.';
        } finally {
            btnText.innerText = 'Send Message'; // Reset button
        }
        
    });
    function downloadPDF() {
    const url = "assets/documents/babyeyi.pdf";
    
    // Show loading indicator (optional)
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = "⏳ Downloading...";
    button.disabled = true;
    
    // Open tab temporarily
    const tempTab = window.open(url, "_blank");
    
    // Trigger forced download using fetch
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "babyeyi.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            
            // Close temp tab
            setTimeout(() => {
                if (tempTab && !tempTab.closed) {
                    tempTab.close();
                }
            }, 300);
        })
        .catch(error => {
            console.error("Download failed:", error);
            alert("Download failed. The file will open in new tab.");
        })
        .finally(() => {
            // Reset button
            button.innerHTML = originalText;
            button.disabled = false;
        });
}
