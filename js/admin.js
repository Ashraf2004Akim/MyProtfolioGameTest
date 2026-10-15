// ================================================
// ADMIN DASHBOARD - FULL GAME EDITOR
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('adminSession')) {
        window.location.href = 'login.html';
        return;
    }
    initSidebar();
    loadCurrentData();
    initForms();
    renderGameEditors();
    initGameButtons();
});

// ==========================================
// SIDEBAR
// ==========================================

function initSidebar() {
    const items = document.querySelectorAll('.sidebar-item');
    const sections = document.querySelectorAll('.admin-section');

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            sections.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(`section-${item.dataset.section}`);
            if (target) target.classList.add('active');
        });
    });
}

// ==========================================
// LOAD DATA
// ==========================================

function loadCurrentData() {
    const data = localStorage.getItem('portfolioData');
    if (!data) return;
    const p = JSON.parse(data);

    setVal('edit-name', p.name);
    setVal('edit-age', p.age);
    setVal('edit-location', p.location);
    setVal('edit-timezone', p.timezone);
    setVal('edit-languages', p.languages);
    setVal('edit-education', p.education);
    setVal('edit-playertype', p.playertype);
    setVal('edit-hero-title', p.heroTitle);
    setVal('edit-hero-subtitle', p.heroSubtitle);
    setVal('edit-stat-hours', p.statHours);
    setVal('edit-stat-years', p.statYears);
    setVal('edit-stat-recordings', p.statRecordings);
    setVal('edit-stat-platforms', p.statPlatforms);
    setVal('edit-about-description', p.aboutDescription);
    setVal('edit-profile-img', p.profileImg);
    setVal('edit-exp-img', p.expImg);
    setVal('edit-cpu', p.cpu);
    setVal('edit-ram', p.ram);
    setVal('edit-storage', p.storage);
    setVal('edit-gpu', p.gpu);
    setVal('edit-recording', p.recording);
    setVal('edit-quality', p.quality);
    setVal('edit-mic', p.mic);
    setVal('edit-internet', p.internet);
    setVal('edit-email', p.email);
    setVal('edit-discord', p.discord);
    setVal('edit-linkedin', p.linkedin);
    setVal('edit-twitter', p.twitter);
    setVal('edit-steam', p.steam);
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
}

function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function getData() {
    const stored = localStorage.getItem('portfolioData');
    return stored ? JSON.parse(stored) : {};
}

function showSuccess() {
    const alert = document.getElementById('save-success');
    alert.style.display = 'flex';
    setTimeout(() => { alert.style.display = 'none'; }, 4000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// IMAGE PREVIEW
// ==========================================

window.previewImages = function () {
    const avatarUrl = getVal('edit-profile-img');
    const expUrl = getVal('edit-exp-img');

    const previewAvatar = document.getElementById('preview-avatar');
    const previewExp = document.getElementById('preview-exp');

    if (previewAvatar) {
        previewAvatar.innerHTML = avatarUrl
            ? `<img src="${avatarUrl}" alt="Avatar Preview" onerror="this.src=''; this.alt='Failed to load'">`
            : '<p style="color: var(--text-muted); font-size: 0.85rem;">No URL entered</p>';
    }
    if (previewExp) {
        previewExp.innerHTML = expUrl
            ? `<img src="${expUrl}" alt="Exp Preview" onerror="this.src=''; this.alt='Failed to load'">`
            : '<p style="color: var(--text-muted); font-size: 0.85rem;">No URL entered</p>';
    }
};

// ==========================================
// GAME EDITOR RENDERING
// ==========================================

function renderGameEditors() {
    renderGameEditorList('pc-games-editor', 'pcGames');
    renderGameEditorList('mobile-games-editor', 'mobileGames');
}

function renderGameEditorList(containerId, storageKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const games = JSON.parse(localStorage.getItem(storageKey) || '[]');
    container.innerHTML = '';

    games.forEach((game, index) => {
        const card = document.createElement('div');
        card.className = 'game-editor-card';
        card.dataset.index = index;

        card.innerHTML = `
            <div class="game-editor-header">
                <h4>🎮 ${game.name}</h4>
                <button class="btn-delete-game" onclick="deleteGame('${storageKey}', ${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Game Name</label>
                    <input type="text" class="game-name" value="${game.name || ''}">
                </div>
                <div class="form-group">
                    <label>Genre</label>
                    <input type="text" class="game-genre" value="${game.genre || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Details / Notes</label>
                <input type="text" class="game-details" value="${game.details || ''}" placeholder="e.g., Played Mirage, Odyssey, Origins">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Hours Played</label>
                    <input type="text" class="game-hours" value="${game.hours || ''}" placeholder="e.g., 6,350+ hrs">
                </div>
                <div class="form-group">
                    <label>Rank Achieved</label>
                    <input type="text" class="game-rank" value="${game.rank || ''}" placeholder="e.g., Gold 2">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Experience Level (0-100)</label>
                    <input type="number" class="game-expertise" min="0" max="100" value="${game.expertise || 50}">
                </div>
                <div class="form-group">
                    <label>Experience Label</label>
                    <select class="game-expertise-label">
                        <option value="Beginner" ${game.expertiseLabel === 'Beginner' ? 'selected' : ''}>Beginner</option>
                        <option value="Intermediate" ${game.expertiseLabel === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                        <option value="Experienced" ${game.expertiseLabel === 'Experienced' ? 'selected' : ''}>Experienced</option>
                        <option value="Advanced" ${game.expertiseLabel === 'Advanced' ? 'selected' : ''}>Advanced</option>
                        <option value="Expert" ${game.expertiseLabel === 'Expert' ? 'selected' : ''}>Expert</option>
                        <option value="Master" ${game.expertiseLabel === 'Master' ? 'selected' : ''}>Master</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Banner Image URL</label>
                <input type="url" class="game-banner-img" value="${game.bannerImg || ''}" placeholder="https://i.ibb.co/...">
                <small class="form-hint">Direct image URL from ImgBB or similar</small>
            </div>
            <div class="form-group">
                <label>Tags (comma separated)</label>
                <input type="text" class="game-tags-input" value="${(game.tags || []).join(', ')}" placeholder="e.g., Roleplay, Online, Story Mode">
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" class="game-featured" ${game.featured ? 'checked' : ''}>
                    Featured (takes full width in grid)
                </label>
            </div>
        `;

        container.appendChild(card);
    });
}

// ==========================================
// GAME CRUD OPERATIONS
// ==========================================

window.deleteGame = function (storageKey, index) {
    if (!confirm('Are you sure you want to delete this game?')) return;

    const games = JSON.parse(localStorage.getItem(storageKey) || '[]');
    games.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(games));

    const containerId = storageKey === 'pcGames' ? 'pc-games-editor' : 'mobile-games-editor';
    renderGameEditorList(containerId, storageKey);
    showSuccess();
};

function saveGamesFromEditor(containerId, storageKey) {
    const container = document.getElementById(containerId);
    const cards = container.querySelectorAll('.game-editor-card');
    const games = [];

    cards.forEach(card => {
        const tagsInput = card.querySelector('.game-tags-input').value;
        const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);

        games.push({
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 5),
            name: card.querySelector('.game-name').value,
            genre: card.querySelector('.game-genre').value,
            details: card.querySelector('.game-details').value,
            hours: card.querySelector('.game-hours').value,
            rank: card.querySelector('.game-rank').value,
            expertise: parseInt(card.querySelector('.game-expertise').value) || 50,
            expertiseLabel: card.querySelector('.game-expertise-label').value,
            bannerImg: card.querySelector('.game-banner-img').value,
            tags: tags,
            featured: card.querySelector('.game-featured').checked
        });
    });

    localStorage.setItem(storageKey, JSON.stringify(games));
    renderGameEditorList(containerId, storageKey);
    showSuccess();
}

function addNewGame(containerId, storageKey) {
    const games = JSON.parse(localStorage.getItem(storageKey) || '[]');
    games.push({
        id: Date.now() + '_new',
        name: 'New Game',
        genre: 'Genre',
        details: '',
        hours: '',
        rank: '',
        expertise: 50,
        expertiseLabel: 'Intermediate',
        bannerImg: '',
        tags: [],
        featured: false
    });
    localStorage.setItem(storageKey, JSON.stringify(games));
    renderGameEditorList(containerId, storageKey);

    // Scroll to bottom
    const container = document.getElementById(containerId);
    const lastCard = container.lastElementChild;
    if (lastCard) lastCard.scrollIntoView({ behavior: 'smooth' });
}

function initGameButtons() {
    // PC Games
    document.getElementById('add-pc-game').addEventListener('click', () => {
        addNewGame('pc-games-editor', 'pcGames');
    });
    document.getElementById('save-pc-games').addEventListener('click', () => {
        saveGamesFromEditor('pc-games-editor', 'pcGames');
    });

    // Mobile Games
    document.getElementById('add-mobile-game').addEventListener('click', () => {
        addNewGame('mobile-games-editor', 'mobileGames');
    });
    document.getElementById('save-mobile-games').addEventListener('click', () => {
        saveGamesFromEditor('mobile-games-editor', 'mobileGames');
    });
}

// ==========================================
// ALL FORMS
// ==========================================

function initForms() {
    // Personal
    document.getElementById('form-personal').addEventListener('submit', (e) => {
        e.preventDefault();
        const d = getData();
        d.name = getVal('edit-name'); d.age = getVal('edit-age');
        d.location = getVal('edit-location'); d.timezone = getVal('edit-timezone');
        d.languages = getVal('edit-languages'); d.education = getVal('edit-education');
        d.playertype = getVal('edit-playertype');
        localStorage.setItem('portfolioData', JSON.stringify(d));
        showSuccess();
    });

    // Hero
    document.getElementById('form-hero').addEventListener('submit', (e) => {
        e.preventDefault();
        const d = getData();
        d.heroTitle = getVal('edit-hero-title'); d.heroSubtitle = getVal('edit-hero-subtitle');
        d.statHours = getVal('edit-stat-hours'); d.statYears = getVal('edit-stat-years');
        d.statRecordings = getVal('edit-stat-recordings'); d.statPlatforms = getVal('edit-stat-platforms');
        localStorage.setItem('portfolioData', JSON.stringify(d));
        showSuccess();
    });

    // About
    document.getElementById('form-about').addEventListener('submit', (e) => {
        e.preventDefault();
        const d = getData();
        d.aboutDescription = getVal('edit-about-description');
        localStorage.setItem('portfolioData', JSON.stringify(d));
        showSuccess();
    });

    // Images
    document.getElementById('form-images').addEventListener('submit', (e) => {
        e.preventDefault();
        const d = getData();
        d.profileImg = getVal('edit-profile-img');
        d.expImg = getVal('edit-exp-img');
        localStorage.setItem('portfolioData', JSON.stringify(d));
        showSuccess();
    });

    // Setup
    document.getElementById('form-setup').addEventListener('submit', (e) => {
        e.preventDefault();
        const d = getData();
        d.cpu = getVal('edit-cpu'); d.ram = getVal('edit-ram');
        d.storage = getVal('edit-storage'); d.gpu = getVal('edit-gpu');
        d.recording = getVal('edit-recording'); d.quality = getVal('edit-quality');
        d.mic = getVal('edit-mic'); d.internet = getVal('edit-internet');
        localStorage.setItem('portfolioData', JSON.stringify(d));
        showSuccess();
    });

    // Contact
    document.getElementById('form-contact').addEventListener('submit', (e) => {
        e.preventDefault();
        const d = getData();
        d.email = getVal('edit-email'); d.discord = getVal('edit-discord');
        d.linkedin = getVal('edit-linkedin'); d.twitter = getVal('edit-twitter');
        d.steam = getVal('edit-steam');
        localStorage.setItem('portfolioData', JSON.stringify(d));
        showSuccess();
    });

    // Credentials
    document.getElementById('form-credentials').addEventListener('submit', (e) => {
        e.preventDefault();
        const currentPass = getVal('current-password');
        const newUser = getVal('new-username');
        const newPass = getVal('new-password');
        const confirmPass = getVal('confirm-password');
        const errorDiv = document.getElementById('cred-error');
        const errorMsg = document.getElementById('cred-error-msg');
        const creds = JSON.parse(localStorage.getItem('adminCredentials'));

        if (currentPass !== creds.password) {
            errorMsg.textContent = 'Current password is incorrect.';
            errorDiv.style.display = 'flex'; return;
        }
        if (newPass && newPass !== confirmPass) {
            errorMsg.textContent = 'New passwords do not match.';
            errorDiv.style.display = 'flex'; return;
        }

        if (newUser) creds.username = newUser;
        if (newPass) creds.password = newPass;
        localStorage.setItem('adminCredentials', JSON.stringify(creds));
        errorDiv.style.display = 'none';
        document.getElementById('form-credentials').reset();
        showSuccess();
    });
}