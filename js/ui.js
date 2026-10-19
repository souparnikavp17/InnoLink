/* ==========================================================================
   InnoLink UI Renderers & Component Views
   ========================================================================== */

import { state } from './state.js';
import { CATEGORIES, STATUS_LABELS, PERSONAS, VALIDATION_TASKS } from './data.js';

export class UIRenderer {
  constructor(appContainer) {
    this.app = appContainer;
  }

  // ------------------------------------------------------------------------
  // Helper methods
  // ------------------------------------------------------------------------
  getStatusBadgeClass(status) {
    switch (status) {
      case STATUS_LABELS.OPEN: return 'badge-open';
      case STATUS_LABELS.SOLUTION_PROPOSED: return 'badge-proposed';
      case STATUS_LABELS.IN_DEVELOPMENT: return 'badge-dev';
      case STATUS_LABELS.SOLVED: return 'badge-solved';
      default: return 'badge-open';
    }
  }

  getImpactBadgeClass(level) {
    const l = (level || '').toLowerCase();
    if (l === 'critical') return 'badge-impact-critical';
    if (l === 'high') return 'badge-impact-high';
    if (l === 'moderate' || l === 'medium') return 'badge-impact-medium';
    return 'badge-impact-low';
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ------------------------------------------------------------------------
  // 1. Landing View
  // ------------------------------------------------------------------------
  renderLanding() {
    const problems = state.getProblems();
    const challenges = state.getSponsoredChallenges();

    this.app.innerHTML = `
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-brand-pill">
            <span>✨ InnoLink Prototype</span>
            <span>•</span>
            <span>Democratizing Problem-Solving</span>
          </div>
          <h1 class="hero-title">
            Where Overlooked Problems Meet <br>
            <span class="hero-title-highlight">Creative Problem-Solvers</span>
          </h1>
          <p class="hero-subtitle">
            People know the problems. Problem-solvers bring the expertise. InnoLink connects lived experience with students, researchers, and innovators ready to build real solutions.
          </p>
          <div class="hero-actions">
            <a href="#/post" class="btn btn-primary btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Post a Problem
            </a>
            <a href="#/explore" class="btn btn-secondary btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Explore Problems
            </a>
            <a href="#/how-it-works" class="btn btn-subtle btn-lg">
              How It Works & Trust →
            </a>
          </div>

          <div class="hero-stats-row">
            <div class="hero-stat-card">
              <div class="hero-stat-num">${problems.length}</div>
              <div class="hero-stat-label">Real-World Problems</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">${CATEGORIES.length - 1}</div>
              <div class="hero-stat-label">Active Impact Domains</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">${challenges.length}</div>
              <div class="hero-stat-label">Sponsored Challenges</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">$40.5k</div>
              <div class="hero-stat-label">Demo Bounty Awards</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Roles & Value Propositions -->
      <section class="container" style="padding-top: 3.5rem; padding-bottom: 2rem;">
        <div class="section-header" style="text-align: center;">
          <span class="section-eyebrow">Who InnoLink Is Built For</span>
          <h2 class="section-title">Built for Everyone Who Touches Innovation</h2>
          <p class="section-subtitle" style="margin: 0.5rem auto 0;">Whether you have encountered a daily friction point or have the tools to build a prototype, there is a role for you.</p>
        </div>

        <div class="roles-grid">
          <div class="role-card">
            <div class="role-icon-box role-icon-poster">💡</div>
            <h3>Problem Poster</h3>
            <p>Share overlooked frustrations from healthcare, campus life, civic spaces, or work so innovators know what actually matters.</p>
            <a href="#/post" class="role-card-action">Post your problem →</a>
          </div>
          <div class="role-card">
            <div class="role-icon-box role-icon-solver">🔬</div>
            <h3>Innovator & Solver</h3>
            <p>Find real user needs for your capstone project, research grant, or startup prototype instead of solving hypothetical problems.</p>
            <a href="#/explore" class="role-card-action">Browse open problems →</a>
          </div>
          <div class="role-card">
            <div class="role-icon-box role-icon-expert">⚖️</div>
            <h3>Expert & Validator</h3>
            <p>Review technical feasibility, safety claims, and provide constructive critique to distinguish workable designs from hype.</p>
            <a href="#/roadmap" class="role-card-action">Review validation model →</a>
          </div>
          <div class="role-card">
            <div class="role-icon-box role-icon-sponsor">🏆</div>
            <h3>Organization / Sponsor</h3>
            <p>Sponsor high-impact challenges, fund targeted bounties, and support student or community open innovation.</p>
            <a href="#/roadmap" class="role-card-action">Explore sponsor portal →</a>
          </div>
        </div>
      </section>

      <!-- Featured Sponsored Challenges Section (Prominent Landing Feature) -->
      <section class="sponsored-section">
        <div class="container">
          <div class="sponsored-header-row">
            <div>
              <span class="section-eyebrow" style="color: var(--bounty-gold);">Funded Innovation Challenges</span>
              <h2 class="section-title">Featured Sponsored Challenges</h2>
              <p class="section-subtitle">
                High-priority real-world problems funded by organizations, research foundations, and civic bodies with confirmed bounties.
              </p>
            </div>
            <div>
              <span class="badge badge-bounty">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Demo Prototype Challenges
              </span>
            </div>
          </div>

          <div class="challenge-grid">
            ${challenges.map(ch => `
              <div class="challenge-card">
                <div class="challenge-sponsor-bar">
                  <div class="sponsor-meta">
                    <div class="sponsor-avatar">${ch.sponsorAvatar}</div>
                    <div>
                      <div class="sponsor-name">${ch.sponsorName}</div>
                      <div class="sponsor-type">${ch.sponsorType}</div>
                    </div>
                  </div>
                  <span class="badge badge-category">${ch.category}</span>
                </div>

                <div class="challenge-bounty-box">
                  <div>
                    <span style="font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); display: block; font-weight: 700;">Award Pool</span>
                    <span class="bounty-amount">${ch.bountyAmount}</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 0.6875rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); display: block; font-weight: 700;">Deadline</span>
                    <span class="bounty-deadline">${ch.daysLeft} days left</span>
                  </div>
                </div>

                <h3 class="challenge-title">${ch.title}</h3>
                <p class="challenge-desc">${ch.problemSummary}</p>

                <div class="challenge-reqs-preview">
                  <strong>Key Deliverable & Target:</strong>
                  <span>${ch.requirements[0]}</span>
                </div>

                <div class="challenge-footer">
                  <span style="font-size: 0.75rem; color: var(--text-muted);">Due ${ch.deadline}</span>
                  <button class="btn btn-outline-inno btn-sm view-challenge-btn" data-challenge-id="${ch.id}">
                    View Requirements & Details →
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Featured Community Problems Preview -->
      <section class="container" style="padding-top: 3.5rem; padding-bottom: 3.5rem;">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="section-eyebrow">Community Problems</span>
            <h2 class="section-title">Trending Real-World Needs</h2>
            <p class="section-subtitle">Problems highlighted directly by people experiencing them.</p>
          </div>
          <a href="#/explore" class="btn btn-secondary">
            View All ${problems.length} Problems →
          </a>
        </div>

        <div class="problems-grid">
          ${problems.slice(0, 3).map(p => this.renderProblemCardHtml(p)).join('')}
        </div>
      </section>
    `;

    // Attach listeners for sponsored challenge modal buttons
    this.app.querySelectorAll('.view-challenge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const chId = btn.getAttribute('data-challenge-id');
        this.openChallengeModal(chId);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Explore Feed View
  // ------------------------------------------------------------------------
  renderExplore(filters = {}) {
    const allProblems = state.getProblems();
    const activeCat = filters.category || 'All';
    const searchQuery = (filters.search || '').toLowerCase().trim();
    const activeStatus = filters.status || 'All';
    const activeSort = filters.sort || 'supported';

    // Filter problems
    let filtered = allProblems.filter(p => {
      const matchCat = (activeCat === 'All') || (p.category === activeCat);
      const matchStatus = (activeStatus === 'All') || (p.status === activeStatus);
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery);
      return matchCat && matchStatus && matchSearch;
    });

    // Sort
    if (activeSort === 'supported') {
      filtered.sort((a, b) => (b.supportedByCount || 0) - (a.supportedByCount || 0));
    } else if (activeSort === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeSort === 'solutions') {
      filtered.sort((a, b) => (b.solutions?.length || 0) - (a.solutions?.length || 0));
    }

    this.app.innerHTML = `
      <div class="container">
        <div class="section-header" style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span class="section-eyebrow">Discover Needs</span>
            <h1 class="section-title">Explore Real-World Problems</h1>
            <p class="section-subtitle">Browse community problems, check validation stages, and find opportunities where your skills can make a difference.</p>
          </div>
          <a href="#/post" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Post a Problem
          </a>
        </div>

        <!-- Controls Box -->
        <div class="explore-controls-box">
          <!-- Search input -->
          <div class="search-input-wrapper">
            <span class="search-input-icon">🔍</span>
            <input 
              type="text" 
              id="feed-search-input" 
              class="form-input search-field" 
              placeholder="Search problems by keyword (e.g., hospital, lab, transit, elderly, audio)..." 
              value="${filters.search || ''}"
            />
          </div>

          <!-- Category filter pills -->
          <div class="category-filter-pills">
            ${CATEGORIES.map(cat => {
              const count = cat === 'All' ? allProblems.length : allProblems.filter(p => p.category === cat).length;
              const isActive = cat === activeCat ? 'active' : '';
              return `
                <button class="filter-pill ${isActive}" data-category="${cat}">
                  ${cat} (${count})
                </button>
              `;
            }).join('')}
          </div>

          <!-- Secondary filters row: Status & Sort -->
          <div class="secondary-filters-row">
            <div class="filter-dropdown-group">
              <label for="status-filter">Status:</label>
              <select id="status-filter" class="filter-select">
                <option value="All" ${activeStatus === 'All' ? 'selected' : ''}>All Statuses</option>
                <option value="${STATUS_LABELS.OPEN}" ${activeStatus === STATUS_LABELS.OPEN ? 'selected' : ''}>${STATUS_LABELS.OPEN}</option>
                <option value="${STATUS_LABELS.SOLUTION_PROPOSED}" ${activeStatus === STATUS_LABELS.SOLUTION_PROPOSED ? 'selected' : ''}>${STATUS_LABELS.SOLUTION_PROPOSED}</option>
                <option value="${STATUS_LABELS.IN_DEVELOPMENT}" ${activeStatus === STATUS_LABELS.IN_DEVELOPMENT ? 'selected' : ''}>${STATUS_LABELS.IN_DEVELOPMENT}</option>
                <option value="${STATUS_LABELS.SOLVED}" ${activeStatus === STATUS_LABELS.SOLVED ? 'selected' : ''}>${STATUS_LABELS.SOLVED}</option>
              </select>
            </div>

            <div class="filter-dropdown-group">
              <label for="sort-filter">Sort by:</label>
              <select id="sort-filter" class="filter-select">
                <option value="supported" ${activeSort === 'supported' ? 'selected' : ''}>Most Supported</option>
                <option value="newest" ${activeSort === 'newest' ? 'selected' : ''}>Newest First</option>
                <option value="solutions" ${activeSort === 'solutions' ? 'selected' : ''}>Most Solutions</option>
              </select>
            </div>

            <div style="font-size: 0.8125rem; color: var(--text-muted);">
              Showing <strong>${filtered.length}</strong> of ${allProblems.length} problems
            </div>
          </div>
        </div>

        <!-- Problems Grid -->
        ${filtered.length > 0 ? `
          <div class="problems-grid">
            ${filtered.map(p => this.renderProblemCardHtml(p)).join('')}
          </div>
        ` : `
          <div style="background: white; border: 1px dashed var(--border-medium); border-radius: var(--radius-lg); padding: 4rem 2rem; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔎</div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">No matching problems found</h3>
            <p style="color: var(--text-secondary); max-width: 450px; margin: 0 auto 1.5rem;">
              We couldn't find any problems matching your current filter criteria. Try clearing your filters or be the first to post this problem!
            </p>
            <a href="#/post" class="btn btn-primary">Post This Problem</a>
          </div>
        `}
      </div>
    `;

    // Bind event listeners for search and filter updates
    const searchInput = this.app.querySelector('#feed-search-input');
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.updateExploreRoute({ search: e.target.value.trim() });
      }, 300);
    });

    this.app.querySelectorAll('.category-filter-pills .filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-category');
        this.updateExploreRoute({ category: cat });
      });
    });

    this.app.querySelector('#status-filter').addEventListener('change', (e) => {
      this.updateExploreRoute({ status: e.target.value });
    });

    this.app.querySelector('#sort-filter').addEventListener('change', (e) => {
      this.updateExploreRoute({ sort: e.target.value });
    });
  }

  updateExploreRoute(newParams) {
    const hash = window.location.hash;
    const [base, query] = hash.split('?');
    const searchParams = new URLSearchParams(query || '');

    for (const [key, val] of Object.entries(newParams)) {
      if (val && val !== 'All') {
        searchParams.set(key, val);
      } else {
        searchParams.delete(key);
      }
    }

    const newQueryStr = searchParams.toString();
    window.location.hash = `#/explore${newQueryStr ? '?' + newQueryStr : ''}`;
  }

  renderProblemCardHtml(p) {
    const isSupported = state.isProblemSupported(p.id);
    const solCount = p.solutions ? p.solutions.length : 0;

    return `
      <a href="#/problem/${p.id}" class="problem-card">
        <div class="problem-card-header">
          <span class="badge badge-category">${p.category}</span>
          <span class="badge ${this.getStatusBadgeClass(p.status)}">${p.status}</span>
        </div>

        <h3 class="problem-title">${p.title}</h3>
        <p class="problem-excerpt">${p.description}</p>

        <div class="problem-meta-row">
          <span class="badge ${this.getImpactBadgeClass(p.impactLevel)}">
            ${p.impactLevel} Impact
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">
            • Occurs: ${p.frequency || 'Regularly'}
          </span>
        </div>

        <div class="author-tag">
          <div class="author-avatar-sm">${p.author?.avatar || 'IN'}</div>
          <span>Posted by ${p.author?.name || 'Community Member'}</span>
        </div>

        <div class="problem-card-footer">
          <div class="problem-stats">
            <span class="stat-item" title="People who experience this problem too">
              <span style="color: ${isSupported ? 'var(--brand-link)' : 'inherit'};">🙌</span>
              <strong>${p.supportedByCount || 0}</strong> support
            </span>
            <span class="stat-item" title="Proposed solutions">
              <span>💡</span>
              <strong>${solCount}</strong> ${solCount === 1 ? 'solution' : 'solutions'}
            </span>
          </div>
          <span style="font-size: 0.8125rem; font-weight: 600; color: var(--brand-inno);">
            View Details →
          </span>
        </div>
      </a>
    `;
  }

  // ------------------------------------------------------------------------
  // 3. Problem Detail View
  // ------------------------------------------------------------------------
  renderDetail(problemId) {
    const problem = state.getProblemById(problemId);
    if (!problem) {
      this.app.innerHTML = `
        <div class="container" style="text-align: center; padding: 4rem 1rem;">
          <h2>Problem Not Found</h2>
          <p style="color: var(--text-secondary); margin: 1rem 0;">The problem you are looking for does not exist or was removed.</p>
          <a href="#/explore" class="btn btn-primary">Back to Explore Problems</a>
        </div>
      `;
      return;
    }

    const isSupported = state.isProblemSupported(problem.id);
    const solutions = problem.solutions || [];
    const comments = problem.comments || [];

    this.app.innerHTML = `
      <div class="container">
        <!-- Breadcrumb navigation -->
        <div style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--text-muted);">
          <a href="#/explore" style="color: var(--text-secondary); text-decoration: none;">← Back to Problems</a>
          <span>/</span>
          <span>${problem.category}</span>
          <span>/</span>
          <span style="color: var(--text-primary); font-weight: 500;">Detail</span>
        </div>

        <div class="detail-layout">
          <!-- Main Content Column -->
          <div class="detail-main">
            <div class="detail-card">
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <span class="badge badge-category">${problem.category}</span>
                <span class="badge ${this.getStatusBadgeClass(problem.status)}">${problem.status}</span>
                <span class="badge ${this.getImpactBadgeClass(problem.impactLevel)}">${problem.impactLevel} Impact</span>
                <span style="font-size: 0.8125rem; color: var(--text-muted); margin-left: auto;">Posted ${problem.createdAt}</span>
              </div>

              <h1 class="detail-title">${problem.title}</h1>

              <div class="author-tag" style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-light);">
                <div class="author-avatar-sm" style="width: 28px; height: 28px; font-size: 0.75rem;">${problem.author?.avatar || 'IN'}</div>
                <div>
                  <strong style="color: var(--text-primary); font-size: 0.875rem;">${problem.author?.name}</strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${problem.author?.role}</div>
                </div>
              </div>

              <!-- Problem Statement -->
              <div style="margin-bottom: 1.5rem;">
                <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Problem Description</h3>
                <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7;">
                  ${problem.description}
                </p>
              </div>

              <!-- Background & Context -->
              ${problem.context ? `
                <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
                  <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">Additional Context & Lived Experience:</h4>
                  <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
                    ${problem.context}
                  </p>
                </div>
              ` : ''}

              <!-- "I Experience This Too" Action Box -->
              <div class="support-action-box">
                <div class="support-action-text">
                  <strong>Do you experience this problem too?</strong>
                  <span>Signal to problem-solvers and sponsors that this problem has widespread real-world impact.</span>
                </div>
                <button id="support-toggle-btn" class="btn ${isSupported ? 'support-btn supported' : 'btn-outline-inno support-btn'}">
                  <span>${isSupported ? '✓ Supported' : '🙌 I Experience This Too'}</span>
                  <span class="badge" style="background: rgba(0,0,0,0.1); color: inherit;">${problem.supportedByCount || 0}</span>
                </button>
              </div>
            </div>

            <!-- Proposed Solutions Section -->
            <div class="detail-card">
              <div class="solutions-section-header">
                <div>
                  <h2 style="font-size: 1.375rem; font-weight: 800; color: var(--text-primary);">
                    Proposed Solutions (${solutions.length})
                  </h2>
                  <p style="font-size: 0.8125rem; color: var(--text-muted);">
                    Community suggestions, prototypes, and open technical proposals.
                  </p>
                </div>
                <button id="open-propose-solution-btn" class="btn btn-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  Propose a Solution
                </button>
              </div>

              ${solutions.length > 0 ? `
                <div class="solutions-list">
                  ${solutions.map(sol => this.renderSolutionCardHtml(problem.id, sol)).join('')}
                </div>
              ` : `
                <div style="border: 1px dashed var(--border-medium); border-radius: var(--radius-md); padding: 2.5rem 1.5rem; text-align: center;">
                  <div style="font-size: 2.25rem; margin-bottom: 0.75rem;">💡</div>
                  <h4 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 0.35rem;">No solutions proposed yet</h4>
                  <p style="font-size: 0.875rem; color: var(--text-secondary); max-width: 460px; margin: 0 auto 1.25rem;">
                    Have an idea, research background, or hardware/software concept to solve this? Be the first to share an approach!
                  </p>
                  <button class="btn btn-primary" onclick="document.getElementById('open-propose-solution-btn').click()">
                    Propose the First Solution
                  </button>
                </div>
              `}

              <!-- Trust Disclaimer about Solutions & Votes -->
              <div style="margin-top: 1.5rem; padding: 0.875rem 1rem; background: var(--bg-muted); border-radius: var(--radius-md); border-left: 3px solid var(--brand-inno); font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
                <strong style="color: var(--text-primary);">⚠️ Prototype Trust Note:</strong> Community votes indicate community perceived helpfulness and peer interest. They do not constitute formal technical validation, peer-reviewed engineering testing, or regulatory clearance.
              </div>
            </div>

            <!-- Community Comments Section -->
            <div class="detail-card">
              <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">
                Community Discussion (${comments.length})
              </h3>

              <div id="comments-list" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                ${comments.length > 0 ? comments.map(c => `
                  <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-light);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
                      <strong style="font-size: 0.875rem; color: var(--text-primary);">${c.author}</strong>
                      <span style="font-size: 0.75rem; color: var(--text-muted);">${c.timestamp}</span>
                    </div>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.5;">${c.text}</p>
                  </div>
                `).join('') : `
                  <p style="font-size: 0.875rem; color: var(--text-muted); font-style: italic;">No comments yet. Share your experience or thoughts below.</p>
                `}
              </div>

              <!-- Add Comment Form -->
              <form id="add-comment-form" style="border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
                <div class="form-group">
                  <label class="form-label" for="comment-text">Add your perspective or context</label>
                  <textarea id="comment-text" class="form-textarea" placeholder="Share additional nuances, related experiences, or questions..." rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-secondary btn-sm">Submit Comment</button>
              </form>
            </div>
          </div>

          <!-- Sidebar Column: Impact Summary & Guidelines -->
          <div class="detail-sidebar">
            <div class="detail-card" style="padding: 1.5rem;">
              <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">Problem Impact Overview</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.875rem;">
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Reported Frequency</span>
                  <strong style="color: var(--text-primary); font-size: 1rem;">${problem.frequency || 'Weekly'}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Severity Level</span>
                  <span class="badge ${this.getImpactBadgeClass(problem.impactLevel)}">${problem.impactLevel} Severity</span>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.75rem;">Community Verification</span>
                  <strong style="color: var(--brand-link); font-size: 1rem;">${problem.supportedByCount || 0} People</strong>
                  <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">experience this same friction point</span>
                </div>
              </div>
            </div>

            <!-- Guidelines Callout -->
            <div class="detail-card" style="padding: 1.5rem; background: var(--bg-muted);">
              <h4 style="font-size: 0.875rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">InnoLink Solution Guidelines</h4>
              <ul style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5; padding-left: 1.25rem; margin-bottom: 1rem;">
                <li>Ground ideas in technical feasibility and practical constraints.</li>
                <li>Cite sources, prior academic work, or link open repositories.</li>
                <li>Remember that posting does not assign or settle patent or IP rights.</li>
              </ul>
              <a href="#/how-it-works" style="font-size: 0.75rem; font-weight: 600; color: var(--brand-inno); text-decoration: underline;">
                Read full Trust & Safety Guidelines →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind event handlers
    const supportBtn = this.app.querySelector('#support-toggle-btn');
    supportBtn.addEventListener('click', () => {
      state.toggleSupportProblem(problem.id);
      this.renderDetail(problem.id); // Re-render detail
      this.showToast(state.isProblemSupported(problem.id) ? "You signaled shared experience for this problem!" : "Removed support signal.", "info");
    });

    const proposeBtn = this.app.querySelector('#open-propose-solution-btn');
    proposeBtn.addEventListener('click', () => {
      this.openProposeSolutionModal(problem.id);
    });

    // Solution vote buttons
    this.app.querySelectorAll('.vote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const solId = btn.getAttribute('data-solution-id');
        const voteType = btn.getAttribute('data-vote-type');
        state.voteSolution(problem.id, solId, voteType);
        this.renderDetail(problem.id);
        this.showToast(`Feedback recorded: ${voteType}`, "info");
      });
    });

    // Add comment form
    const commentForm = this.app.querySelector('#add-comment-form');
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.app.querySelector('#comment-text').value;
      if (text.trim()) {
        state.addComment(problem.id, text);
        this.renderDetail(problem.id);
        this.showToast("Comment posted!", "success");
      }
    });
  }

  renderSolutionCardHtml(problemId, sol) {
    const userVote = state.getSolutionVote(sol.id);
    const votes = sol.communityVotes || { helpful: 0, needsWork: 0, canBuild: 0 };

    return `
      <div class="solution-card">
        <div class="solution-header">
          <div>
            <h4 class="solution-title">${sol.title}</h4>
            <div class="author-tag" style="margin-top: 0.25rem;">
              <span>By <strong>${sol.author?.name}</strong> (${sol.author?.role})</span>
            </div>
          </div>
          <div>
            ${sol.isExpertReviewed ? `
              <span class="badge" style="background: #F3E8FF; color: #7C3AED; border: 1px solid #D8B4FE;">
                ✓ Expert Reviewed
              </span>
            ` : `
              <span class="badge" style="background: var(--bg-muted); color: var(--text-muted);">
                Community Submitted
              </span>
            `}
          </div>
        </div>

        <p class="solution-approach">
          ${sol.approach}
        </p>

        ${sol.evidenceUrl ? `
          <div>
            <a href="${sol.evidenceUrl}" target="_blank" rel="noopener noreferrer" class="solution-evidence-link">
              🔗 Evidence / Prototype Link (${sol.evidenceUrl.replace(/^https?:\/\//, '').slice(0, 32)}...)
            </a>
          </div>
        ` : ''}

        ${sol.expertNotes ? `
          <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 1rem; font-size: 0.8125rem; color: #6B21A8;">
            <strong>Expert Feedback Note:</strong> ${sol.expertNotes}
          </div>
        ` : ''}

        <!-- Solution Helpfulness Vote Bar -->
        <div class="solution-vote-bar">
          <div class="vote-actions">
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-right: 0.25rem;">Helpfulness:</span>
            <button class="vote-btn ${userVote === 'helpful' ? 'voted' : ''}" data-solution-id="${sol.id}" data-vote-type="helpful">
              👍 Helpful (${votes.helpful || 0})
            </button>
            <button class="vote-btn ${userVote === 'needsWork' ? 'voted' : ''}" data-solution-id="${sol.id}" data-vote-type="needsWork">
              🤔 Needs Work (${votes.needsWork || 0})
            </button>
            <button class="vote-btn ${userVote === 'canBuild' ? 'voted' : ''}" data-solution-id="${sol.id}" data-vote-type="canBuild">
              🛠️ I Can Build This (${votes.canBuild || 0})
            </button>
          </div>
          <span class="trust-disclaimer-pill">Community feedback</span>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // 4. Post a Problem View
  // ------------------------------------------------------------------------
  renderPostProblem() {
    this.app.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Share Lived Experience</span>
          <h1 class="section-title">Post a Real-World Problem</h1>
          <p class="section-subtitle">
            Describe a persistent friction, barrier, or inefficiency you experience. Problem-solvers, students, and research labs look here for real issues to solve.
          </p>
        </div>

        <div class="post-form-grid">
          <!-- Form Left Column -->
          <form id="post-problem-form" class="detail-card" novalidate>
            <div class="form-group" id="group-title">
              <label class="form-label" for="problem-title">
                Problem Title <span class="required">*</span>
              </label>
              <input 
                type="text" 
                id="problem-title" 
                class="form-input" 
                placeholder="Clear, specific title (e.g., Pedestrian blind-spot at station entrance)" 
                required 
                minlength="10"
              />
              <div class="form-hint">Summarize the core obstacle in one direct sentence.</div>
              <div class="form-error">Please provide a descriptive title (at least 10 characters).</div>
            </div>

            <!-- Simulated AI Category Suggester Box -->
            <div class="ai-category-box">
              <div class="ai-category-info">
                <strong>✨ Simulated AI Category Assistant:</strong>
                <span>Type your description below, then click to auto-suggest the best category.</span>
              </div>
              <button type="button" id="suggest-category-btn" class="btn btn-outline-green btn-sm">
                Suggest Category
              </button>
            </div>

            <div class="form-group" id="group-category">
              <label class="form-label" for="problem-category">
                Category <span class="required">*</span>
              </label>
              <select id="problem-category" class="form-select" required>
                <option value="">Select an impact category...</option>
                ${CATEGORIES.filter(c => c !== 'All').map(c => `
                  <option value="${c}">${c}</option>
                `).join('')}
              </select>
              <div class="form-error">Please choose a category.</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label" for="problem-frequency">How often does this occur?</label>
                <select id="problem-frequency" class="form-select">
                  <option value="Daily">Daily</option>
                  <option value="Weekly" selected>Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Seasonal / Occasional">Seasonal / Occasional</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="problem-impact">Perceived Impact Severity</label>
                <select id="problem-impact" class="form-select">
                  <option value="Low">Low (Inconvenience)</option>
                  <option value="Moderate" selected>Moderate (Significant friction)</option>
                  <option value="High">High (Major safety / time / cost impact)</option>
                  <option value="Critical">Critical (Dangerous / Health threat)</option>
                </select>
              </div>
            </div>

            <div class="form-group" id="group-description">
              <label class="form-label" for="problem-description">
                Problem Description <span class="required">*</span>
              </label>
              <textarea 
                id="problem-description" 
                class="form-textarea" 
                placeholder="Explain what happens, where it happens, and why existing workarounds fall short..." 
                rows="5" 
                required 
                minlength="25"
              ></textarea>
              <div class="form-hint">Explain the real-world consequence. Be specific about physical or practical conditions.</div>
              <div class="form-error">Please explain the problem with sufficient detail (at least 25 characters).</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="problem-context">Who is affected / Additional Context (Optional)</label>
              <textarea 
                id="problem-context" 
                class="form-textarea" 
                placeholder="e.g., Affects night-shift nursing staff, students carrying heavy lab gear, or elderly residents..." 
                rows="3"
              ></textarea>
            </div>

            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 1rem; margin-top: 1.5rem; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
              <a href="#/explore" class="btn btn-secondary">Cancel</a>
              <button type="submit" class="btn btn-primary btn-lg">Publish Problem to Feed</button>
            </div>
          </form>

          <!-- Live Card Preview Column -->
          <div class="preview-sticky-box">
            <div style="font-size: 0.8125rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
              Live Feed Card Preview
            </div>
            <div class="problem-card" style="cursor: default;">
              <div class="problem-card-header">
                <span id="preview-category" class="badge badge-category">Category</span>
                <span class="badge badge-open">Open</span>
              </div>
              <h3 id="preview-title" class="problem-title" style="color: var(--brand-inno);">
                Problem title will appear here...
              </h3>
              <p id="preview-desc" class="problem-excerpt">
                Your detailed description will be previewed here in real-time as you type...
              </p>
              <div class="problem-meta-row">
                <span id="preview-impact" class="badge badge-impact-medium">Moderate Impact</span>
                <span id="preview-freq" style="font-size: 0.75rem; color: var(--text-muted);">• Occurs: Weekly</span>
              </div>
              <div class="problem-card-footer">
                <div class="problem-stats">
                  <span class="stat-item">🙌 <strong>1</strong> support</span>
                  <span class="stat-item">💡 <strong>0</strong> solutions</span>
                </div>
                <span style="font-size: 0.75rem; color: var(--brand-link); font-weight: 600;">Preview State</span>
              </div>
            </div>

            <div style="margin-top: 1.25rem; padding: 1rem; background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--text-secondary);">
              <strong>Notice:</strong> Your post will be visible to students, researchers, and mentors. Do not share confidential organizational data or private medical information.
            </div>
          </div>
        </div>
      </div>
    `;

    // Live preview bindings
    const titleInput = this.app.querySelector('#problem-title');
    const descInput = this.app.querySelector('#problem-description');
    const catInput = this.app.querySelector('#problem-category');
    const impactInput = this.app.querySelector('#problem-impact');
    const freqInput = this.app.querySelector('#problem-frequency');

    const pTitle = this.app.querySelector('#preview-title');
    const pDesc = this.app.querySelector('#preview-desc');
    const pCat = this.app.querySelector('#preview-category');
    const pImpact = this.app.querySelector('#preview-impact');
    const pFreq = this.app.querySelector('#preview-freq');

    titleInput.addEventListener('input', () => {
      pTitle.textContent = titleInput.value.trim() || "Problem title will appear here...";
    });
    descInput.addEventListener('input', () => {
      pDesc.textContent = descInput.value.trim() || "Your detailed description will be previewed here in real-time as you type...";
    });
    catInput.addEventListener('change', () => {
      pCat.textContent = catInput.value || "Category";
    });
    impactInput.addEventListener('change', () => {
      pImpact.textContent = `${impactInput.value} Impact`;
      pImpact.className = `badge ${this.getImpactBadgeClass(impactInput.value)}`;
    });
    freqInput.addEventListener('change', () => {
      pFreq.textContent = `• Occurs: ${freqInput.value}`;
    });

    // Simulated AI Category Suggester button
    const suggestBtn = this.app.querySelector('#suggest-category-btn');
    suggestBtn.addEventListener('click', () => {
      const text = (titleInput.value + " " + descInput.value).toLowerCase();
      let suggested = "Everyday Living";

      if (text.includes("hospital") || text.includes("nurse") || text.includes("pill") || text.includes("medication") || text.includes("patient") || text.includes("vision") || text.includes("health")) {
        suggested = "Healthcare & Accessibility";
      } else if (text.includes("student") || text.includes("campus") || text.includes("lab") || text.includes("research") || text.includes("course") || text.includes("professor")) {
        suggested = "Campus & Academic Life";
      } else if (text.includes("transit") || text.includes("road") || text.includes("pedestrian") || text.includes("bus") || text.includes("pipe") || text.includes("city") || text.includes("sidewalk")) {
        suggested = "Urban & Civic Tech";
      } else if (text.includes("plastic") || text.includes("waste") || text.includes("water") || text.includes("recycle") || text.includes("solar") || text.includes("energy")) {
        suggested = "Environmental Sustainability";
      } else if (text.includes("team") || text.includes("slack") || text.includes("remote") || text.includes("meeting") || text.includes("software") || text.includes("doc")) {
        suggested = "Workplace & Productivity";
      }

      catInput.value = suggested;
      pCat.textContent = suggested;
      this.showToast(`✨ AI Assistant suggested category: "${suggested}" (Demo)`, "info");
    });

    // Form Submission with validation
    const form = this.app.querySelector('#post-problem-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Validate title
      const grpTitle = this.app.querySelector('#group-title');
      if (titleInput.value.trim().length < 10) {
        grpTitle.classList.add('has-error');
        valid = false;
      } else {
        grpTitle.classList.remove('has-error');
      }

      // Validate category
      const grpCat = this.app.querySelector('#group-category');
      if (!catInput.value) {
        grpCat.classList.add('has-error');
        valid = false;
      } else {
        grpCat.classList.remove('has-error');
      }

      // Validate description
      const grpDesc = this.app.querySelector('#group-description');
      if (descInput.value.trim().length < 25) {
        grpDesc.classList.add('has-error');
        valid = false;
      } else {
        grpDesc.classList.remove('has-error');
      }

      if (!valid) return;

      const created = state.addProblem({
        title: titleInput.value,
        category: catInput.value,
        frequency: freqInput.value,
        impactLevel: impactInput.value,
        description: descInput.value,
        context: this.app.querySelector('#problem-context').value
      });

      this.showToast("Problem published successfully!", "success");
      window.location.hash = `#/problem/${created.id}`;
    });
  }

  // ------------------------------------------------------------------------
  // 5. How It Works & Trust Guidelines View
  // ------------------------------------------------------------------------
  renderHowItWorks() {
    this.app.innerHTML = `
      <div class="container" style="max-width: 900px;">
        <div class="section-header">
          <span class="section-eyebrow">Platform Guidelines</span>
          <h1 class="section-title">How InnoLink Works & Trust Policy</h1>
          <p class="section-subtitle">
            InnoLink surfaces overlooked real-world problems and connects them with motivated problem-solvers. Read how we distinguish community sentiment from technical validation.
          </p>
        </div>

        <!-- 4 Steps Flow -->
        <div class="detail-card" style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1.25rem;">The Innovation Lifecycle</h2>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;">
            <div style="text-align: center; padding: 1rem; background: var(--bg-muted); border-radius: var(--radius-md);">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">1️⃣</div>
              <strong style="display: block; font-size: 0.875rem;">1. Post Problem</strong>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">People with lived experience share persistent frictions.</span>
            </div>
            <div style="text-align: center; padding: 1rem; background: var(--bg-muted); border-radius: var(--radius-md);">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">2️⃣</div>
              <strong style="display: block; font-size: 0.875rem;">2. Community Signal</strong>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">Peers indicate shared experience ("I experience this too").</span>
            </div>
            <div style="text-align: center; padding: 1rem; background: var(--bg-muted); border-radius: var(--radius-md);">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">3️⃣</div>
              <strong style="display: block; font-size: 0.875rem;">3. Solution Proposals</strong>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">Students and makers propose prototypes and evidence links.</span>
            </div>
            <div style="text-align: center; padding: 1rem; background: var(--bg-muted); border-radius: var(--radius-md);">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">4️⃣</div>
              <strong style="display: block; font-size: 0.875rem;">4. Expert Review</strong>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">Domain mentors evaluate safety and feasibility claims.</span>
            </div>
          </div>
        </div>

        <!-- Trust Comparison Table -->
        <div class="detail-card" style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
            Community Support vs. Expert Validation
          </h2>
          <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            To maintain safety and credibility, InnoLink explicitly separates subjective community enthusiasm from rigorous technical validation.
          </p>

          <div class="comparison-table-wrapper">
            <table class="trust-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>Community Feedback (Voting)</th>
                  <th>Expert / Validator Review</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>What it proves</strong></td>
                  <td>Indicates perceived relevance, shared pain, and user interest.</td>
                  <td>Confirms scientific feasibility, safety boundaries, and engineering soundness.</td>
                </tr>
                <tr>
                  <td><strong>Who participates</strong></td>
                  <td>Any registered student, community member, or problem poster.</td>
                  <td>Verified domain faculty, licensed engineers, medical advisors, or mentors.</td>
                </tr>
                <tr>
                  <td><strong>Visual Badge</strong></td>
                  <td><span class="badge" style="background: var(--bg-muted); color: var(--text-muted);">Community Submitted</span></td>
                  <td><span class="badge" style="background: #F3E8FF; color: #7C3AED; border: 1px solid #D8B4FE;">✓ Expert Reviewed</span></td>
                </tr>
                <tr>
                  <td><strong>Guarantees</strong></td>
                  <td>None. Votes do NOT guarantee that a solution works or is safe.</td>
                  <td>Subject to formal testing notes, methodology audit, and documented boundaries.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Intellectual Property & Content Safety -->
        <div class="detail-card">
          <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">Intellectual Property & Safety Rules</h2>
          <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">
            <p>
              <strong>1. IP Rights:</strong> Posting a problem or proposing a solution on InnoLink does not in itself constitute a patent filing or settle intellectual property ownership. Collaborative agreements, patents, and commercial licensing must be executed independently between the involved parties under applicable legal frameworks.
            </p>
            <p>
              <strong>2. No Confidential or Medical Data:</strong> Do not post proprietary employer code, confidential trade secrets, or personally identifiable patient health information.
            </p>
            <p>
              <strong>3. Product Principle:</strong> InnoLink surfaces problems and connects talent; it cannot guarantee that every posted problem will find a viable solution.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // 6. Roadmap & Preview View
  // ------------------------------------------------------------------------
  renderRoadmap() {
    this.app.innerHTML = `
      <div class="container" style="max-width: 900px;">
        <div class="section-header">
          <span class="section-eyebrow">Future Vision</span>
          <h1 class="section-title">InnoLink Platform Roadmap</h1>
          <p class="section-subtitle">
            Preview of upcoming capabilities being designed following our prototype usability testing.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div class="detail-card">
            <span class="badge" style="background: #F5F3FF; color: #7C3AED; margin-bottom: 0.75rem;">Phase 2 Preview</span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Verified Expert Review & Academic Mentorship Network
            </h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
              Faculty members, patent attorneys, and industry specialists can claim problems in their domain to provide technical vetting, laboratory access credentials, and co-authorship mentorship for promising student prototypes.
            </p>
            <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1rem; font-size: 0.8125rem;">
              <strong>Upcoming Features:</strong> Academic institutional SSO (ORCID / EduPerson), peer review rubrics, lab equipment reservation pass, and verified validator profile badges.
            </div>
          </div>

          <div class="detail-card">
            <span class="badge badge-bounty" style="margin-bottom: 0.75rem;">Phase 2 Preview</span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
              Organization Innovation Portal & Prize Escrow
            </h3>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
              Companies, NGOs, and municipal councils will be able to launch custom challenge sprints, fund escrow prize pools, and establish transparent IP co-development agreements with student teams.
            </p>
            <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1rem; font-size: 0.8125rem;">
              <strong>Upcoming Features:</strong> Transparent smart escrow funding, legal challenge templates, NDA-safe sandboxes, and milestone-based grant disbursements.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // Modals & Interactive Overlays
  // ------------------------------------------------------------------------
  openChallengeModal(challengeId) {
    const ch = state.getSponsoredChallengeById(challengeId);
    if (!ch) return;

    let overlay = document.getElementById('app-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'app-modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="badge badge-bounty">${ch.bountyAmount} Bounty</span>
              <span class="badge badge-category">${ch.category}</span>
            </div>
            <h3 class="modal-title">${ch.title}</h3>
          </div>
          <button id="modal-close-x" class="modal-close-btn">&times;</button>
        </div>

        <div class="modal-body">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--bg-muted); border-radius: var(--radius-md); margin-bottom: 1.25rem;">
            <div>
              <span style="font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Challenge Sponsor</span>
              <div style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary);">${ch.sponsorName} (${ch.sponsorType})</div>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.6875rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Submission Deadline</span>
              <div style="font-size: 0.875rem; font-weight: 700; color: var(--bounty-gold);">${ch.deadline} (${ch.daysLeft} days left)</div>
            </div>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">Problem Background</h4>
            <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">${ch.details}</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Technical & Submission Requirements</h4>
            <ul style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.6; padding-left: 1.25rem;">
              ${ch.requirements.map(r => `<li><strong>${r}</strong></li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Evaluation Criteria</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
              ${ch.evaluationCriteria.map(ec => `
                <div style="background: var(--bg-muted); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.75rem; display: flex; justify-content: space-between;">
                  <span>${ec.label}</span>
                  <strong>${ec.weight}</strong>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 0.875rem; font-size: 0.75rem; color: #92400E;">
            <strong>Prototype Demo Notice:</strong> This is a sample sponsored challenge illustrating how organization-funded problems and bounty criteria are presented on InnoLink.
          </div>
        </div>

        <div class="modal-footer">
          <button id="modal-close-footer" class="btn btn-secondary">Close</button>
          <button id="challenge-express-interest-btn" class="btn btn-green">
            Submit Solution / Express Interest
          </button>
        </div>
      </div>
    `;

    overlay.classList.add('open');

    const closeModal = () => {
      overlay.classList.remove('open');
    };

    overlay.querySelector('#modal-close-x').addEventListener('click', closeModal);
    overlay.querySelector('#modal-close-footer').addEventListener('click', closeModal);
    overlay.querySelector('#challenge-express-interest-btn').addEventListener('click', () => {
      closeModal();
      this.showToast(`Interest registered for ${ch.sponsorName} challenge! (Demo)`, 'success');
    });
  }

  openProposeSolutionModal(problemId) {
    const problem = state.getProblemById(problemId);
    if (!problem) return;

    let overlay = document.getElementById('app-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'app-modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Propose Solution for:</span>
            <h3 class="modal-title" style="font-size: 1.125rem;">${problem.title}</h3>
          </div>
          <button id="modal-close-x" class="modal-close-btn">&times;</button>
        </div>

        <form id="propose-solution-form">
          <div class="modal-body">
            <div class="form-group" id="grp-sol-title">
              <label class="form-label" for="sol-title">Solution Headline / Title <span class="required">*</span></label>
              <input type="text" id="sol-title" class="form-input" placeholder="e.g., Low-cost ultrasonic sensor with haptic feedback" required minlength="8" />
              <div class="form-error">Please provide a solution title (at least 8 chars).</div>
            </div>

            <div class="form-group" id="grp-sol-approach">
              <label class="form-label" for="sol-approach">Proposed Approach & Methodology <span class="required">*</span></label>
              <textarea id="sol-approach" class="form-textarea" placeholder="Detail the technical or practical concept, key components, and how it directly solves the problem..." rows="4" required minlength="25"></textarea>
              <div class="form-error">Please provide detailed methodology (at least 25 chars).</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="sol-evidence">Evidence / Prototype Link (Optional)</label>
              <input type="url" id="sol-evidence" class="form-input" placeholder="https://github.com/your-repo or research paper link" />
              <div class="form-hint">Link to relevant documentation, open hardware CAD, bench test results, or prior publications.</div>
            </div>

            <div class="form-group">
              <label class="form-label" for="sol-author-role">Your Role / Background</label>
              <input type="text" id="sol-author-role" class="form-input" placeholder="e.g. Electrical Engineering Student, Assistive Tech Maker" />
            </div>

            <div style="background: var(--bg-muted); border-radius: var(--radius-sm); padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary);">
              <strong>Note on IP:</strong> Submitted concepts will be marked as "Community Proposed". Posting on InnoLink does not establish a patent or settle intellectual property rights.
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" id="modal-cancel-btn" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-green">Submit Solution</button>
          </div>
        </form>
      </div>
    `;

    overlay.classList.add('open');

    const closeModal = () => {
      overlay.classList.remove('open');
    };

    overlay.querySelector('#modal-close-x').addEventListener('click', closeModal);
    overlay.querySelector('#modal-cancel-btn').addEventListener('click', closeModal);

    const form = overlay.querySelector('#propose-solution-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = overlay.querySelector('#sol-title').value.trim();
      const approach = overlay.querySelector('#sol-approach').value.trim();
      const evidence = overlay.querySelector('#sol-evidence').value.trim();
      const role = overlay.querySelector('#sol-author-role').value.trim();

      if (title.length < 8 || approach.length < 25) {
        if (title.length < 8) overlay.querySelector('#grp-sol-title').classList.add('has-error');
        if (approach.length < 25) overlay.querySelector('#grp-sol-approach').classList.add('has-error');
        return;
      }

      state.addSolution(problemId, {
        title,
        approach,
        evidenceUrl: evidence,
        authorRole: role || undefined
      });

      closeModal();
      this.renderDetail(problemId);
      this.showToast("Your solution was proposed successfully!", "success");
    });
  }

  // ------------------------------------------------------------------------
  // 7. Usability Tester Hub Drawer (Section 8)
  // ------------------------------------------------------------------------
  initTesterHub() {
    // Floating Trigger Button
    let btn = document.getElementById('tester-hub-toggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'tester-hub-toggle';
      btn.className = 'tester-toggle-btn';
      btn.innerHTML = `
        <span>🧪</span>
        <span>Usability Tester Hub</span>
      `;
      document.body.appendChild(btn);
    }

    // Drawer Container
    let drawer = document.getElementById('tester-hub-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'tester-hub-drawer';
      drawer.className = 'tester-drawer';
      document.body.appendChild(drawer);
    }

    const renderDrawerContent = () => {
      const completed = state.getCompletedTasks();
      const feedbackList = state.getTesterFeedback();
      const likedCount = feedbackList.filter(f => f.sentiment === 'liked').length;
      const neutralCount = feedbackList.filter(f => f.sentiment === 'neutral_unhappy').length;

      drawer.innerHTML = `
        <div class="tester-drawer-header">
          <div>
            <div style="font-size: 0.6875rem; text-transform: uppercase; color: var(--brand-link); font-weight: 700;">Section 8 Validation Plan</div>
            <h3 style="font-size: 1.125rem; font-weight: 700; margin: 0;">Usability Testing Hub</h3>
          </div>
          <button id="close-tester-drawer" style="background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
        </div>

        <div class="tester-drawer-body">
          <!-- Tasks Checklist -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.875rem; font-weight: 700; margin-bottom: 0.25rem;">
              Participant Tasks (${completed.length}/5 Completed)
            </h4>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Ask participants to complete each task without coaching:
            </p>

            ${VALIDATION_TASKS.map(task => {
              const isDone = completed.includes(task.id);
              return `
                <div class="task-checklist-item ${isDone ? 'done' : ''}">
                  <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${isDone ? 'checked' : ''} />
                  <div style="font-size: 0.8125rem;">
                    <strong>Task ${task.id}:</strong> ${task.title}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Post-Test Survey Form -->
          <div style="border-top: 1px solid var(--border-light); padding-top: 1.25rem; margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.875rem; font-weight: 700; margin-bottom: 0.25rem;">Record Test Results</h4>
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
              Record participant impressions following the tasks:
            </p>

            <form id="tester-feedback-form">
              <div class="form-group">
                <label class="form-label" style="font-size: 0.75rem;">Overall Impression</label>
                <div style="display: flex; gap: 0.5rem;">
                  <label style="font-size: 0.8125rem; display: flex; align-items: center; gap: 0.25rem;">
                    <input type="radio" name="sentiment" value="liked" required /> Liked / Loved
                  </label>
                  <label style="font-size: 0.8125rem; display: flex; align-items: center; gap: 0.25rem;">
                    <input type="radio" name="sentiment" value="neutral_unhappy" required /> Neutral / Unhappy
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="fb-useful" style="font-size: 0.75rem;">What was most useful or appealing?</label>
                <input type="text" id="fb-useful" class="form-input" style="font-size: 0.8125rem; padding: 0.4rem 0.6rem;" placeholder="e.g. Real problems, clear sponsored bounties..." />
              </div>

              <div class="form-group">
                <label class="form-label" for="fb-confusing" style="font-size: 0.75rem;">What was confusing or difficult?</label>
                <input type="text" id="fb-confusing" class="form-input" style="font-size: 0.8125rem; padding: 0.4rem 0.6rem;" placeholder="e.g. Difference between votes and validation..." />
              </div>

              <div class="form-group">
                <label class="form-label" for="fb-feature" style="font-size: 0.75rem;">One feature they would most want added?</label>
                <input type="text" id="fb-feature" class="form-input" style="font-size: 0.8125rem; padding: 0.4rem 0.6rem;" placeholder="e.g. Chat with problem poster, team matching..." />
              </div>

              <button type="submit" class="btn btn-primary btn-sm" style="width: 100%;">
                Log Usability Test Record
              </button>
            </form>
          </div>

          <!-- Logged Results Summary -->
          <div style="border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <h4 style="font-size: 0.875rem; font-weight: 700;">Recorded Tests (${feedbackList.length})</h4>
              <button id="reset-test-data-btn" class="btn btn-subtle btn-sm" style="font-size: 0.6875rem; color: var(--impact-critical);">
                Reset Data
              </button>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--radius-sm); padding: 0.5rem; text-align: center;">
                <div style="font-size: 1.25rem; font-weight: 800; color: #047857;">${likedCount}</div>
                <div style="font-size: 0.6875rem; color: #065F46;">Liked / Loved</div>
              </div>
              <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-sm); padding: 0.5rem; text-align: center;">
                <div style="font-size: 1.25rem; font-weight: 800; color: #B45309;">${neutralCount}</div>
                <div style="font-size: 0.6875rem; color: #92400E;">Neutral / Unhappy</div>
              </div>
            </div>

            <div style="max-height: 180px; overflow-y: auto; font-size: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
              ${feedbackList.map((fb, idx) => `
                <div style="background: var(--bg-muted); border-radius: var(--radius-sm); padding: 0.5rem;">
                  <div style="display: flex; justify-content: space-between; font-weight: 600;">
                    <span>Participant #${idx + 1} (${fb.sentiment === 'liked' ? '👍 Liked' : '😐 Neutral'})</span>
                    <span style="color: var(--text-muted); font-size: 0.6875rem;">${fb.completedTaskCount}/5 tasks</span>
                  </div>
                  ${fb.useful ? `<div style="color: var(--text-secondary); margin-top: 0.2rem;">+ ${fb.useful}</div>` : ''}
                  ${fb.confusing ? `<div style="color: var(--impact-critical); margin-top: 0.1rem;">! ${fb.confusing}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      // Drawer close button
      drawer.querySelector('#close-tester-drawer').addEventListener('click', () => {
        drawer.classList.remove('open');
      });

      // Task checkboxes
      drawer.querySelectorAll('.task-checkbox').forEach(cb => {
        cb.addEventListener('change', () => {
          const taskId = parseInt(cb.getAttribute('data-task-id'), 10);
          state.toggleTaskCompleted(taskId);
          renderDrawerContent();
        });
      });

      // Feedback form
      const fbForm = drawer.querySelector('#tester-feedback-form');
      fbForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sentiment = fbForm.querySelector('input[name="sentiment"]:checked')?.value;
        const useful = fbForm.querySelector('#fb-useful').value;
        const confusing = fbForm.querySelector('#fb-confusing').value;
        const feature = fbForm.querySelector('#fb-feature').value;

        state.saveTesterFeedback({
          sentiment,
          useful,
          confusing,
          feature
        });

        this.showToast("Test result recorded!", "success");
        renderDrawerContent();
      });

      // Reset data
      drawer.querySelector('#reset-test-data-btn').addEventListener('click', () => {
        if (confirm("Reset prototype sample data and recorded test feedback to initial state?")) {
          state.resetAllData();
          this.showToast("Data reset to defaults.", "info");
          renderDrawerContent();
          window.location.reload();
        }
      });
    };

    btn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      if (drawer.classList.contains('open')) {
        renderDrawerContent();
      }
    });
  }
}

