import { state } from './state.js';
import { Router } from './router.js';
import { UIRenderer } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const ui = new UIRenderer(appContainer);

  // Setup Routes
  const routes = {
    '/': () => ui.renderLanding(),
    '/explore': (context) => ui.renderExplore(context.query),
    '/problem/:id': (context) => ui.renderDetail(context.params.id),
    '/challenge/:id': (context) => ui.renderChallengeDetail(context.params.id),
    '/post': () => ui.renderPostProblem(),
    '/how-it-works': () => ui.renderHowItWorks(),
    '/roadmap': () => ui.renderRoadmap()
  };

  const router = new Router(routes);
  router.init();

  // Mobile menu drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const isOpen = mobileNavDrawer.classList.contains('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when any mobile link is clicked
    mobileNavDrawer.querySelectorAll('.mobile-nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  console.log("InnoLink Platform initialized.");
});
