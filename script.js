// ================= MENU TOGGLE =================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const body = document.body;

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
});

// Close menu after click
document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("menu-open");
    });
});


// ================= CONTACT FORM VALIDATION =================
const contactForm = document.getElementById("contact-form");
const alertBox = document.getElementById("form-alert");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        subject.value.trim() === "" ||
        message.value.trim() === ""
    ) {
        showAlert("❌ Please fill all fields", "error");
        return;
    }

    if (!email.value.includes("@")) {
        showAlert("❌ Invalid email address", "error");
        return;
    }

    if (message.value.length < 10) {
        showAlert("❌ Message too short", "error");
        return;
    }

    showAlert("✅ Message Sent Successfully", "success");

    contactForm.reset();
});

function showAlert(message, type) {
    alertBox.style.display = "block";
    alertBox.innerHTML = message;

    if (type === "error") {
        alertBox.style.background = "#fee2e2";
        alertBox.style.color = "#dc2626";
    } else {
        alertBox.style.background = "#dcfce7";
        alertBox.style.color = "#15803d";
    }

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}


// ================= FEEDBACK MODAL =================
const modal = document.getElementById("feedbackModal");
const feedbackBtn = document.querySelector(".feedback-btn");
const closeBtn = document.querySelector(".close");

feedbackBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// ================= FEEDBACK FORM =================
const feedbackForm = document.getElementById("feedbackForm");
const feedbackCards = document.getElementById("feedbackCards");

feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fbName = document.getElementById("fbName").value.trim();
    const fbRole = document.getElementById("fbRole").value;
    const fbRating = document.getElementById("fbRating").value;
    const fbMessage = document.getElementById("fbMessage").value.trim();

    if (!fbName || !fbRole || !fbMessage) {
        alert("Please complete all feedback fields");
        return;
    }

    let stars = "";

    for (let i = 0; i < fbRating; i++) {
        stars += `<i class="fas fa-star"></i>`;
    }

    const newFeedback = document.createElement("div");

    newFeedback.classList.add("feedback-card");

    newFeedback.innerHTML = `
        <div class="stars">${stars}</div>
        <p>"${fbMessage}"</p>
        <h4>— ${fbName}, ${fbRole}</h4>
    `;

    feedbackCards.prepend(newFeedback);

    feedbackForm.reset();

    modal.style.display = "none";

    alert("✅ Feedback Added Successfully");
});


// ================= ACTIVE NAVIGATION =================
window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section").forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    document.querySelectorAll("#navMenu a").forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


// ================= DOWNLOAD PDF =================
function downloadPDF() {
    const link = document.createElement("a");

    link.href = "assets/documents/babyeyi.pdf";

    link.download = "babyeyi.pdf";

    link.click();
}