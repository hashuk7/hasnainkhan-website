const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. UPDATE style.css
const cssPath = path.join(rootDir, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Replace the sidebar CSS block with the complete mobile + desktop responsive collapse rules
const sidebarCssRegex = /\/\* --- 8\. PROFILE SIDEBAR --- \*\/[\s\S]*?\/\* --- 9\. HERO SECTION --- \*\//;

const updatedSidebarCss = `/* --- 8. PROFILE SIDEBAR --- */
.profile-sidebar {
  width: 100%;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 1024px) {
  .profile-sidebar {
    width: 280px;
    flex-shrink: 0;
    position: sticky;
    top: 5.25rem;
    z-index: 40;
  }
  .profile-sidebar.collapsed {
    width: 84px;
  }
}

.sidebar-inner-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.sidebar-inner-card:hover {
  border-color: var(--border-card-hover);
}

/* Collapsed view (Desktop mini vertical strip) */
.sidebar-collapsed-view {
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0.6rem;
  gap: 1.25rem;
  cursor: pointer;
  width: 84px;
  user-select: none;
}

@media (min-width: 1024px) {
  .profile-sidebar.collapsed .sidebar-collapsed-view {
    display: flex;
  }
  .profile-sidebar.collapsed .sidebar-expanded-view {
    display: none;
  }
}

.sidebar-mini-avatar {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--surface-light);
  transition: var(--transition);
}

.sidebar-collapsed-view:hover .sidebar-mini-avatar,
.sidebar-header-row:hover .sidebar-mini-avatar {
  border-color: var(--accent);
  box-shadow: 0 0 14px var(--gold-glow);
}

.mini-avatar-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--accent);
  letter-spacing: -0.02em;
}

.sidebar-vertical-title {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  color: var(--accent);
  font-size: 10.5px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  white-space: nowrap;
  padding: 1rem 0;
}

.sidebar-toggle-arrow {
  color: var(--text-muted);
  font-size: 1.25rem;
  line-height: 1;
  transition: var(--transition);
}

.sidebar-collapsed-view:hover .sidebar-toggle-arrow {
  transform: translateX(3px);
  color: var(--accent);
}

/* Expanded view */
.sidebar-expanded-view {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1.25rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s ease, border-bottom 0.2s ease;
  user-select: none;
}

.sidebar-header-row:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.sidebar-header-meta {
  flex: 1;
  min-width: 0;
}

.sidebar-header-name {
  color: var(--text);
  font-weight: 700;
  font-size: 15px;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-header-pill {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--accent);
  background: var(--surface-light);
  border: 1px solid rgba(182, 255, 0, 0.2);
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  margin-top: 0.35rem;
  display: inline-block;
  font-weight: 500;
}

.sidebar-collapse-chevron {
  color: var(--text-muted);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
}

.sidebar-header-row:hover .sidebar-collapse-chevron {
  color: var(--accent);
}

/* Mobile Collapse Rules (< 1024px) */
@media (max-width: 1023px) {
  .profile-sidebar.collapsed .sidebar-header-row {
    border-bottom: none;
  }
  .profile-sidebar.collapsed .sidebar-details-list,
  .profile-sidebar.collapsed .sidebar-socials-row {
    display: none !important;
  }
  .profile-sidebar.collapsed .sidebar-collapse-chevron {
    transform: rotate(90deg); /* Points down to indicate click to expand */
  }
  .profile-sidebar:not(.collapsed) .sidebar-collapse-chevron {
    transform: rotate(-90deg); /* Points up to indicate click to collapse */
  }
}

/* Desktop Chevron (>= 1024px) */
@media (min-width: 1024px) {
  .profile-sidebar:not(.collapsed) .sidebar-collapse-chevron {
    transform: rotate(180deg);
  }
}

.sidebar-details-list {
  padding: 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.sidebar-detail-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-detail-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--surface-light);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.sidebar-detail-icon svg {
  width: 15px;
  height: 15px;
}

.sidebar-detail-meta {
  flex: 1;
  min-width: 0;
}

.sidebar-detail-label {
  font-size: 10px;
  font-family: var(--font-mono);
  color: var(--text-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
}

.sidebar-detail-val-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
}

.sidebar-detail-val {
  font-size: 13px;
  color: var(--text);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.copy-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 3px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.copy-btn:hover {
  color: var(--accent);
  background: var(--surface-light);
}

.copy-btn svg {
  width: 14px;
  height: 14px;
}

.copy-btn .check-icon {
  display: none;
  color: var(--accent);
}

.copy-btn.copied .copy-icon {
  display: none;
}

.copy-btn.copied .check-icon {
  display: block;
}

.sidebar-socials-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.9rem 1.25rem;
  border-top: 1px solid var(--border);
  background: var(--surface);
}

.sidebar-social-link {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.sidebar-social-link:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.sidebar-social-link svg {
  width: 17px;
  height: 17px;
}

/* --- 9. HERO SECTION --- */`;

css = css.replace(sidebarCssRegex, updatedSidebarCss);
fs.writeFileSync(cssPath, css, 'utf8');
console.log('style.css updated with mobile sidebar collapse rules!');

// 2. UPDATE script.js
const jsPath = path.join(rootDir, 'script.js');
let js = fs.readFileSync(jsPath, 'utf8');

const sidebarJsRegex = /\/\* --------------------------------------------------------------------------\s+6\. COLLAPSIBLE SIDEBAR TOGGLE[\s\S]*?function initCollapsibleSidebar\(\) \{[\s\S]*?\n\}/;

const updatedSidebarJs = `/* --------------------------------------------------------------------------
   6. COLLAPSIBLE SIDEBAR TOGGLE
   -------------------------------------------------------------------------- */
function initCollapsibleSidebar() {
  const sidebar = document.getElementById('collapsible-sidebar');
  if (!sidebar) return;

  const expandTrigger = document.getElementById('sidebar-expand-trigger');
  const collapseTrigger = document.getElementById('sidebar-collapse-trigger');
  const copyBtn = document.getElementById('copy-email-btn');

  // Check saved state in localStorage (default to expanded if unset)
  const isSavedCollapsed = localStorage.getItem('hk_sidebar_collapsed') === 'true';
  if (isSavedCollapsed) {
    sidebar.classList.add('collapsed');
    if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'false');
  } else {
    sidebar.classList.remove('collapsed');
    if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'true');
  }

  const setCollapsedState = (collapsed) => {
    if (collapsed) {
      sidebar.classList.add('collapsed');
      localStorage.setItem('hk_sidebar_collapsed', 'true');
      if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'false');
    } else {
      sidebar.classList.remove('collapsed');
      localStorage.setItem('hk_sidebar_collapsed', 'false');
      if (collapseTrigger) collapseTrigger.setAttribute('aria-expanded', 'true');
    }
  };

  // Expand when clicking collapsed strip (desktop 84px strip)
  if (expandTrigger) {
    expandTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setCollapsedState(false);
    });
  }

  // Click on header row: toggles open/close on mobile, collapses on desktop
  if (collapseTrigger) {
    collapseTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        const isCollapsed = sidebar.classList.contains('collapsed');
        setCollapsedState(!isCollapsed);
      } else {
        setCollapsedState(true);
      }
    });
  }

  // Copy Email with visual feedback
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const email = 'hasnainkhanreal18@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
      } catch (err) {
        const temp = document.createElement('input');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
      }
    });
  }
}`;

js = js.replace(sidebarJsRegex, updatedSidebarJs);
fs.writeFileSync(jsPath, js, 'utf8');
console.log('script.js updated with improved collapsible sidebar handler!');
