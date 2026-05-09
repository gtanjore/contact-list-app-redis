// ===== COPY UTILITIES =====

function showToast(msg) {
  const toast = document.getElementById('copyToast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
}

function copyText(text, msg = 'Copied!') {
  navigator.clipboard.writeText(text).then(() => showToast(msg));
}

// Collect CSS rules from loaded stylesheets matching a filter fn
function collectCSS(filterFn) {
  let css = '';
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (filterFn(rule)) css += rule.cssText + '\n';
      }
    } catch (_) {}
  }
  return css;
}

// Returns a self-contained HTML snippet for a design preview
function buildDesignSnippet(designId) {
  const prefix = designId; // 'd1', 'd2', 'd3'
  const content = document.querySelector(`#${designId} .browser-frame`);
  const designCSS = collectCSS(r =>
    r.selectorText === ':root' ||
    (r.cssText && (r.cssText.includes(`.${prefix}-`) || r.cssText.includes('.browser-')))
  );
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ContactHub — ${DESIGN_NAMES[designId]}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 2rem; background: #f0f9ff; }
${designCSS}
</style>
</head>
<body>
${content.outerHTML}
</body>
</html>`;
}

const DESIGN_NAMES = {
  d1: 'Design 1 — Clarity (Grid)',
  d2: 'Design 2 — Command (Sidebar)',
  d3: 'Design 3 — Connect (Cards)'
};

const DESIGN_PROMPTS = {
  d1: `ContactHub — Design 1: Clarity (Grid Layout)

Build a contact management web app UI with a glassmorphism light theme.

LAYOUT:
- Fixed top nav bar (64px) with: logo + wordmark left, search bar center, "＋ Add" button + avatar right. Background: rgba(255,255,255,0.85) + backdrop-filter blur(12px).
- Left sidebar (140px) fixed below nav: filter list with tag categories. Each item has a 6px colored dot, label, optional count. Active state: rgba(37,99,235,0.1) background.
- Main area: 3-column CSS grid of contact cards. Background gradient: #dbeafe → #f0f9ff.

CONTACT CARD:
- Background: rgba(255,255,255,0.75) + backdrop-filter blur(8px)
- Border: 1px solid rgba(255,255,255,0.6), border-radius 12px
- Shadow: 0 4px 16px rgba(37,99,235,0.1)
- Content: 38px circular avatar (gradient bg, white initials, centered), name (0.75rem bold), role (0.65rem gray), colored tag badge (inline-block, 0.6rem, border-radius 4px)

SIDEBAR FILTERS: All (48), ⭐ Favorites, Work (green dot), Personal (pink dot), Clients (purple dot), College (cyan dot). Divider, then "+ New Tag" in gray.

COLOR: Primary #2563eb. Gradients: #2563eb→#60a5fa (blue), #ec4899→#f97316 (pink-orange), #8b5cf6→#06b6d4 (purple-cyan), #059669→#34d399 (green), #f59e0b→#ef4444 (amber-red).

INTERACTION: Click a card → slide-over detail panel from right. Filter chip click → grid refilters with fade animation.`,

  d2: `ContactHub — Design 2: Command (3-Column CRM)

Build a 3-column CRM-style contact management app UI.

COLUMN 1 — Icon Nav Sidebar (52px wide):
- Background: linear-gradient(180deg, #1d4ed8, #1e3a8a)
- Logo: 28px rounded square, rgba(255,255,255,0.2) bg, "C" white bold
- Icon buttons (34px, 9px radius): emoji icons for sections. Active state: rgba(255,255,255,0.15) bg
- Icons: 👥 Contacts, 🏷️ Tags, ⭐ Favorites, 📊 Analytics, 🔔 Notifications; then spacer + ⚙️ Settings at bottom

COLUMN 2 — Contact List Panel (200px wide):
- Background: rgba(255,255,255,0.85) + backdrop-filter blur(12px)
- Border-right: 1px solid rgba(219,234,254,0.8)
- Header: "Contacts" bold + "＋" add button (22px, blue gradient)
- Search bar: #f0f9ff bg, blue border, rounded, placeholder "🔍 Search..."
- List items (padding 8px 14px): 28px circular avatar (gradient) + name (0.75rem) + subtitle (0.65rem gray)
- Active item: rgba(37,99,235,0.08) bg + 2px solid #2563eb right border

COLUMN 3 — Detail Panel (flex 1):
- 52px square avatar (14px radius, gradient, bold initials, blue shadow)
- Name (1rem bold), title + company (0.75rem gray), tag chips
- Edit/Star action buttons (28px, rounded, #f0f9ff bg)
- 2×2 grid of field cards: Email, Phone, Company, Last Contact (each: #f1f5f9 bg, label uppercase 0.62rem gray, value 0.75rem bold)
- Note card at bottom: #f8faff bg, quote text, timestamp

PAGE BG: #f0f9ff`,

  d3: `ContactHub — Design 3: Connect (Social Cards)

Build a social-card style contact management app UI.

TOP BAR (background rgba(255,255,255,0.75), blur(16px)):
- Logo "ContactHub" bold left
- Tab pills center: All | ⭐ Fav | Work | Personal. Active tab: #1d4ed8 bg + white text, 8px radius
- Circular avatar (26px, blue gradient) right

SEARCH ROW (padding 10px 14px, flex, gap 8px):
- Search box (flex 1): glass bg, blue border, "🔍 Find a person, company, tag..." placeholder
- Sort button: ghost style "↕ Sort"
- "+ Add Contact" button: blue gradient, 10px radius, white text

CONTACT CARDS (flex-wrap grid, ~4 per row, calc(25% - 8px)):
Each card: rgba(255,255,255,0.75) bg, backdrop-filter blur(10px), 14px radius, 0 4px 20px rgba(37,99,235,0.1) shadow
- TOP ACCENT: 3px gradient stripe at top, unique per contact
- Header row: 40px circular avatar (gradient, bold initials) + star icon (⭐) top right
- Name (0.8rem bold), role (0.65rem gray), company (🏢 + name, 0.68rem)
- Action buttons row: 📧 📞 📝 — flex, each flex:1, rgba(37,99,235,0.08) bg, #2563eb text

CARD ACCENT GRADIENTS (one per contact):
- #2563eb→#60a5fa (blue), #ec4899→#f97316 (pink), #8b5cf6→#06b6d4 (purple-cyan), #059669→#34d399 (green)

PAGE BG: linear-gradient(135deg, #eff6ff, #dbeafe, #e0f2fe)
INTERACTION: Tab filter shows/hides cards. Tapping card flips to show notes.`
};

function copyDesignHTML(designId) {
  copyText(buildDesignSnippet(designId), `${DESIGN_NAMES[designId]} HTML copied!`);
}

function copyDesignPrompt(designId) {
  copyText(DESIGN_PROMPTS[designId], 'Design prompt copied!');
}

function copyCode(elementId) {
  const el = document.getElementById(elementId);
  // For <code> elements copy text; for component wrappers copy the innerHTML
  const text = el.tagName === 'CODE' ? el.textContent.trim() : el.innerHTML.trim();
  copyText(text, 'Copied!');
}

function copyAllCSSTokens() {
  const tokens = collectCSS(r => r.selectorText === ':root');
  copyText(tokens || `/* ContactHub CSS Tokens */
:root {
  --blue-900: #1e3a8a; --blue-700: #1d4ed8; --blue-600: #2563eb;
  --blue-500: #3b82f6; --blue-400: #60a5fa; --blue-300: #93c5fd;
  --blue-200: #bfdbfe; --blue-100: #dbeafe; --blue-50: #eff6ff;
  --white: #ffffff; --surface: #f8faff; --dark: #0f172a;
  --mid: #475569; --light: #94a3b8;
  --border-light: rgba(255,255,255,0.45);
  --glass: rgba(255,255,255,0.65);
  --glass-heavy: rgba(255,255,255,0.82);
  --shadow-blue: rgba(37,99,235,0.14);
  --shadow-md: 0 8px 32px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.06);
  --shadow-lg: 0 20px 60px rgba(37,99,235,0.16), 0 4px 16px rgba(0,0,0,0.08);
  --shadow-3d: 0 24px 48px rgba(37,99,235,0.18), 0 8px 16px rgba(37,99,235,0.1), inset 0 1px 0 rgba(255,255,255,0.9);
  --radius: 16px; --radius-sm: 10px; --radius-lg: 24px;
}`, 'CSS tokens copied!');
}

// ===== SIDEBAR ACTIVE LINK
  function setActive(el) {
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
  }

  // DESIGN TAB SWITCHER
  function showDesign(id, btn) {
    document.querySelectorAll('.design-preview').forEach(d => d.classList.remove('active'));
    document.querySelectorAll('.design-tab').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
  }

  // COLOR COPY
  function copyColor(hex, el) {
    copyText(hex, `Copied ${hex}`);
    el.style.transform = 'scale(0.96)';
    setTimeout(() => el.style.transform = '', 200);
  }

  // SCROLL SPY
  const sections = document.querySelectorAll('section[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.sidebar-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-64px 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));

  // 3D CARD MOUSE TILT
  document.querySelectorAll('.card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });