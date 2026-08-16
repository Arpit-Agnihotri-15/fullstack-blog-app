/* ============ SCRIPTORA LOGIN JS ============ */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.querySelector(".login-form");

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginBtn =
        document.querySelector(".login-btn");

    const googleBtn =
        document.querySelector(".google-btn");


    // ==============================
    // API
    // ==============================

    const API_URL =
        "http://localhost:5000/api/auth/login";


    // ==============================
    // PASSWORD TOGGLE
    // ==============================

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                    togglePassword.classList.replace(
                        "fa-eye",
                        "fa-eye-slash"
                    );

                } else {

                    password.type =
                        "password";

                    togglePassword.classList.replace(
                        "fa-eye-slash",
                        "fa-eye"
                    );

                }

            }
        );

    }


    // ==============================
    // DISABLE COPY / CUT / PASTE
    // ==============================

    [password].forEach(field => {

        if (!field) return;

        ["copy", "cut", "paste"].forEach(
            event => {

                field.addEventListener(
                    event,
                    e => {

                        e.preventDefault();

                        showWarning(
                            "Copy, Cut & Paste are disabled."
                        );

                    }
                );

            }
        );

    });


    // ==============================
    // EMAIL VALIDATION
    // ==============================

    function validateEmail(mail) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(mail);

    }


    // ==============================
    // LOGIN
    // ==============================

    form.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();


            const userEmail =
                email.value
                    .trim()
                    .toLowerCase();


            const userPassword =
                password.value.trim();


            // ==============================
            // VALIDATION
            // ==============================

            if (
                !validateEmail(
                    userEmail
                )
            ) {

                showError(
                    "Please enter a valid email address."
                );

                email.focus();

                return;

            }


            if (
                userPassword.length < 6
            ) {

                showWarning(
                    "Password must contain at least 6 characters."
                );

                password.focus();

                return;

            }


            // ==============================
            // LOADING
            // ==============================

            loginBtn.disabled = true;

            loginBtn.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Logging In...`;


            try {

                // ==============================
                // LOGIN API
                // ==============================

                const response =
                    await fetch(
                        API_URL,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    email:
                                        userEmail,

                                    password:
                                        userPassword

                                })

                        }
                    );


                const data =
                    await response.json();


                // ==============================
                // LOGIN FAILED
                // ==============================

                if (!response.ok) {

                    showError(
                        data.message ||
                        "Incorrect email or password."
                    );

                    return;

                }


                if (
                    !data.success ||
                    !data.user
                ) {

                    showError(
                        "Invalid login response from server."
                    );

                    return;

                }


                // ==============================
                // SAVE USER
                // ==============================

                const loggedInUser = {

                    id:
                        data.user.id,

                    name:
                        data.user.name,

                    email:
                        data.user.email

                };


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(
                        loggedInUser
                    )
                );


                // ==============================
                // SUCCESS MESSAGE
                // ==============================

                localStorage.setItem(
                    "loginToast",
                    `Welcome back, ${loggedInUser.name}!`
                );


                // ==============================
                // REDIRECT
                // ==============================

                setTimeout(() => {

                    window.location.href =
                        "../index.html";

                }, 1000);


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );


                showError(
                    "Unable to connect to the server."
                );


            } finally {

                loginBtn.disabled =
                    false;

                loginBtn.innerHTML =
                    "Login";

            }

        }
    );


    // ==============================
    // GOOGLE LOGIN
    // ==============================

    if (googleBtn) {

        googleBtn.addEventListener(
            "click",
            () => {

                showInfo(
                    "Google Login Coming Soon."
                );

            }
        );

    }

});