/* =====================================================
        SCRIPTORA CUSTOM CONFIRMATION MODAL
===================================================== */

let scriptoraModalRoot = null;

function buildScriptoraModal() {

    if (scriptoraModalRoot) return scriptoraModalRoot;

    const overlay = document.createElement("div");

    overlay.className = "scriptora-modal-overlay";

    overlay.innerHTML = `
        <div class="scriptora-modal" role="dialog" aria-modal="true">
            <div class="scriptora-modal-icon">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 class="scriptora-modal-title">Are you sure?</h3>
            <p class="scriptora-modal-message"></p>
            <div class="scriptora-modal-actions">
                <button type="button" class="btn btn-outline scriptora-modal-cancel">
                    Cancel
                </button>
                <button type="button" class="btn btn-danger scriptora-modal-confirm">
                    Confirm
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    scriptoraModalRoot = overlay;

    return overlay;

}

/**
 * Shows a custom confirmation modal.
 * Returns a Promise<boolean> — true if confirmed, false if cancelled.
 *
 * confirmAction("Delete this blog?", {
 *     title: "Delete Blog",
 *     confirmText: "Delete",
 *     cancelText: "Cancel",
 *     icon: "fa-trash",
 *     tone: "danger" | "primary"
 * });
 */
function confirmAction(message, options = {}) {

    const overlay = buildScriptoraModal();

    const {
        title = "Are you sure?",
        confirmText = "Confirm",
        cancelText = "Cancel",
        icon = "fa-triangle-exclamation",
        tone = "danger"
    } = options;

    const modal = overlay.querySelector(".scriptora-modal");
    const iconBox = overlay.querySelector(".scriptora-modal-icon");
    const titleEl = overlay.querySelector(".scriptora-modal-title");
    const messageEl = overlay.querySelector(".scriptora-modal-message");
    const confirmBtn = overlay.querySelector(".scriptora-modal-confirm");
    const cancelBtn = overlay.querySelector(".scriptora-modal-cancel");

    titleEl.textContent = title;
    messageEl.textContent = message;
    confirmBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;

    iconBox.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    iconBox.className =
        `scriptora-modal-icon ${tone === "primary" ? "tone-primary" : "tone-danger"}`;

    confirmBtn.className =
        `btn scriptora-modal-confirm ${tone === "primary" ? "btn-primary" : "btn-danger"}`;

    overlay.classList.add("show");
    document.body.classList.add("modal-open");

    return new Promise(resolve => {

        function cleanup(result) {

            overlay.classList.remove("show");
            document.body.classList.remove("modal-open");

            confirmBtn.removeEventListener("click", onConfirm);
            cancelBtn.removeEventListener("click", onCancel);
            overlay.removeEventListener("click", onOverlayClick);
            document.removeEventListener("keydown", onKeydown);

            resolve(result);

        }

        function onConfirm() {
            cleanup(true);
        }

        function onCancel() {
            cleanup(false);
        }

        function onOverlayClick(e) {
            if (e.target === overlay) cleanup(false);
        }

        function onKeydown(e) {
            if (e.key === "Escape") cleanup(false);
        }

        confirmBtn.addEventListener("click", onConfirm);
        cancelBtn.addEventListener("click", onCancel);
        overlay.addEventListener("click", onOverlayClick);
        document.addEventListener("keydown", onKeydown);

        setTimeout(() => confirmBtn.focus(), 100);

    });

}
