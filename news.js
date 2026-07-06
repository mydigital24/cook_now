/**
 * cook_now - News System
 * Zentrales News-Management mit HTML-Unterstützung, Bestätigungsdialog und lokaler Speicherung
 */

// ============================================
// NEWS DATEN - Zentral definiert
// ============================================
const newsData = [
  {
    id: "welcome_2026",
    title: "Willkommen bei <strong>cook_now v2.0</strong>!",
    content: `
      <p>Hallo und herzlich willkommen bei der <strong>neuen Version</strong> von cook_now!</p>
      <p>Diese Version bringt viele Verbesserungen:</p>
      <ul>
        <li><strong>Firebase Authentication</strong> - Verfolge wer Mahlzeiten hinzufügt</li>
        <li><strong>Verbesserte Kalenderansichten</strong> - Woche/Monat mit konsistentem Verhalten</li>
        <li><strong>News-System</strong> - Wichtige Updates werden dir angezeigt</li>
        <li><strong>PWA-Optimierungen</strong> - Bessere Offline-Unterstützung</li>
      </ul>
      <p style="margin-top: 12px; color: var(--primary); font-weight: 600;">
        🎉 Viel Spaß beim Planen deiner Mahlzeiten!
      </p>
    `,
    date: "15.04.2026",
    category: "announcement",
    priority: 10,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
    showUntil: null // Null = immer anzeigen bis erledigt
  },
  {
    id: "firebase_auth",
    title: "🔐 Firebase Authentication aktiviert",
    content: `
      <p>Ab sofort wird <strong>protokolliert</strong>, wer Mahlzeiten hinzufügt oder bearbeitet.</p>
      <p>Das ermöglicht:</p>
      <ul>
        <li>📊 <strong>Audit-Logs</strong> für alle Änderungen</li>
        <li>👤 <strong>Benutzerzuordnung</strong> von Mahlzeitseinträgen</li>
        <li>🔍 <strong>Nachverfolgbarkeit</strong> wer wann was geplant hat</li>
      </ul>
      <p style="margin-top: 12px; font-size: 13px; color: var(--gray);">
        <em>Hinweis: Die Authentifizierung ist optional. Du kannst die App auch ohne Login nutzen.</em>
      </p>
    `,
    date: "15.04.2026",
    category: "feature",
    priority: 9,
    image: null,
    showUntil: null
  },
  {
    id: "calendar_improvements",
    title: "📅 Kalender verbessert",
    content: `
      <p>Die <strong>Wochen- und Monatsansicht</strong> wurde komplett überarbeitet:</p>
      <ul>
        <li>✅ Kein automatischer Wechsel zwischen Ansichten mehr</li>
        <li>✅ Konsistentes Klickverhalten auf Tage</li>
        <li>✅ Verbesserte Navigation und State-Handling</li>
        <li>✅ Bessere Darstellung auf kleinen Bildschirmen</li>
      </ul>
      <div style="background: var(--primary-dim); padding: 12px; border-radius: 10px; margin-top: 12px;">
        <p style="margin: 0; font-size: 13px;">
          <strong>Tipp:</strong> Nutze die neuen View-Buttons um zwischen Woche, Monat und Liste zu wechseln!
        </p>
      </div>
    `,
    date: "15.04.2026",
    category: "improvement",
    priority: 8,
    image: null,
    showUntil: null
  },
  {
    id: "news_system",
    title: "📰 News-System eingeführt",
    content: `
      <p>Ab jetzt wirst du über <strong>wichtige Updates</strong> informiert:</p>
      <ul>
        <li>🎯 News werden als Pop-up angezeigt</li>
        <li>✅ Erst nach <strong>zweifacher Bestätigung</strong> ("Erledigt" + "Bestätigen") verschwinden sie</li>
        <li>💾 Erledigte News werden <strong>lokal gespeichert</strong> und nicht erneut angezeigt</li>
        <li>🎨 Unterstützung für <strong>HTML-Inhalte</strong> (Fett, Listen, Bilder, etc.)</li>
      </ul>
      <p style="margin-top: 12px; font-size: 13px; color: var(--gray);">
        <em>Diese News ist ein Beispiel für das neue System!</em>
      </p>
    `,
    date: "15.04.2026",
    category: "feature",
    priority: 7,
    image: null,
    showUntil: null
  },
  {
    id: "registration_feature",
    title: "📧 Registrierung per E-Mail",
    content: `
      <p>Du kannst dich jetzt <strong>per E-Mail registrieren</strong>:</p>
      <ul>
        <li>📝 Klicke auf den neuen "Registrieren"-Button</li>
        <li>✉️ Es öffnet sich ein vorbefüllter E-Mail-Entwurf</li>
        <li>🔐 Deine Zugangsdaten werden automatisch eingefügt</li>
        <li>📤 Sende die Mail an <strong>marten@ik.me</strong></li>
      </ul>
      <div style="background: #e8f5e9; padding: 12px; border-radius: 10px; margin-top: 12px; border-left: 4px solid #4caf50;">
        <p style="margin: 0; font-size: 13px; color: #2e7d32;">
          <strong>💡 Tipp:</strong> Die Registrierung ist optional. Du kannst alle Funktionen auch ohne Anmeldung nutzen.
        </p>
      </div>
    `,
    date: "15.04.2026",
    category: "feature",
    priority: 6,
    image: null,
    showUntil: null
  },
  {
    id: "pwa_icons",
    title: "🎨 Konsistente Icons überall",
    content: `
      <p>Das <strong>🍝 cook_now Icon</strong> ist jetzt überall gleich:</p>
      <ul>
        <li>🌐 Favicon im Browser</li>
        <li>📱 Apple Touch Icon für iOS</li>
        <li>📦 PWA Manifest Icons</li>
        <li>🏷️ Tab-Badge</li>
      </ul>
      <p style="margin-top: 12px;">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%239933CC'/%3E%3Ctext x='32' y='44' font-size='36' text-anchor='middle' fill='white'%3E🍝%3C/text%3E%3C/svg%3E" 
             alt="cook_now Icon" 
             style="width: 48px; height: 48px; border-radius: 10px;" />
      </p>
    `,
    date: "15.04.2026",
    category: "improvement",
    priority: 5,
    image: null,
    showUntil: null
  }
];

// ============================================
// NEWS STATE MANAGEMENT
// ============================================

/**
 * Lädt den News-State aus localStorage
 * @returns {Object} Map von News-ID zu Status
 */
function loadNewsState() {
  try {
    const saved = localStorage.getItem('cook-now-news-state');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error('Fehler beim Laden des News-State:', e);
    return {};
  }
}

/**
 * Speichert den News-State in localStorage
 * @param {Object} state - News-State
 */
function saveNewsState(state) {
  try {
    localStorage.setItem('cook-now-news-state', JSON.stringify(state));
  } catch (e) {
    console.error('Fehler beim Speichern des News-State:', e);
  }
}

/**
 * Markiert eine News als "gelesen"
 * @param {string} newsId - News-ID
 */
function markNewsAsRead(newsId) {
  const state = loadNewsState();
  state[newsId] = { read: true, dismissed: false };
  saveNewsState(state);
}

/**
 * Markiert eine News als "erledigt" (nach erster Bestätigung)
 * @param {string} newsId - News-ID
 */
function markNewsAsDone(newsId) {
  const state = loadNewsState();
  state[newsId] = { read: true, dismissed: true, confirmed: false };
  saveNewsState(state);
}

/**
 * Markiert eine News als "endgültig erledigt" (nach zweiter Bestätigung)
 * @param {string} newsId - News-ID
 */
function markNewsAsConfirmed(newsId) {
  const state = loadNewsState();
  state[newsId] = { read: true, dismissed: true, confirmed: true };
  saveNewsState(state);
}

/**
 * Prüft ob eine News bereits endgültig erledigt wurde
 * @param {string} newsId - News-ID
 * @returns {boolean}
 */
function isNewsConfirmed(newsId) {
  const state = loadNewsState();
  return state[newsId]?.confirmed === true;
}

/**
 * Prüft ob eine News bereits als erledigt markiert wurde (erste Bestätigung)
 * @param {string} newsId - News-ID
 * @returns {boolean}
 */
function isNewsDismissed(newsId) {
  const state = loadNewsState();
  return state[newsId]?.dismissed === true;
}

/**
 * Setzt alle News zurück (für Debugging)
 */
function resetAllNews() {
  localStorage.removeItem('cook-now-news-state');
}

// ============================================
// NEWS FILTER & SORTIERUNG
// ============================================

/**
 * Filtert News die noch angezeigt werden sollen
 * @returns {Array} Gefilterte und sortierte News
 */
function getActiveNews() {
  const now = new Date();
  
  return newsData
    .filter(news => {
      // Überspringen wenn bereits endgültig bestätigt
      if (isNewsConfirmed(news.id)) {
        return false;
      }
      
      // Prüfen ob showUntil gesetzt ist und abgelaufen
      if (news.showUntil) {
        const untilDate = new Date(news.showUntil);
        if (now > untilDate) {
          return false;
        }
      }
      
      return true;
    })
    .sort((a, b) => {
      // Nach Priorität sortieren (höhere Priorität zuerst)
      const priorityDiff = (b.priority || 0) - (a.priority || 0);
      if (priorityDiff !== 0) return priorityDiff;
      
      // Dann nach Datum (neuere zuerst)
      const dateA = new Date(a.date || '01.01.1970');
      const dateB = new Date(b.date || '01.01.1970');
      return dateB - dateA;
    });
}

// ============================================
// NEWS UI FUNKTIONEN
// ============================================

/**
 * Erstellt das HTML für eine einzelne News
 * @param {Object} news - News-Objekt
 * @returns {string} HTML-String
 */
function createNewsHTML(news) {
  const isDismissed = isNewsDismissed(news.id);
  
  // Container
  const containerStyle = `
    background: var(--card);
    border: 1px solid var(--glass-tint);
    border-radius: 16px;
    padding: 0;
    margin-bottom: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    overflow: hidden;
    animation: newsSlideIn 0.3s ease-out;
  `;
  
  // Header mit Titel und Datum
  const headerStyle = `
    padding: 14px 16px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary) 100%);
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  
  // Category Badge
  const categoryColors = {
    announcement: '#ff9800',
    feature: '#4caf50',
    improvement: '#2196f3',
    update: '#9c27b0',
    important: '#f44336'
  };
  const categoryColor = categoryColors[news.category] || '#9e9e9e';
  
  // Content Bereich
  const contentStyle = `
    padding: 14px 16px;
    background: var(--card);
    color: var(--text);
    font-size: 14px;
    line-height: 1.5;
  `;
  
  // Footer mit Aktionen
  const footerStyle = `
    padding: 12px 16px;
    background: var(--nav-bg);
    display: flex;
    gap: 8px;
    border-top: 1px solid var(--glass-tint);
  `;
  
  // Button Stile
  const doneBtnStyle = `
    flex: 1;
    padding: 10px 14px;
    border: 2px solid var(--primary);
    background: transparent;
    color: var(--primary);
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  `;
  
  const confirmBtnStyle = `
    flex: 1;
    padding: 10px 14px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  `;
  
  // HTML zusammenbauen
  let html = `<div class="news-item" data-news-id="${news.id}" style="${containerStyle}">`;
  
  // Header
  html += `
    <div style="${headerStyle}">
      <span style="font-size: 20px;">📰</span>
      <div style="flex: 1;">
        <div style="font-size: 15px; font-weight: 700; line-height: 1.3;">${news.title}</div>
        <div style="font-size: 11px; opacity: 0.9; margin-top: 2px;">${news.date}</div>
      </div>
      <span style="background: ${categoryColor}; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; text-transform: uppercase;">
        ${news.category}
      </span>
    </div>
  `;
  
  // Image (falls vorhanden)
  if (news.image) {
    html += `
      <img src="${news.image}" 
           alt="${news.title}" 
           style="width: 100%; height: 120px; object-fit: cover; display: block;" 
           onerror="this.style.display='none'" />
    `;
  }
  
  // Content
  html += `<div style="${contentStyle}">${news.content}</div>`;
  
  // Footer
  html += `<div style="${footerStyle}">`;
  
  if (isDismissed) {
    // Zweite Bestätigung nötig
    html += `
      <button onclick="confirmNewsDone('${news.id}')" 
              style="${confirmBtnStyle}" 
              onmouseover="this.style.background='var(--primary)'" 
              onmouseout="this.style.background='var(--primary)'">
        ✅ Erledigt bestätigen
      </button>
      <button onclick="cancelNewsDismiss('${news.id}')" 
              style="${doneBtnStyle}; border-color: var(--gray); color: var(--gray);">
        ❌ Abbrechen
      </button>
    `;
  } else {
    // Erste Bestätigung
    html += `
      <button onclick="markNewsDone('${news.id}')" 
              style="${doneBtnStyle}">
        ✓ Erledigt
      </button>
      <button onclick="markNewsRead('${news.id}')" 
              style="${doneBtnStyle}; border-color: var(--gray); color: var(--gray);">
        Später
      </button>
    `;
  }
  
  html += `</div></div>`;
  
  return html;
}

/**
 * Zeigt alle aktiven News als Pop-up an
 */
function showNewsPopup() {
  const activeNews = getActiveNews();
  
  if (activeNews.length === 0) {
    return; // Keine News zum Anzeigen
  }
  
  // Container erstellen
  let container = document.getElementById('news-popup-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'news-popup-container';
    container.style = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(90%, 400px);
      max-height: 80vh;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 20px;
      padding: 16px;
      z-index: 2000;
      display: flex;
      flex-direction: column;
      gap: 12px;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
    `;
    
    // Close Button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: var(--card);
      border: 1px solid var(--glass-tint);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 18px;
      cursor: pointer;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    closeBtn.onclick = () => {
      container.style.display = 'none';
    };
    
    container.appendChild(closeBtn);
    document.body.appendChild(container);
    
    // Animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes newsSlideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // News-Inhalte einfügen
  container.innerHTML = '';
  
  // Close Button neu hinzufügen
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style = `
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--card);
    border: 1px solid var(--glass-tint);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 18px;
    cursor: pointer;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  `;
  closeBtn.onclick = () => {
    container.style.display = 'none';
  };
  container.appendChild(closeBtn);
  
  // Jede News als HTML einfügen
  activeNews.forEach(news => {
    const newsHTML = createNewsHTML(news);
    container.innerHTML += newsHTML;
  });
  
  // Container anzeigen
  container.style.display = 'flex';
  
  // Automatisch nach 10 Sekunden schließen (optional)
  // setTimeout(() => {
  //   if (container.style.display !== 'none') {
  //     container.style.display = 'none';
  //   }
  // }, 10000);
}

/**
 * Prüft ob News angezeigt werden sollen und zeigt sie an
 */
function checkAndShowNews() {
  const activeNews = getActiveNews();
  
  // Nur anzeigen wenn es aktive News gibt
  if (activeNews.length > 0) {
    // Leichte Verzögerung um UI-Loading zu vermeiden
    setTimeout(() => {
      showNewsPopup();
    }, 1000);
  }
}

// ============================================
// GLOBAL FUNKTIONEN (für onclick Handler)
// ============================================

/**
 * Markiert News als gelesen (für "Später" Button)
 * @param {string} newsId
 */
window.markNewsRead = function(newsId) {
  markNewsAsRead(newsId);
  const container = document.getElementById('news-popup-container');
  if (container) {
    container.style.display = 'none';
  }
};

/**
 * Markiert News als erledigt (erste Bestätigung)
 * @param {string} newsId
 */
window.markNewsDone = function(newsId) {
  markNewsAsDone(newsId);
  // Container neu laden um Button zu ändern
  const container = document.getElementById('news-popup-container');
  if (container) {
    container.innerHTML = '';
    checkAndShowNews();
  }
};

/**
 * Bestätigt News als endgültig erledigt (zweite Bestätigung)
 * @param {string} newsId
 */
window.confirmNewsDone = function(newsId) {
  markNewsAsConfirmed(newsId);
  const container = document.getElementById('news-popup-container');
  if (container) {
    container.style.display = 'none';
  }
};

/**
 * Bricht die Erledigt-Bestätigung ab
 * @param {string} newsId
 */
window.cancelNewsDismiss = function(newsId) {
  const state = loadNewsState();
  // Zurücksetzen auf nur gelesen
  state[newsId] = { read: true, dismissed: false, confirmed: false };
  saveNewsState(state);
  
  const container = document.getElementById('news-popup-container');
  if (container) {
    container.innerHTML = '';
    checkAndShowNews();
  }
};

// ============================================
// EXPORT FÜR MODULE
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    newsData,
    getActiveNews,
    loadNewsState,
    saveNewsState,
    markNewsAsRead,
    markNewsAsDone,
    markNewsAsConfirmed,
    isNewsConfirmed,
    isNewsDismissed,
    resetAllNews,
    createNewsHTML,
    showNewsPopup,
    checkAndShowNews
  };
}

// ============================================
// AUTO-INITIALISIERUNG
// ============================================

// News beim Laden der Seite prüfen
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndShowNews);
} else {
  checkAndShowNews();
}
