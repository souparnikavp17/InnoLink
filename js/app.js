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

  // Initialize Persona Switcher in the top demo banner
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
      ui.showToast(`Switched active perspective to: ${persona.label}`, 'info');
    });
  }

  // Setup Routes
  const routes = {
    '/': () => ui.renderLanding(),
    '/explore': (context) => ui.renderExplore(context.query),
    '/problem/:id': (context) => ui.renderDetail(context.params.id),
    '/post': () => ui.renderPostProblem(),
    '/how-it-works': () => ui.renderHowItWorks(),
    '/roadmap': () => ui.renderRoadmap()
  };

  const router = new Router(routes);
  router.init();

  // Initialize Usability Tester Hub drawer
  ui.initTesterHub();

  console.log("InnoLink Prototype initialized successfully.");
});

