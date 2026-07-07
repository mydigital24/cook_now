// === NEWS CONFIGURATION ===
// showMode: 'once' = nur einmal nach Bestätigung, 'every-start' = bei jedem Start, 'period' = nur im Zeitraum
// validFrom/validUntil: nur für showMode 'period' (ISO-Datumsstring)

const NEWS_ITEMS = [
    {
        "id": "welcome-v1",
        "title": "Willkommen bei cook_now! 🍽️",
        "content": "<h3>Willkommen bei cook_now!</h3><p>Dein Mahlzeiten-Planer.</p><ul><li><strong>📅 Wochen- & Monatsansicht</strong></li><li><strong>🍽️ Mensa-Integration</strong></li><li><strong>🍱 Glücklich kochen </strong></li></ul> <br> <h3>:-)      <br>Viel Spaß</h3>",
        "showOn": "startup",
        "showMode": "once",
        "priority": "high"
    },
    {
        "id": "new-item-1783371193069",
        "title": "Updates zu Mensaverwaltung",
        "content": "<h3>Moin </h3><p>Es gibt mal wieder ein Update. Da die BrückeSH ihre Link Struktur verändert und diese Änderung wieder rückgängig gemacht hat kann es zu Problemen bei Speiseplänen kommen. </p>   <h5> Und sonst ? </h5>  <p>Wir haben die Ansicht Anstehend bearbeitet Ein Account System hinzugefügt und viele Schäfchen gezählt <strong> Viel Spaß  : -)",
        "showOn": "startup",
        "showMode": "period",
        "priority": "medium",
        "validFrom": "2026-07-06",
        "validUntil": "2026-07-11"
    }
];

const NEWS_STORAGE_KEY = 'cook-news-dismissed-v1';

function getDismissedNews() {
    try {
        const s = localStorage.getItem(NEWS_STORAGE_KEY);
        return s ? JSON.parse(s) : {};
    } catch (e) {
        return {};
    }
}

function isNewsDismissed(newsId) {
    return !!getDismissedNews()[newsId];
}

function dismissNews(newsId) {
    const d = getDismissedNews();
    d[newsId] = true;
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(d));
}

function clearNewsDismissed() {
    localStorage.removeItem(NEWS_STORAGE_KEY);
}

function getNewsToShow(trigger) {
    trigger = trigger || 'startup';
    const now = new Date();

    NEWS_ITEMS.forEach(n => {
        if (n.showMode === 'period' && n.validUntil && now > new Date(n.validUntil)) {
            dismissNews(n.id);
        }
    });

    return NEWS_ITEMS.filter(n => {
        if (n.showOn !== trigger) return false;

        if (n.showMode === 'once' && isNewsDismissed(n.id)) return false;

        if (n.showMode === 'period') {
            if (isNewsDismissed(n.id)) return false;
            if (n.validFrom && now < new Date(n.validFrom)) return false;
            if (n.validUntil && now > new Date(n.validUntil)) return false;
        }

        return true;
    }).sort((a, b) => ({ high: 0, medium: 1, low: 2 })[a.priority] - ({ high: 0, medium: 1, low: 2 })[b.priority]);
}

function createNewsPopup(news, onOk) {
    const ov = document.createElement('div');
    ov.className = 'news-overlay';

    ov.innerHTML =
        '<div class="news-popup">' +
            '<div class="news-title">' + news.title + '</div>' +
            '<div class="news-content">' + news.content + '</div>' +
            '<div class="news-actions"><button class="news-btn news-btn-ok">OK</button></div>' +
        '</div>';

    const close = () => {
        ov.classList.add('hiding');
        setTimeout(() => ov.remove(), 200);
    };

    ov.querySelector('.news-btn-ok').onclick = () => {
        onOk(news);
        close();
    };

    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
}

function showNewsPopups(trigger) {
    trigger = trigger || 'startup';
    const list = getNewsToShow(trigger);
    if (!list.length) return;
    let i = 0;
    function next() {
        if (i >= list.length) return;
        const n = list[i];
        createNewsPopup(n, () => {
            if (n.showMode === 'once') {
                dismissNews(n.id);
            }
            i++;
            next();
        });
    }
    next();
}

window.__news = {
    showNewsPopups: showNewsPopups,
    getNewsToShow: getNewsToShow,
    createNewsPopup: createNewsPopup,
    dismissNews: dismissNews,
    isNewsDismissed: isNewsDismissed,
    getDismissedNews: getDismissedNews,
    clearNewsDismissed: clearNewsDismissed,
    NEWS_ITEMS: NEWS_ITEMS,
    NEWS_STORAGE_KEY: NEWS_STORAGE_KEY
};
