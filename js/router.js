// ================================
// Router minimal basé sur Navigation API
// + View Transitions (optionnel)
// ================================

/**
 * Récupère la base de l'URL à injecter dans les routes
 * "/" pour localhost
 * "/mon-repo/" quand déployé sur GH Pages
 */
export const APP_BASE_PATH = location.pathname.endsWith('/')
  ? location.pathname
  : `${location.pathname}/`;

// Table de routes -> pour chaque chemin, on sait quel module ES charger.
// Chaque module exporte une fonction: export function render() { ... }
const routes = {
  '/settings': () => import('./views/settings/settings.view.js'),
  '/':         () => import('./views/homepage/homepage.view.js'), // fallback racine
};

/**
 * Transforme une route “interne app” (ex. "/settings") en URL “réelle navigateur” (ex. "/mon-repo/settings" sur GitHub Pages).
 * Objectif: "ajoute" le préfix du repo pour "lancer la navigation dans le browser et naviger vers la bonne url"
 * @param {*} appPath 
 * @returns 
 */
export function toExternalPath(appPath) {
  if (APP_BASE_PATH === '/') return appPath;
  return APP_BASE_PATH.replace(/\/$/, '') + appPath; // "/mon-repo" + "/settings"
}

/**
 * Fait l’inverse de toExternalPath(appPath): prend le pathname réel (ex. "/mon-repo/settings") et le ramène à la route interne (ex. "/settings").
 * Objectif : que le routeur fasse le lookup dans "routes" qui, lui, reste propre ("/settings", "/about", etc.).
 * @param {*} pathname 
 * @returns 
 */
export function normalizePath(pathname) {
  // Cas local: APP_BASE_PATH === '/'
  if (APP_BASE_PATH === '/') return pathname || '/';

  // Cas GH Pages: pathname = "/mon-repo/settings"
  // on veut => "/settings"
  if (pathname.startsWith(APP_BASE_PATH)) {
    // APP_BASE_PATH finit par '/', donc on retire tout sauf le '/' initial
    return '/' + pathname.slice(APP_BASE_PATH.length);
  }

  // Si ça ne matche pas, on renvoie tel quel (fallback)
  return pathname || '/';
}

export async function renderURL(urlString) {
  try {
    // Convertit la string en URL pour extraire le pathname
    const url = new URL(urlString, location.href);

    // 1) pathname “réel” du navigateur (ex: /mon-repo/settings)
    const rawPath = url.pathname;
    // 2) pathname “interne” de ton app (ex: /settings)
    const appPath = normalizePath(rawPath);
    // 3) lookup route interne
    const loadPageModule = routes[appPath] || routes['/'];
    const pageModule = await loadPageModule();

    // Le module de page se charge de récupérer les éléments et de les hydrater
    const applyDOMUpdates = () => {
      try {
        pageModule.render(); // peut throw (innerHTML d’une variable undef, etc.)
      } catch (err) {
        console.error('[render() error]', err);
        throw err; // IMPORTANT: rethrow pour remonter l’échec au handler
      }
    }

    // Si View Transitions est dispo, on anime le diff ; sinon, on applique directement
    if (document.startViewTransition) {
      const vt = document.startViewTransition(applyDOMUpdates);
      /* await */ vt.finished; // si tu veux enchaîner; sinon omets l'await
    } else {
      applyDOMUpdates();
    }
  } catch (err) {
    console.error('[renderURL error]', err);
    throw err; // on relance pour que l’appelant sache que ça a échoué
  }
}

// Interception centralisée des navigations "same-document" (SPA)
navigation.addEventListener('navigate', (navEvent) => {
  if (!navEvent.canIntercept) return;      // téléchargements, cross-origin…
  if (navEvent.hashChange) return;         // laisse #ancre au natif si tu veux
  if (navEvent.downloadRequest) return;    // on ne touche pas aux downloads

  navEvent.intercept({
    handler: () => renderURL(navEvent.destination.url),
  });
});

window.addEventListener('error', (ev) => {
  console.error('[global error]', ev.error || ev.message, ev);
});
window.addEventListener('unhandledrejection', (ev) => {
  console.error('[unhandled rejection]', ev.reason);
});

// ================================
// Notes :
// - Back/forward restent natifs (historique géré par Navigation API).
// - Navigation programmée: navigation.navigate('/about').
// - Tu peux limiter les transitions à des zones via CSS (view-transition-name).
// ================================