/* ==========================================================================
   InnoLink Main Application Controller
   ========================================================================== */

import { state } from './state.js';
import { Router } from './router.js';
import { UIRenderer } from './ui.js';
import { PERSONAS } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const ui = new UIRenderer(appContainer);

  // Initialize Persona Switcher in the top tester bar
  const personaSelect = document.getElementById('persona-select');
  if (personaSelect) {
    personaSelect.innerHTML = PERSONAS.map(p => `
      <option value="${p.id}" ${state.getActivePersona() === p.id ? 'selected' : ''}>
        Role: ${p.label}
      </option>
    `).join('');

    personaSelect.addEventListener('change', (e) => {
      state.setActivePersona(e.target.value);
      const persona = PERSONAS.find(p => p.id === e.target.value);
      ui.showToast(`Active perspective switched to: ${persona.label}`, 'info');
    });
  }

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

  // Initialize Usability Tester Hub drawer & webhook integration
  ui.initTesterHub();

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

  console.log("InnoLink Platform initialized with Usability Tester Hub.");
});
