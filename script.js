const authForm = document.querySelector("#auth-form");
if (authForm) {
    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!authForm.reportValidity()) return;
        authForm.querySelector(".auth-result").hidden = false;
    });
}

document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
        const password = document.getElementById(button.getAttribute("aria-controls"));
        const isVisible = password.type === "text";
        password.type = isVisible ? "password" : "text";
        button.textContent = isVisible ? "Show" : "Hide";
        button.setAttribute("aria-pressed", String(!isVisible));
    });
});