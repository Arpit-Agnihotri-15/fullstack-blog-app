/* ===========SCRIPTORA TOAST SYSTEM============== */

function showToast(message, type = "info") {
    const oldToast = document.querySelector(".scriptora-toast");
    if (oldToast) {
        oldToast.remove();
    }
    const toast = document.createElement("div");
    toast.className = `scriptora-toast ${type}`;
    let icon = "fa-circle-info";
    switch (type) {
        case "success":
            icon = "fa-circle-check";
            break;
        case "error":
            icon = "fa-circle-xmark";
            break;
        case "warning":
            icon = "fa-triangle-exclamation";
            break;
        default:
            icon = "fa-circle-info";
    }
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid ${icon}"></i>
        </div>
        <div class="toast-message">
            ${message}
        </div>
        <button class="toast-close">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="toast-progress"></div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.add("show");
    });
    const closeToast = () => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    };
    toast.querySelector(".toast-close")
        .addEventListener("click", closeToast);
    setTimeout(closeToast, 3500);
}

/* ==============HELPERS=================*/

function showSuccess(message){
    showToast(message,"success");
}
function showError(message){
    showToast(message,"error");
}
function showWarning(message){
    showToast(message,"warning");
}
function showInfo(message){
    showToast(message,"info");
}