function setError(id, msg) {
    const el = document.getElementById(`error-${id}`);
    if (el) el.textContent = msg;
}
function clearError(id) { setError(id, ""); }

function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function validatePassword(v) {
    return v.length >= 6; 
}

function mockLogin(payload) {
    return new Promise(res => setTimeout(() => res({ ok: true, user: { name: "User" } }), 800));
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const successBox = document.getElementById("login-success");

    form.addEventListener("submit", async e => {
        e.preventDefault();
        ["email", "password"].forEach(clearError);

        const email = form.email.value.trim();
        const password = form.password.value;

        let ok = true;
        if (!validateEmail(email)) { setError("email", "Email không hợp lệ"); ok = false; }
        if (!validatePassword(password)) { setError("password", "Mật khẩu ít nhất 6 ký tự"); ok = false; }
        if (!ok) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Đang đăng nhập…";

        const payload = { email, password };
        try {
            const res = await mockLogin(payload);
            if (res.ok) {
                if (window.localStorage) {
                    localStorage.setItem("authUser", JSON.stringify(res.user));
                }
                successBox.hidden = false;
                setTimeout(() => (successBox.hidden = true), 3000);
                setTimeout(() => window.location.href = "../../index.html", 1500);
            } else {
                alert("Đăng nhập thất bại");
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi khi thực hiện đăng nhập");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Đăng nhập";
        }
    });
});
