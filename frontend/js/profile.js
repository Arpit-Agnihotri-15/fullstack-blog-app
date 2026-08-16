/* =====================================================
                SCRIPTORA PROFILE PAGE
                DATABASE CONNECTED VERSION
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    /* ==========================================
            CONFIGURATION
    ========================================== */

    const API_URL = "http://localhost:5000/api/users";


    /* ==========================================
            AUTH GUARD
    ========================================== */

    let loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser || !loggedInUser.id) {

        if (typeof showError === "function") {
            showError("Please login first.");
        }

        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);

        return;
    }


    const userId = loggedInUser.id;


    /* ==========================================
            DOM ELEMENTS
    ========================================== */

    const profileAvatar =
        document.getElementById("profileAvatar");

    const profileName =
        document.getElementById("profileName");

    const profileEmail =
        document.getElementById("profileEmail");

    const profileJoined =
        document.getElementById("profileJoined");


    const statBlogs =
        document.getElementById("statBlogs");

    const statLikes =
        document.getElementById("statLikes");

    const statComments =
        document.getElementById("statComments");

    const statViews =
        document.getElementById("statViews");


    const editForm =
        document.getElementById("editProfileForm");

    const editName =
        document.getElementById("editName");

    const editEmail =
        document.getElementById("editEmail");

    const editBio =
        document.getElementById("editBio");


    const passwordForm =
        document.getElementById("changePasswordForm");

    const currentPassword =
        document.getElementById("currentPassword");

    const newPassword =
        document.getElementById("newPassword");

    const confirmNewPassword =
        document.getElementById("confirmNewPassword");


    const deleteAccountBtn =
        document.getElementById("deleteAccountBtn");


    /* ==========================================
            HELPERS
    ========================================== */

    function validateEmail(mail) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(mail);

    }


    function setFieldError(
        input,
        errorId,
        message
    ) {

        const errorEl =
            document.getElementById(errorId);

        if (message) {

            input.classList.add("input-error");

            if (errorEl) {
                errorEl.textContent = message;
            }

        } else {

            input.classList.remove("input-error");

            if (errorEl) {
                errorEl.textContent = "";
            }

        }

    }


    function getInitials(name) {

        if (!name) {
            return "U";
        }

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(
                part =>
                    part[0].toUpperCase()
            )
            .join("");

    }


    function formatMemberDate(date) {

        if (!date) {
            return "Scriptora Member";
        }

        const formattedDate =
            new Date(date).toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );

        return `Member since ${formattedDate}`;

    }


    /* ==========================================
            RENDER PROFILE
    ========================================== */

    function renderProfile(user) {

        profileAvatar.textContent =
            getInitials(user.name);

        profileName.textContent =
            user.name || "User";

        profileEmail.textContent =
            user.email || "";


        profileJoined.innerHTML =
            `<i class="fa-solid fa-calendar-check"></i> ` +
            formatMemberDate(
                user.createdAt
            );


        editName.value =
            user.name || "";

        editEmail.value =
            user.email || "";

        editBio.value =
            user.bio || "";


        const navbarUserName =
            document.getElementById(
                "navbarUserName"
            );

        if (navbarUserName) {

            navbarUserName.textContent =
                user.name || "User";

        }

    }


    /* ==========================================
            RENDER STATS
    ========================================== */

    function renderStats(stats) {

        statBlogs.textContent =
            stats?.blogs ?? 0;

        statLikes.textContent =
            stats?.likes ?? 0;

        statComments.textContent =
            stats?.comments ?? 0;

        statViews.textContent =
            stats?.views ?? 0;

    }


    /* ==========================================
            LOAD PROFILE FROM MONGODB
    ========================================== */

    async function loadProfile() {

        try {

            const response =
                await fetch(
                    `${API_URL}/${encodeURIComponent(userId)}`
                );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Unable to load profile"
                );

            }


            /* Update local logged-in user
               with latest database data */

            loggedInUser = {

                ...loggedInUser,

                id: data.user.id,

                name: data.user.name,

                email: data.user.email,

                bio: data.user.bio || "",

                createdAt:
                    data.user.createdAt

            };


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(loggedInUser)
            );


            /* Render MongoDB data */

            renderProfile(
                data.user
            );

            renderStats(
                data.stats
            );


        } catch (error) {

            console.error(
                "Load profile error:",
                error
            );


            if (typeof showError === "function") {

                showError(
                    error.message ||
                    "Unable to load profile."
                );

            } else {

                alert(
                    error.message ||
                    "Unable to load profile."
                );

            }

        }

    }


    /* Load profile immediately */

    await loadProfile();


    /* ==========================================
            TABS
    ========================================== */

    const tabButtons =
        document.querySelectorAll(
            ".tab-btn"
        );

    const panels =
        document.querySelectorAll(
            ".profile-panel"
        );


    tabButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                tabButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );

                panels.forEach(
                    panel =>
                        panel.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                const target =
                    document.getElementById(
                        button.dataset.tab
                    );


                if (target) {

                    target.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /* ==========================================
            PASSWORD VISIBILITY TOGGLE
    ========================================== */

    document
        .querySelectorAll("[data-toggle]")
        .forEach(icon => {

            icon.addEventListener(
                "click",
                () => {

                    const input =
                        document.getElementById(
                            icon.dataset.toggle
                        );


                    if (!input) {
                        return;
                    }


                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";

                        icon.classList.replace(
                            "fa-eye",
                            "fa-eye-slash"
                        );

                    } else {

                        input.type =
                            "password";

                        icon.classList.replace(
                            "fa-eye-slash",
                            "fa-eye"
                        );

                    }

                }
            );

        });


    /* ==========================================
            EDIT PROFILE
    ========================================== */

    editForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                editName.value.trim();

            const email =
                editEmail.value
                    .trim()
                    .toLowerCase();

            const bio =
                editBio.value.trim();


            let isValid = true;


            /* Name validation */

            if (name.length < 3) {

                setFieldError(
                    editName,
                    "editNameError",
                    "Full name must be at least 3 characters."
                );

                isValid = false;

            } else {

                setFieldError(
                    editName,
                    "editNameError",
                    ""
                );

            }


            /* Email validation */

            if (!validateEmail(email)) {

                setFieldError(
                    editEmail,
                    "editEmailError",
                    "Please enter a valid email address."
                );

                isValid = false;

            } else {

                setFieldError(
                    editEmail,
                    "editEmailError",
                    ""
                );

            }


            if (!isValid) {

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


            /* Disable submit button */

            const submitButton =
                editForm.querySelector(
                    "button[type='submit']"
                );


            const originalButtonHTML =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Saving...`;


            try {

                const response =
                    await fetch(
                        `${API_URL}/${encodeURIComponent(userId)}`,
                        {

                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    name,
                                    email,
                                    bio

                                })

                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to update profile"
                    );

                }


                /* Update local logged-in user */

                loggedInUser = {

                    ...loggedInUser,

                    id: data.user.id,

                    name: data.user.name,

                    email: data.user.email,

                    bio: data.user.bio || "",

                    createdAt:
                        data.user.createdAt

                };


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(
                        loggedInUser
                    )
                );


                /* Render updated data */

                renderProfile(
                    data.user
                );


                /* Reload stats from MongoDB */

                await loadProfile();


                if (
                    typeof showSuccess ===
                    "function"
                ) {

                    showSuccess(
                        "Profile updated successfully!"
                    );

                }


            } catch (error) {

                console.error(
                    "Update profile error:",
                    error
                );


                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        error.message ||
                        "Unable to update profile."
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


    /* ==========================================
            CHANGE PASSWORD
    ========================================== */

    passwordForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const current =
                currentPassword.value;

            const next =
                newPassword.value;

            const confirmVal =
                confirmNewPassword.value;


            let isValid = true;


            /* Current password */

            if (!current) {

                setFieldError(
                    currentPassword,
                    "currentPasswordError",
                    "Please enter your current password."
                );

                isValid = false;

            } else {

                setFieldError(
                    currentPassword,
                    "currentPasswordError",
                    ""
                );

            }


            /* New password */

            if (next.length < 6) {

                setFieldError(
                    newPassword,
                    "newPasswordError",
                    "Password must contain at least 6 characters."
                );

                isValid = false;

            } else {

                setFieldError(
                    newPassword,
                    "newPasswordError",
                    ""
                );

            }


            /* Confirm password */

            if (next !== confirmVal) {

                setFieldError(
                    confirmNewPassword,
                    "confirmNewPasswordError",
                    "Passwords do not match."
                );

                isValid = false;

            } else {

                setFieldError(
                    confirmNewPassword,
                    "confirmNewPasswordError",
                    ""
                );

            }


            if (!isValid) {

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


            const submitButton =
                passwordForm.querySelector(
                    "button[type='submit']"
                );


            const originalButtonHTML =
                submitButton.innerHTML;


            submitButton.disabled = true;

            submitButton.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Updating...`;


            try {

                const response =
                    await fetch(
                        `${API_URL}/${encodeURIComponent(userId)}/password`,
                        {

                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({

                                    currentPassword:
                                        current,

                                    newPassword:
                                        next

                                })

                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to update password"
                    );

                }


                passwordForm.reset();


                /* Clear password errors */

                setFieldError(
                    currentPassword,
                    "currentPasswordError",
                    ""
                );

                setFieldError(
                    newPassword,
                    "newPasswordError",
                    ""
                );

                setFieldError(
                    confirmNewPassword,
                    "confirmNewPasswordError",
                    ""
                );


                if (
                    typeof showSuccess ===
                    "function"
                ) {

                    showSuccess(
                        "Password updated successfully!"
                    );

                }


            } catch (error) {

                console.error(
                    "Change password error:",
                    error
                );


                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        error.message ||
                        "Unable to update password."
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


    /* ==========================================
            DELETE ACCOUNT
    ========================================== */

    deleteAccountBtn.addEventListener(
        "click",
        async () => {

            const confirmed =
                await confirmAction(
                    "This will permanently delete your account and every blog you've published. This action cannot be undone.",
                    {
                        title:
                            "Delete Account?",

                        confirmText:
                            "Delete Account",

                        icon:
                            "fa-trash",

                        tone:
                            "danger"
                    }
                );


            if (!confirmed) {
                return;
            }


            deleteAccountBtn.disabled =
                true;


            const originalButtonHTML =
                deleteAccountBtn.innerHTML;


            deleteAccountBtn.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Deleting...`;


            try {

                const response =
                    await fetch(
                        `${API_URL}/${encodeURIComponent(userId)}`,
                        {
                            method: "DELETE"
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Failed to delete account"
                    );

                }


                /* Remove local login */

                localStorage.removeItem(
                    "loggedInUser"
                );


                /* Remove old frontend-only
                   user data if it exists */

                const users =
                    JSON.parse(
                        localStorage.getItem(
                            "scriptoraUsers"
                        )
                    ) || [];


                const remainingUsers =
                    users.filter(
                        user =>
                            user.id !== userId
                    );


                localStorage.setItem(
                    "scriptoraUsers",
                    JSON.stringify(
                        remainingUsers
                    )
                );


                if (
                    typeof showSuccess ===
                    "function"
                ) {

                    showSuccess(
                        "Account deleted successfully."
                    );

                }


                setTimeout(() => {

                    window.location.href =
                        "../index.html";

                }, 1200);


            } catch (error) {

                console.error(
                    "Delete account error:",
                    error
                );


                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        error.message ||
                        "Unable to delete account."
                    );

                }


                deleteAccountBtn.disabled =
                    false;

                deleteAccountBtn.innerHTML =
                    originalButtonHTML;

            }

        }
    );

});