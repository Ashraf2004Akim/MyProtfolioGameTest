// ================================================
// AUTHENTICATION SYSTEM
// ================================================

function getCredentials() {
    const stored = localStorage.getItem('adminCredentials');
    if (stored) return JSON.parse(stored);
    const defaults = { username: 'ashraf', password: 'admin123' };
    localStorage.setItem('adminCredentials', JSON.stringify(defaults));
    return defaults;
}

function isLoggedIn() {
    return sessionStorage.getItem('adminSession') === 'active';
}

// Login Page
const loginForm = document.getElementById('login-form');
if (loginForm) {
    if (isLoggedIn()) window.location.href = 'admin.html';

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('login-error');
        const creds = getCredentials();

        if (username === creds.username && password === creds.password) {
            sessionStorage.setItem('adminSession', 'active');
            window.location.href = 'admin.html';
        } else {
            errorDiv.style.display = 'flex';
            setTimeout(() => { errorDiv.style.display = 'none'; }, 3000);
        }
    });

    const toggleBtn = document.getElementById('toggle-password');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const pwInput = document.getElementById('password');
            const icon = toggleBtn.querySelector('i');
            if (pwInput.type === 'password') {
                pwInput.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                pwInput.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    }
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('adminSession');
        window.location.href = 'login.html';
    });
}

// Protect admin page
if (window.location.pathname.includes('admin.html') && !isLoggedIn()) {
    window.location.href = 'login.html';
}