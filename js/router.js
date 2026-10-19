/* ==========================================================================
   InnoLink Hash Router
   Handles client-side routing, URL updates, and navigation events.
   ========================================================================== */

export class Router {
  constructor(routes = {}) {
    this.routes = routes;
    this.currentRoute = null;
    this.currentParams = {};
    this.queryParams = {};

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  init() {
    if (!window.location.hash) {
      window.location.hash = '#/';
    } else {
      this.handleRoute();
    }
  }

  navigate(hash) {
    window.location.hash = hash;
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart || '/';

    // Parse query params
    this.queryParams = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [k, v] of searchParams.entries()) {
        this.queryParams[k] = v;
      }
    }

    // Match routes
    for (const routePattern of Object.keys(this.routes)) {
      const { matched, params } = this.matchRoute(routePattern, path);
      if (matched) {
        this.currentRoute = routePattern;
        this.currentParams = params;
        this.updateActiveNavLinks(routePattern);
        this.routes[routePattern]({
          path,
          params: this.currentParams,
          query: this.queryParams
        });
        window.scrollTo(0, 0);
        return;
      }
    }

    // Fallback to home if not found
    console.warn(`No route matched for ${path}, redirecting to /`);
    window.location.hash = '#/';
  }

  matchRoute(pattern, path) {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) {
      return { matched: false, params: {} };
    }

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1);
        params[paramName] = decodeURIComponent(pathParts[i]);
      } else if (patternParts[i] !== pathParts[i]) {
        return { matched: false, params: {} };
      }
    }

    return { matched: true, params };
  }

  updateActiveNavLinks(activePattern) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkHash = link.getAttribute('href') ? link.getAttribute('href').slice(1) : '';
      if (linkHash === activePattern || (activePattern === '/' && (linkHash === '/' || linkHash === ''))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

