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
    },
    {
        id: 'pwa-v1',
        title: '📱 Als App installieren',
        content: '<h3>Als App installieren</h3><p>iOS: Teilen → "Zum Home-Bildschirm"<br>Android: Menü → "App installieren"</p>',
        showOn: 'startup',
        showMode: 'once',
        priority: 'low'
    },
    {
        id: 'calendar-v1',
        title: '📅 Kalender-Ansichten',
        content: '<h3>Drei Ansichten</h3><p><strong>Woche</strong> – 7 Tage<br><strong>Monat</strong> – Klassisch<br><strong>Liste</strong> – Alle Mahlzeiten</p>',
        showOn: 'startup',
        showMode: 'once',
        priority: 'medium'
    },
    {
        id: 'auth-v1',
        title: '🔐 Firebase Authentication',
        content: '<h3>Authentication aktiv</h3><p>Jede Änderung wird protokolliert: Wer hat was wann geändert?</p>',
        showOn: 'startup',
        showMode: 'once',
        priority: 'high'
    },
    {
        id: 'weekly-reminder-v1',
        title: '📅 Wöchentliche Erinnerung',
        content: '<h3>Planungs-Erinnerung</h3><p>Jeden Sonntag erinnern wir dich an die Wochenplanung.</p>',
        showOn: 'startup',
        showMode: 'every-start',
        dayOfWeek: 0,
        priority: 'medium'
    },
    {
        id: 'summer-special-v1',
        title: '☀️ Sommer-Special',
        content: '<h3>Sommeraktion</h3><p>Probiere diese Woche neue Sommergerichte!</p>',
        showOn: 'startup',
        showMode: 'period',
        validFrom: '2025-06-01',
        validUntil: '2025-08-31',
        priority: 'low'
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
