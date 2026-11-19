document.addEventListener("DOMContentLoaded", () => {
    const loginTab = document.getElementById("login-tab");
    const registerTab = document.getElementById("register-tab");
    const loginPanel = document.getElementById("login-panel");
    const registerPanel = document.getElementById("register-panel");

    function showPanel(panel) {
        const isLogin = panel === "login";

        loginTab.classList.toggle("active", isLogin);
        loginTab.setAttribute("aria-selected", String(isLogin));
        registerTab.classList.toggle("active", !isLogin);
        registerTab.setAttribute("aria-selected", String(!isLogin));
        loginPanel.hidden = !isLogin;
        registerPanel.hidden = isLogin;
    }

    loginTab.addEventListener("click", () => showPanel("login"));
    registerTab.addEventListener("click", () => showPanel("register"));
    document.querySelectorAll("[data-show-register]").forEach((button) => {
        button.addEventListener("click", () => showPanel("register"));
    });
    document.querySelectorAll("[data-show-login]").forEach((button) => {
        button.addEventListener("click", () => showPanel("login"));
    });
});
