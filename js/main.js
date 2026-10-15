// ================================================
// MAIN PORTFOLIO JAVASCRIPT
// ================================================

// Default game data (used if nothing saved in localStorage)
const DEFAULT_PC_GAMES = [
    {
        id: 'gta5',
        name: 'GTA 5 / GTA Online',
        genre: 'Open World / Action / Roleplay',
        details: '6,350+ hours including extensive roleplay experience',
        hours: '6,350+ hrs',
        rank: '',
        expertise: 99,
        expertiseLabel: 'Expert',
        bannerImg: 'https://i.ibb.co.com/4w7RRp4g',
        tags: ['Roleplay', 'Online', 'Story Mode'],
        featured: true
    },
    {
        id: 'ac',
        name: "Assassin's Creed Series",
        genre: 'Action / Adventure / Open World',
        details: 'Played Mirage, Odyssey, Origins',
        hours: '',
        rank: '',
        expertise: 85,
        expertiseLabel: 'Advanced',
        bannerImg: 'https://i.ibb.co.com/CsXCM7x8',
        tags: ['Mirage', 'Odyssey', 'Origins'],
        featured: false
    },
    {
        id: 'valorant',
        name: 'Valorant',
        genre: 'Tactical FPS / Competitive',
        details: 'Reached Gold 2 rank in competitive mode',
        hours: '',
        rank: 'Gold 2',
        expertise: 80,
        expertiseLabel: 'Advanced',
        bannerImg: 'https://i.ibb.co.com/21Fx6Gqn',
        tags: ['Competitive', 'FPS', 'Ranked'],
        featured: false
    },
    {
        id: 'cod',
        name: 'Call of Duty',
        genre: 'FPS / Action',
        details: 'Played all parts up to Modern Warfare 3',
        hours: '',
        rank: '',
        expertise: 82,
        expertiseLabel: 'Advanced',
        bannerImg: 'https://i.ibb.co.com/mxjtpWX',
        tags: ['All Parts', 'MW3', 'Multiplayer'],
        featured: false
    },
    {
        id: 'lol',
        name: 'League of Legends',
        genre: 'MOBA / Strategy',
        details: '1,540 hours of gameplay experience',
        hours: '1,540 hrs',
        rank: '',
        expertise: 78,
        expertiseLabel: 'Experienced',
        bannerImg: 'https://i.ibb.co.com/ZzT888tW',
        tags: ['MOBA', 'Strategy', 'Competitive'],
        featured: false
    },
    {
        id: 'cs2',
        name: 'Counter-Strike 2',
        genre: 'Tactical FPS / Competitive',
        details: 'Active competitive player',
        hours: '',
        rank: '',
        expertise: 76,
        expertiseLabel: 'Experienced',
        bannerImg: 'https://i.ibb.co.com/WpR5pG8G',
        tags: ['Tactical', 'FPS', 'Competitive'],
        featured: false
    },
    {
        id: 'forza',
        name: 'Forza Horizon',
        genre: 'Racing / Open World',
        details: 'Open world racing enthusiast',
        hours: '',
        rank: '',
        expertise: 72,
        expertiseLabel: 'Experienced',
        bannerImg: 'https://i.ibb.co.com/fGSJDbjH',
        tags: ['Racing', 'Open World', 'Cars'],
        featured: false
    }
];

const DEFAULT_MOBILE_GAMES = [
    {
        id: 'efootball',
        name: 'eFootball',
        genre: 'Sports / Football Simulation',
        details: 'Advanced football simulation player',
        hours: '',
        rank: '',
        expertise: 85,
        expertiseLabel: 'Advanced',
        bannerImg: '',
        tags: ['Sports', 'Football'],
        featured: false
    },
    {
        id: 'pubg',
        name: 'PUBG Mobile',
        genre: 'Battle Royale / Shooter',
        details: 'Battle royale expert',
        hours: '',
        rank: '',
        expertise: 80,
        expertiseLabel: 'Advanced',
        bannerImg: '',
        tags: ['Battle Royale', 'Shooter'],
        featured: false
    },
    {
        id: 'coc',
        name: 'Clash of Clans',
        genre: 'Strategy / Base Building',
        details: 'Long-term strategy player',
        hours: '',
        rank: '',
        expertise: 82,
        expertiseLabel: 'Advanced',
        bannerImg: '',
        tags: ['Strategy', 'Base Building'],
        featured: false
    },
    {
        id: 'cr',
        name: 'Clash Royale',
        genre: 'Strategy / Card Battle',
        details: 'Competitive card battle player',
        hours: '',
        rank: '',
        expertise: 78,
        expertiseLabel: 'Experienced',
        bannerImg: '',
        tags: ['Strategy', 'Cards'],
        featured: false
    },
    {
        id: 'ff',
        name: 'Free Fire',
        genre: 'Battle Royale / Shooter',
        details: 'Mobile battle royale experience',
        hours: '',
        rank: '',
        expertise: 75,
        expertiseLabel: 'Experienced',
        bannerImg: '',
        tags: ['Battle Royale', 'Mobile'],
        featured: false
    }
];

// Game emoji map for fallback
const GAME_EMOJIS = {
    'gta': '🚗', 'assassin': '🗡️', 'valorant': '🎯', 'call': '🔫',
    'league': '⚔️', 'counter': '💣', 'forza': '🏎️', 'efootball': '⚽',
    'pubg': '🪖', 'clash of clans': '🏰', 'clash royale': '👑',
    'free fire': '🔥', 'default': '🎮'
};

function getGameEmoji(name) {
    const lower = name.toLowerCase();
    for (const [key, emoji] of Object.entries(GAME_EMOJIS)) {
        if (lower.includes(key)) return emoji;
    }
    return GAME_EMOJIS.default;
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultData();
    loadPortfolioData();
    renderGames();
    initNavbar();
    initMobileMenu();
    initPlatformTabs();
    initContactForm();
    initGallery();
    initScrollAnimations();
    initParticles();
});

function initializeDefaultData() {
    if (!localStorage.getItem('pcGames')) {
        localStorage.setItem('pcGames', JSON.stringify(DEFAULT_PC_GAMES));
    }
    if (!localStorage.getItem('mobileGames')) {
        localStorage.setItem('mobileGames', JSON.stringify(DEFAULT_MOBILE_GAMES));
    }
}

// ==========================================
// LOAD PORTFOLIO DATA FROM LOCALSTORAGE
// ==========================================

function loadPortfolioData() {
    const data = localStorage.getItem('portfolioData');
    if (!data) return;
    const p = JSON.parse(data);

    setText('hero-name', p.name);
    setText('nav-name', p.name ? p.name.split(' ').pop().toUpperCase() : 'ASHRAF');
    setText('info-location', p.location);
    setText('info-timezone', p.timezone);
    setText('info-languages', p.languages);
    setText('info-education', p.education);
    setText('info-playertype', p.playertype);
    setText('info-age', p.age);
    setText('hero-title', p.heroTitle);
    setText('hero-subtitle', p.heroSubtitle);
    setText('stat-hours', p.statHours);
    setText('stat-years', p.statYears);
    setText('stat-recordings', p.statRecordings);
    setText('stat-platforms', p.statPlatforms);
    setHTML('about-description', p.aboutDescription);
    setText('setup-cpu', p.cpu);
    setText('setup-ram', p.ram);
    setText('setup-storage', p.storage);
    setText('setup-gpu', p.gpu);
    setText('setup-recording', p.recording);
    setText('setup-quality', p.quality);
    setText('setup-mic', p.mic);
    setText('setup-internet', p.internet);
    setText('contact-email', p.email);

    // Profile Image
    if (p.profileImg) {
        const img = document.getElementById('profile-image');
        if (img) img.src = p.profileImg;
    }

    // Experience Image
    if (p.expImg) {
        const img = document.getElementById('gallery-exp-img');
        if (img) img.src = p.expImg;
    }

    // Social Links
    setAttr('link-discord', 'href', p.discord);
    setAttr('link-linkedin', 'href', p.linkedin);
    setAttr('link-twitter', 'href', p.twitter);
    setAttr('link-steam', 'href', p.steam);
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
}

function setHTML(id, val) {
    const el = document.getElementById(id);
    if (el && val) el.innerHTML = val;
}

function setAttr(id, attr, val) {
    const el = document.getElementById(id);
    if (el && val) el.setAttribute(attr, val);
}

// ==========================================
// RENDER GAMES DYNAMICALLY
// ==========================================

function renderGames() {
    const pcGames = JSON.parse(localStorage.getItem('pcGames') || '[]');
    const mobileGames = JSON.parse(localStorage.getItem('mobileGames') || '[]');

    renderGameGrid('pc-games', pcGames);
    renderGameGrid('mobile-games', mobileGames);
}

function renderGameGrid(containerId, games) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = `game-card${game.featured ? ' featured' : ''}`;

        const hasBannerImg = game.bannerImg && game.bannerImg.trim() !== '';
        const emoji = getGameEmoji(game.name);

        let bannerHTML;
        if (hasBannerImg) {
            bannerHTML = `
                <div class="game-banner">
                    <img src="${game.bannerImg}" alt="${game.name}" 
                         onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#1a1a2e,#16213e);font-size:3rem;\\'>${emoji}</div>'">
                    <div class="game-banner-gradient"></div>
                    ${game.hours ? `<div class="game-hours">${game.hours}</div>` : ''}
                    ${game.rank ? `<div class="game-rank">${game.rank}</div>` : ''}
                </div>`;
        } else {
            bannerHTML = `
                <div class="game-banner" style="background: linear-gradient(135deg, #1a1a2e, #16213e); display:flex; align-items:center; justify-content:center;">
                    <div style="font-size:3rem;">${emoji}</div>
                    ${game.hours ? `<div class="game-hours">${game.hours}</div>` : ''}
                    ${game.rank ? `<div class="game-rank">${game.rank}</div>` : ''}
                </div>`;
        }

        const tagsHTML = (game.tags || []).map(t => `<span>${t}</span>`).join('');

        card.innerHTML = `
            ${bannerHTML}
            <div class="game-info">
                <h3>${game.name}</h3>
                <p class="game-genre">${game.genre}</p>
                ${game.details ? `<p class="game-details-text">${game.details}</p>` : ''}
                <div class="game-expertise">
                    <div class="expertise-bar">
                        <div class="expertise-fill" style="width: ${game.expertise}%;"></div>
                    </div>
                    <span>${game.expertiseLabel}</span>
                </div>
                ${tagsHTML ? `<div class="game-tags">${tagsHTML}</div>` : ''}
            </div>`;

        container.appendChild(card);
    });
}

// ==========================================
// NAVBAR
// ==========================================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            document.getElementById('nav-links').classList.remove('active');
            document.getElementById('hamburger').classList.remove('active');
        });
    });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

// ==========================================
// PLATFORM TABS
// ==========================================

function initPlatformTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const pcGames = document.getElementById('pc-games');
    const mobileGames = document.getElementById('mobile-games');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const platform = tab.dataset.platform;
            pcGames.classList.toggle('hidden', platform !== 'pc');
            mobileGames.classList.toggle('hidden', platform !== 'mobile');
        });
    });
}

// ==========================================
// CONTACT FORM
// ==========================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            data.timestamp = new Date().toISOString();
            messages.push(data);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            alert('✅ Message sent successfully! Thank you for reaching out.');
            form.reset();
        });
    }
}

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    if (!lightbox) return;

    document.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.gallery-image-wrapper');
        if (wrapper) {
            const img = wrapper.querySelector('.gallery-img');
            const caption = wrapper.closest('.gallery-card').querySelector('.gallery-caption h4');
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Also allow clicking game banners to view full size
    document.addEventListener('click', (e) => {
        const bannerImg = e.target.closest('.game-banner img');
        if (bannerImg) {
            const card = bannerImg.closest('.game-card');
            const name = card.querySelector('.game-info h3');
            lightboxImg.src = bannerImg.src;
            lightboxCaption.textContent = name ? name.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll(
        '.game-card, .setup-card, .capability-item, .org-card, .hire-card, .timeline-item, .info-card, .stat-item, .gallery-card'
    );
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${Math.min(i * 0.05, 0.5)}s`;
        observer.observe(el);
    });
}

const animStyle = document.createElement('style');
animStyle.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(animStyle);

// ==========================================
// PARTICLES
// ==========================================

function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.style.cssText = `position:absolute;width:${Math.random() * 3 + 1}px;height:${Math.random() * 3 + 1}px;background:rgba(0,212,255,${Math.random() * 0.3 + 0.1});border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:particleFloat ${Math.random() * 10 + 10}s linear infinite;animation-delay:${Math.random() * 5}s;`;
        container.appendChild(p);
    }
    const s = document.createElement('style');
    s.textContent = `@keyframes particleFloat{0%{transform:translate(0,0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200}px,-${Math.random() * 500 + 200}px);opacity:0}}`;
    document.head.appendChild(s);
}

// ==========================================
// COUNTER ANIMATION
// ==========================================

const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const text = counter.textContent;
            const num = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[\d]/g, '');
            if (isNaN(num)) return;
            let current = 0;
            const increment = num / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= num) { counter.textContent = text; clearInterval(timer); }
                else { counter.textContent = Math.floor(current) + suffix; }
            }, 16);
        });
        heroObserver.disconnect();
    }
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);