/* ============SCRIPTORA LOGIN JS================ */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginBtn = document.querySelector(".login-btn");
    const googleBtn = document.querySelector(".google-btn");

    /* ==========PASSWORD TOGGLE============= */

    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            if (password.type === "password") {
                password.type = "text";
                togglePassword.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                password.type = "password";
                togglePassword.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }

    /* ===========DISABLE COPY / CUT / PASTE============= */

    [password].forEach(field => {
        ["copy", "cut", "paste"].forEach(event => {
            field.addEventListener(event, e => {
                e.preventDefault();
                showWarning("Copy, Cut & Paste are disabled.");
            });
        });
    });

    /* ===========EMAIL VALIDATION=============== */

    function validateEmail(mail) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(mail);
    }

    /* ============LOGIN===============*/

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value.trim().toLowerCase();
        const userPassword = password.value.trim();
        if (!validateEmail(userEmail)) {
            showError("Please enter a valid email address.");
            email.focus();
            return;
        }
        if (userPassword.length < 6) {
            showWarning("Password must contain at least 6 characters.");
            password.focus();
            return;
        }
        const users = JSON.parse(localStorage.getItem("scriptoraUsers")) || [];
        console.log(users);
        const currentUser = users.find(user => {
            return (
                user.email === userEmail &&
                user.password === userPassword
            );
        });
        if (!currentUser) {
            showError("Incorrect email or password.");
            return;
        }
        /* Save Logged User */
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(currentUser)
        );
        /* Save Success Message */
        localStorage.setItem(
            "loginToast",
            `Welcome back, ${currentUser.name}!`
        );
        loginBtn.disabled = true;
        loginBtn.innerHTML =
            `<i class="fa-solid fa-spinner fa-spin"></i> Logging In...`;
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    });

    /* ===========GOOGLE LOGIN=============== */

    if (googleBtn) {
        googleBtn.addEventListener("click", () => {
            showInfo("Google Login Coming Soon.");
        });
    }
});