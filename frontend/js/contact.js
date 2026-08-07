/* =====================================================
                SCRIPTORA CONTACT FORM
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const subjectInput = document.getElementById("contactSubject");
    const messageInput = document.getElementById("contactMessage");

    const submitBtn = document.getElementById("contactSubmitBtn");
    const successBox = document.getElementById("contactSuccess");
    const sendAnotherBtn = document.getElementById("sendAnotherBtn");

    /* ==========================================
            HELPERS
    ========================================== */

    function validateEmail(mail) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(mail);
    }

    function setFieldError(input, errorId, message) {

        const errorEl = document.getElementById(errorId);

        if (message) {

            input.classList.add("input-error");
            input.classList.remove("input-success");

            if (errorEl) errorEl.textContent = message;

        } else {

            input.classList.remove("input-error");
            input.classList.add("input-success");

            if (errorEl) errorEl.textContent = "";

        }

    }

    /* ==========================================
            LIVE VALIDATION
    ========================================== */

    nameInput.addEventListener("input", () => {

        if (nameInput.value.trim().length >= 3) {
            setFieldError(nameInput, "contactNameError", "");
        }

    });

    emailInput.addEventListener("input", () => {

        if (validateEmail(emailInput.value.trim())) {
            setFieldError(emailInput, "contactEmailError", "");
        }

    });

    subjectInput.addEventListener("input", () => {

        if (subjectInput.value.trim().length >= 4) {
            setFieldError(subjectInput, "contactSubjectError", "");
        }

    });

    messageInput.addEventListener("input", () => {

        if (messageInput.value.trim().length >= 10) {
            setFieldError(messageInput, "contactMessageError", "");
        }

    });

    /* ==========================================
            SUBMIT
    ========================================== */

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        let isValid = true;

        if (name.length < 3) {

            setFieldError(nameInput, "contactNameError", "Full name must be at least 3 characters.");
            isValid = false;

        } else {

            setFieldError(nameInput, "contactNameError", "");

        }

        if (!validateEmail(email)) {

            setFieldError(emailInput, "contactEmailError", "Please enter a valid email address.");
            isValid = false;

        } else {

            setFieldError(emailInput, "contactEmailError", "");

        }

        if (subject.length < 4) {

            setFieldError(subjectInput, "contactSubjectError", "Subject must be at least 4 characters.");
            isValid = false;

        } else {

            setFieldError(subjectInput, "contactSubjectError", "");

        }

        if (message.length < 10) {

            setFieldError(messageInput, "contactMessageError", "Message must be at least 10 characters.");
            isValid = false;

        } else {

            setFieldError(messageInput, "contactMessageError", "");

        }

        if (!isValid) {

            showError("Please fix the highlighted fields.");
            return;

        }

        /* ==========================================
                SIMULATE SEND (Frontend Only)
        ========================================== */

        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        const messages =
            JSON.parse(localStorage.getItem("contactMessages")) || [];

        messages.push({
            name,
            email,
            subject,
            message,
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(messages)
        );

        setTimeout(() => {

            form.reset();

            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                input.classList.remove("input-error", "input-success");
            });

            form.style.display = "none";
            successBox.classList.add("show");

            submitBtn.disabled = false;
            submitBtn.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Send Message';

            showSuccess("Your message has been sent!");

        }, 1200);

    });

    /* ==========================================
            SEND ANOTHER
    ========================================== */

    if (sendAnotherBtn) {

        sendAnotherBtn.addEventListener("click", () => {

            successBox.classList.remove("show");
            form.style.display = "block";

        });

    }

});
