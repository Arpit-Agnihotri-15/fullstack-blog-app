document.addEventListener(
    "DOMContentLoaded",
    () => {

        // ========================================
        // DOM ELEMENTS
        // ========================================

        const form =
            document.getElementById(
                "contactForm"
            );

        const nameInput =
            document.getElementById(
                "contactName"
            );

        const emailInput =
            document.getElementById(
                "contactEmail"
            );

        const subjectInput =
            document.getElementById(
                "contactSubject"
            );

        const messageInput =
            document.getElementById(
                "contactMessage"
            );

        const submitButton =
            document.getElementById(
                "contactSubmitBtn"
            );

        const successBox =
            document.getElementById(
                "contactSuccess"
            );

        const sendAnotherButton =
            document.getElementById(
                "sendAnotherBtn"
            );


        const API_URL =
            "http://localhost:5000/api/contact";


        // ========================================
        // EMAIL VALIDATION
        // ========================================

        function validateEmail(email) {

            const regex =
                /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

            return regex.test(email);

        }


        // ========================================
        // FIELD ERROR
        // ========================================

        function setFieldError(
            input,
            errorId,
            message
        ) {

            const error =
                document.getElementById(
                    errorId
                );


            if (message) {

                input.classList.add(
                    "input-error"
                );

                if (error) {

                    error.textContent =
                        message;

                }

            } else {

                input.classList.remove(
                    "input-error"
                );

                if (error) {

                    error.textContent =
                        "";

                }

            }

        }


        // ========================================
        // CLEAR ERRORS
        // ========================================

        function clearErrors() {

            setFieldError(
                nameInput,
                "contactNameError",
                ""
            );

            setFieldError(
                emailInput,
                "contactEmailError",
                ""
            );

            setFieldError(
                subjectInput,
                "contactSubjectError",
                ""
            );

            setFieldError(
                messageInput,
                "contactMessageError",
                ""
            );

        }


        // ========================================
        // FORM SUBMIT
        // ========================================

        form.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                clearErrors();


                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();

                const subject =
                    subjectInput.value.trim();

                const message =
                    messageInput.value.trim();


                let valid = true;


                // ================================
                // NAME
                // ================================

                if (name.length < 2) {

                    setFieldError(
                        nameInput,
                        "contactNameError",
                        "Please enter your full name."
                    );

                    valid = false;

                }


                // ================================
                // EMAIL
                // ================================

                if (
                    !validateEmail(email)
                ) {

                    setFieldError(
                        emailInput,
                        "contactEmailError",
                        "Please enter a valid email address."
                    );

                    valid = false;

                }


                // ================================
                // SUBJECT
                // ================================

                if (subject.length < 3) {

                    setFieldError(
                        subjectInput,
                        "contactSubjectError",
                        "Subject must contain at least 3 characters."
                    );

                    valid = false;

                }


                // ================================
                // MESSAGE
                // ================================

                if (message.length < 10) {

                    setFieldError(
                        messageInput,
                        "contactMessageError",
                        "Message must contain at least 10 characters."
                    );

                    valid = false;

                }


                if (!valid) {

                    if (
                        typeof showError ===
                        "function"
                    ) {

                        showError(
                            "Please fix the highlighted fields."
                        );

                    }

                    return;

                }


                // ========================================
                // LOADING STATE
                // ========================================

                const originalButtonHTML =
                    submitButton.innerHTML;


                submitButton.disabled =
                    true;


                submitButton.innerHTML =
                    `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;


                try {

                    // ========================================
                    // SEND TO BACKEND
                    // ========================================

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

                                        name,

                                        email,

                                        subject,

                                        message

                                    })

                            }
                        );


                    const data =
                        await response.json();


                    // ========================================
                    // HANDLE ERROR
                    // ========================================

                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        throw new Error(
                            data.message ||
                            "Unable to send message."
                        );

                    }


                    // ========================================
                    // SUCCESS
                    // ========================================

                    form.style.display =
                        "none";


                    successBox.classList.add(
                        "show"
                    );


                    if (
                        typeof showSuccess ===
                        "function"
                    ) {

                        showSuccess(
                            "Message sent successfully!"
                        );

                    }


                    form.reset();


                } catch (error) {

                    console.error(
                        "Contact form error:",
                        error
                    );


                    if (
                        typeof showError ===
                        "function"
                    ) {

                        showError(
                            error.message ||
                            "Unable to send your message."
                        );

                    }

                } finally {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        originalButtonHTML;

                }

            }
        );


        // ========================================
        // SEND ANOTHER MESSAGE
        // ========================================

        if (sendAnotherButton) {

            sendAnotherButton.addEventListener(
                "click",
                () => {

                    successBox.classList.remove(
                        "show"
                    );

                    form.style.display =
                        "block";

                    clearErrors();

                    nameInput.focus();

                }
            );

        }

    }
);