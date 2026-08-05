/* ===============SCRIPTORA REGISTER JS================ */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".register-form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const registerBtn = document.querySelector(".register-btn");
    const googleBtn = document.querySelector(".google-btn");

    /* ============PASSWORD TOGGLE============ */

    function toggle(input, icon){
        if(input.type==="password"){
            input.type="text";
            icon.classList.replace("fa-eye","fa-eye-slash");
        }
        else{
            input.type="password";
            icon.classList.replace("fa-eye-slash","fa-eye");
        }
    }
    togglePassword.addEventListener("click",()=>{
        toggle(password,togglePassword);
    });
    toggleConfirmPassword.addEventListener("click",()=>{
        toggle(confirmPassword,toggleConfirmPassword);
    });

    /* =======DISABLE COPY / CUT / PASTE========= */

    [password,confirmPassword].forEach(field=>{
        ["copy","cut","paste"].forEach(event=>{
            field.addEventListener(event,e=>{
                e.preventDefault();
                showWarning("Copy, Cut & Paste are disabled.");
            });
        });
    });

    /* ==========EMAIL VALIDATION============ */

    function validateEmail(mail){
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(mail);
    }

    /* ===========REGISTER============*/

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const fullName=name.value.trim();
        const userEmail=email.value.trim().toLowerCase();
        const userPassword=password.value.trim();
        const confirm=confirmPassword.value.trim();
        if(fullName.length<3){
            showWarning("Full name must contain at least 3 characters.");
            name.focus();
            return;
        }
        if(!validateEmail(userEmail)){
            showError("Please enter a valid email address.");
            email.focus();
            return;
        }
        if(userPassword.length<6){
            showWarning("Password must contain at least 6 characters.");
            password.focus();
            return;
        }
        if(userPassword!==confirm){
            showError("Passwords do not match.");
            confirmPassword.focus();
            return;
        }

        /* ===========CHECK EXISTING USER============ */

        let users=JSON.parse(localStorage.getItem("scriptoraUsers")) || [];
        const exists=users.find(user=>user.email===userEmail);
        if(exists){
            showError("Account already exists with this email.");
            return;
        }
        users.push({
            name:fullName,
            email:userEmail,
            password:userPassword
        });
        localStorage.setItem("scriptoraUsers",JSON.stringify(users));
        registerBtn.disabled=true;
        registerBtn.innerHTML="Creating Account...";
        showSuccess("Registration Successful!");
        form.reset();
        setTimeout(()=>{
            window.location.href="login.html";
        },1800);
    });

    /* ============GOOGLE BUTTON=============*/

    googleBtn.addEventListener("click",()=>{
        showInfo("Google Sign Up Coming Soon.");
    });
});