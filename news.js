// === NEWS CONFIGURATION ===
// showMode: 'once' = nur einmal nach Bestätigung, 'every-start' = bei jedem Start, 'period' = nur im Zeitraum
// validFrom/validUntil: nur für showMode 'period' (ISO-Datumsstring)

export const NEWS_ITEMS = [
    {
        id: 'welcome-v1',
        title: 'Willkommen bei cook_now! 🍽️',
        content: '<h3>Willkommen bei cook_now!</h3><p>Dein Mahlzeiten-Planer.</p><ul><li><strong>📅 Wochen- & Monatsansicht</strong></li><li><strong>🍽️ Mensa-Integration</strong></li><li><strong>☁️ Firebase Sync</strong></li></ul>',
        showOn: 'startup',
        showMode: 'once',
        priority: 'high'
    },
    {
        id: 'mensa-v1',
        title: '🏛️ Mensa-Integration',
        content: '<h3>Mensa-Integration</h3><p>Kirche, Fleet, Bread & Soda – direkt beim Planen auswählen.</p>',
        showOn: 'startup',
        showMode: 'once',
        priority: 'medium'
    }
];

export const NEWS_STORAGE_KEY = 'cook-news-dismissed-v1';

export function getDismissedNews() {
    try { const s = localStorage.getItem(NEWS_STORAGE_KEY); return s ? JSON.parse(s) : {}; } catch(e) { return {}; }
}

export function isNewsDismissed(newsId) {
    return !!getDismissedNews()[newsId];
}

export function dismissNews(newsId) {
    const d = getDismissedNews();
    d[newsId] = Date.now();
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(d));
}

export function getNewsToShow(trigger = 'startup') {
    const now = new Date();
    return NEWS_ITEMS.filter(n => {
        if (n.showOn !== trigger) return false;
        if (n.showMode === 'once' && isNewsDismissed(n.id)) return false;
        if (n.showMode === 'period') {
            if (n.validFrom && now < new Date(n.validFrom)) return false;
            if (n.validUntil && now > new Date(n.validUntil)) return false;
            if (isNewsDismissed(n.id)) return false;
        }
        if (n.showMode === 'every-start') return true;
        return true;
    }).sort((a, b) => ({ high: 0, medium: 1, low: 2 })[a.priority] - ({ high: 0, medium: 1, low: 2 })[b.priority]);
}

export function createNewsPopup(news, onDismiss, onConfirm) {
    const ov = document.createElement('div');
    ov.className = 'news-overlay';
    let actionsHtml = '<button class="news-btn news-btn-dismiss">Erledigt</button>';
    if (news.showMode === 'once' || news.showMode === 'period') {
        actionsHtml += '<button class="news-btn news-btn-confirm">Erledigt bestätigen</button>';
    }
    ov.innerHTML = '<div class="news-popup"><div class="news-header"><h3>' + news.title + '</h3><button class="news-close">&times;</button></div><div class="news-content">' + news.content + '</div><div class="news-actions">' + actionsHtml + '</div></div>';
    const close = () => { ov.classList.add('hiding'); setTimeout(() => ov.remove(), 300); };
    ov.querySelector('.news-close').onclick = close;
    ov.onclick = (e) => { if (e.target === ov) close(); };
    ov.querySelector('.news-btn-dismiss').onclick = () => { onDismiss(news); close(); };
    const confirmBtn = ov.querySelector('.news-btn-confirm');
    if (confirmBtn) confirmBtn.onclick = () => { onConfirm(news); close(); };
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
}

export function showNewsPopups(trigger = 'startup') {
    const list = getNewsToShow(trigger);
    if (!list.length) return;
    let i = 0;
    function next() {
        if (i >= list.length) return;
        const n = list[i];
        createNewsPopup(n,
            () => { i++; next(); },
            () => { dismissNews(n.id); i++; next(); }
        );
    }
    next();
}
