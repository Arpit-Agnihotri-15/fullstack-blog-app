document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".register-form");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword =
        document.getElementById("toggleConfirmPassword");

    const registerBtn =
        document.querySelector(".register-btn");

    const googleBtn =
        document.querySelector(".google-btn");

    const API_URL =
        "http://localhost:5000/api/auth/register";


    /* ==============================
            PASSWORD TOGGLE
    ============================== */

    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";

                togglePassword.classList.replace(
                    "fa-eye",
                    "fa-eye-slash"
                );

            } else {

                password.type = "password";

                togglePassword.classList.replace(
                    "fa-eye-slash",
                    "fa-eye"
                );

            }

        });

    }


    /* ==============================
        CONFIRM PASSWORD TOGGLE
    ============================== */

    if (toggleConfirmPassword) {

        toggleConfirmPassword.addEventListener("click", () => {

            if (confirmPassword.type === "password") {

                confirmPassword.type = "text";

                toggleConfirmPassword.classList.replace(
                    "fa-eye",
                    "fa-eye-slash"
                );

            } else {

                confirmPassword.type = "password";

                toggleConfirmPassword.classList.replace(
                    "fa-eye-slash",
                    "fa-eye"
                );

            }

        });

    }


    /* ==============================
            EMAIL VALIDATION
    ============================== */

    function validateEmail(mail) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

        return regex.test(mail);

    }


    /* ==============================
            REGISTER
    ============================== */

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const userName =
            name.value.trim();

        const userEmail =
            email.value.trim().toLowerCase();

        const userPassword =
            password.value;

        const userConfirmPassword =
            confirmPassword.value;


        /* Required fields */

        if (
            !userName ||
            !userEmail ||
            !userPassword ||
            !userConfirmPassword
        ) {

            showError(
                "Please fill all required fields."
            );

            return;

        }


        /* Email validation */

        if (!validateEmail(userEmail)) {

            showError(
                "Please enter a valid email address."
            );

            email.focus();

            return;

        }


        /* Password length */

        if (userPassword.length < 6) {

            showWarning(
                "Password must contain at least 6 characters."
            );

            password.focus();

            return;

        }


        /* Confirm password */

        if (userPassword !== userConfirmPassword) {

            showError(
                "Passwords do not match."
            );

            confirmPassword.focus();

            return;

        }


        /* Loading state */

        registerBtn.disabled = true;

        registerBtn.innerHTML =
            `<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...`;


        try {

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: userName,

                    email: userEmail,

                    password: userPassword

                })

            });


            const data = await response.json();


            if (!response.ok) {

                showError(
                    data.message ||
                    "Registration failed."
                );

                return;

            }


            /* Successful registration */

            showSuccess(
                "Account created successfully!"
            );


            form.reset();


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1200);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            showError(
                "Unable to connect to the server."
            );

        } finally {

            registerBtn.disabled = false;

            registerBtn.innerHTML =
                "Create Account";

        }

    });


    /* ==============================
            GOOGLE LOGIN
    ============================== */

    if (googleBtn) {

        googleBtn.addEventListener("click", () => {

            showInfo(
                "Google Login Coming Soon."
            );

        });

    }

});