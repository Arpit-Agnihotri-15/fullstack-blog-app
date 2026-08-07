/* =====================================================
                SCRIPTORA PROFILE PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
            AUTH GUARD
    ========================================== */

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {

        window.location.href = "login.html";
        return;

    }

    /* ==========================================
            DOM ELEMENTS
    ========================================== */

    const profileAvatar = document.getElementById("profileAvatar");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileJoined = document.getElementById("profileJoined");

    const editForm = document.getElementById("editProfileForm");
    const editName = document.getElementById("editName");
    const editEmail = document.getElementById("editEmail");
    const editBio = document.getElementById("editBio");

    const passwordForm = document.getElementById("changePasswordForm");
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmNewPassword = document.getElementById("confirmNewPassword");

    const deleteAccountBtn = document.getElementById("deleteAccountBtn");

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
            if (errorEl) errorEl.textContent = message;
        } else {
            input.classList.remove("input-error");
            if (errorEl) errorEl.textContent = "";
        }

    }

    function getInitials(name) {

        if (!name) return "U";

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part[0].toUpperCase())
            .join("");

    }

    function getUsers() {
        return JSON.parse(localStorage.getItem("scriptoraUsers")) || [];
    }

    function saveUsers(users) {
        localStorage.setItem("scriptoraUsers", JSON.stringify(users));
    }

    /* ==========================================
            RENDER PROFILE
    ========================================== */

    function renderProfile() {

        profileAvatar.textContent = getInitials(loggedInUser.name);
        profileName.textContent = loggedInUser.name;
        profileEmail.textContent = loggedInUser.email;

        profileJoined.innerHTML =
            `<i class="fa-solid fa-calendar-check"></i> ` +
            (loggedInUser.joinedAt
                ? `Member since ${loggedInUser.joinedAt}`
                : `Scriptora Member`);

        editName.value = loggedInUser.name || "";
        editEmail.value = loggedInUser.email || "";
        editBio.value = loggedInUser.bio || "";

    }

    renderProfile();

    /* ==========================================
            STATS
    ========================================== */

    function renderStats() {

        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        const myBlogs = blogs.filter(
            blog => blog.author === loggedInUser.name
        );

        document.getElementById("statBlogs").textContent =
            myBlogs.length;

        document.getElementById("statLikes").textContent =
            myBlogs.reduce((sum, b) => sum + (b.likes || 0), 0);

        document.getElementById("statComments").textContent =
            myBlogs.reduce((sum, b) => {

                const count = Array.isArray(b.comments)
                    ? b.comments.length
                    : (b.comments || 0);

                return sum + count;

            }, 0);

        document.getElementById("statViews").textContent =
            myBlogs.reduce((sum, b) => sum + (b.views || 0), 0);

    }

    renderStats();

    /* ==========================================
            TABS
    ========================================== */

    const tabButtons = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".profile-panel");

    tabButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            tabButtons.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");

            document
                .getElementById(btn.dataset.tab)
                .classList.add("active");

        });

    });

    /* ==========================================
            PASSWORD VISIBILITY TOGGLE
    ========================================== */

    document.querySelectorAll("[data-toggle]").forEach(icon => {

        icon.addEventListener("click", () => {

            const input = document.getElementById(icon.dataset.toggle);

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";
                icon.classList.replace("fa-eye", "fa-eye-slash");

            } else {

                input.type = "password";
                icon.classList.replace("fa-eye-slash", "fa-eye");

            }

        });

    });

    /* ==========================================
            EDIT PROFILE
    ========================================== */

    editForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = editName.value.trim();
        const email = editEmail.value.trim().toLowerCase();
        const bio = editBio.value.trim();

        let isValid = true;

        if (name.length < 3) {

            setFieldError(editName, "editNameError", "Full name must be at least 3 characters.");
            isValid = false;

        } else {

            setFieldError(editName, "editNameError", "");

        }

        if (!validateEmail(email)) {

            setFieldError(editEmail, "editEmailError", "Please enter a valid email address.");
            isValid = false;

        } else {

            setFieldError(editEmail, "editEmailError", "");

        }

        const originalEmail = loggedInUser.email;

        const users = getUsers();

        const emailTaken = users.some(
            u => u.email === email && u.email !== originalEmail
        );

        if (emailTaken) {

            setFieldError(editEmail, "editEmailError", "This email is already in use.");
            isValid = false;

        }

        if (!isValid) {

            showError("Please fix the highlighted fields.");
            return;

        }

        const oldName = loggedInUser.name;

        loggedInUser = {
            ...loggedInUser,
            name,
            email,
            bio
        };

        /* Update this user's record inside scriptoraUsers, matched by their
           original (pre-edit) email so a simultaneous email change still
           finds the right record. */

        const updatedUsers = users.map(u =>
            u.email === originalEmail ? loggedInUser : u
        );

        saveUsers(updatedUsers);

        /* Keep authored blogs in sync if the display name changed */

        if (oldName !== name) {

            const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

            const syncedBlogs = blogs.map(blog =>
                blog.author === oldName
                    ? { ...blog, author: name }
                    : blog
            );

            localStorage.setItem("blogs", JSON.stringify(syncedBlogs));

        }

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        showSuccess("Profile updated successfully!");

        renderProfile();
        renderStats();

        const navbarUserName = document.getElementById("navbarUserName");

        if (navbarUserName) navbarUserName.textContent = name;

    });

    /* ==========================================
            CHANGE PASSWORD
    ========================================== */

    passwordForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const current = currentPassword.value.trim();
        const next = newPassword.value.trim();
        const confirmVal = confirmNewPassword.value.trim();

        let isValid = true;

        if (current !== loggedInUser.password) {

            setFieldError(currentPassword, "currentPasswordError", "Current password is incorrect.");
            isValid = false;

        } else {

            setFieldError(currentPassword, "currentPasswordError", "");

        }

        if (next.length < 6) {

            setFieldError(newPassword, "newPasswordError", "Password must contain at least 6 characters.");
            isValid = false;

        } else {

            setFieldError(newPassword, "newPasswordError", "");

        }

        if (next !== confirmVal) {

            setFieldError(confirmNewPassword, "confirmNewPasswordError", "Passwords do not match.");
            isValid = false;

        } else {

            setFieldError(confirmNewPassword, "confirmNewPasswordError", "");

        }

        if (!isValid) {

            showError("Please fix the highlighted fields.");
            return;

        }

        loggedInUser = {
            ...loggedInUser,
            password: next
        };

        const users = getUsers().map(u =>
            u.email === loggedInUser.email ? loggedInUser : u
        );

        saveUsers(users);

        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        passwordForm.reset();

        showSuccess("Password updated successfully!");

    });

    /* ==========================================
            DELETE ACCOUNT
    ========================================== */

    deleteAccountBtn.addEventListener("click", async () => {

        const confirmed = await confirmAction(
            "This will permanently delete your account and every blog you've published. This action cannot be undone.",
            {
                title: "Delete Account?",
                confirmText: "Delete Account",
                icon: "fa-trash",
                tone: "danger"
            }
        );

        if (!confirmed) return;

        const users = getUsers().filter(
            u => u.email !== loggedInUser.email
        );

        saveUsers(users);

        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

        const remainingBlogs = blogs.filter(
            blog => blog.author !== loggedInUser.name
        );

        localStorage.setItem("blogs", JSON.stringify(remainingBlogs));

        localStorage.removeItem("loggedInUser");

        showSuccess("Account deleted. We're sorry to see you go.");

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1200);

    });

});
