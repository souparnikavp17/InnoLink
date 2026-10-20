/* ==========================================================================
   InnoLink UI Renderers & Component Views — Modern, High-Legibility
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
  // Removed "Real Problems, Real Solvers" banner at the beginning as requested
  // Community Problems FIRST, Innovation Challenges AFTER
  // ------------------------------------------------------------------------
  renderLanding() {
    const problems = state.getProblems();
    const challenges = state.getSponsoredChallenges();

    this.app.innerHTML = `
      <!-- Hero Section (Clean & Direct) -->
      <section class="hero-section">
        <div class="hero-container">
          <h1 class="hero-title">
            Where Overlooked Problems Meet <br>
            <span class="hero-title-highlight">Creative Problem-Solvers</span>
          </h1>
          <p class="hero-subtitle">
            People know the problems. Problem-solvers bring the expertise. InnoLink connects lived experience with students, researchers, and innovators ready to build real solutions.
          </p>
          <div class="hero-actions">
            <a href="#/post" class="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Post a Problem
            </a>
            <a href="#/explore" class="btn btn-secondary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              Explore Problems
            </a>
            <a href="#/how-it-works" class="btn btn-subtle btn-lg">
              How It Works & Trust →
            </a>
          </div>

          <div class="hero-stats-row">
            <div class="hero-stat-card">
              <div class="hero-stat-num">${problems.length}</div>
              <div class="hero-stat-label">Active Problems</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">${CATEGORIES.length - 1}</div>
              <div class="hero-stat-label">Impact Categories</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">${challenges.length}</div>
              <div class="hero-stat-label">Funded Challenges</div>
            </div>
            <div class="hero-stat-card">
              <div class="hero-stat-num">₹31.5 Lakhs</div>
              <div class="hero-stat-label">Award Bounties</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Roles & Value Propositions -->
      <section class="container" style="padding-top: 4rem; padding-bottom: 2rem;">
        <div class="section-header" style="text-align: center;">
          <span class="section-eyebrow">Who InnoLink Is Built For</span>
          <h2 class="section-title">Built for Everyone Who Touches Innovation</h2>
          <p class="section-subtitle" style="margin: 0.75rem auto 0;">Whether you have encountered a daily friction point or have the tools to build a prototype, there is a role for you.</p>
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

      <!-- 1. COMMUNITY PROBLEMS SECTION FIRST -->
      <section class="container" style="padding-top: 3.5rem; padding-bottom: 4rem;">
        <div style="display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <span class="section-eyebrow">Community Problems</span>
            <h2 class="section-title">Real-World Needs</h2>
            <p class="section-subtitle">Real problems highlighted directly by people experiencing them.</p>
          </div>
          <a href="#/explore" class="btn btn-secondary btn-lg">
            View All ${problems.length} Problems →
          </a>
        </div>

        <div class="problems-grid">
          ${problems.slice(0, 3).map(p => this.renderProblemCardHtml(p)).join('')}
        </div>
      </section>

      <!-- 2. INNOVATION CHALLENGES AFTER IT -->
      <section class="sponsored-section">
        <div class="container">
          <div class="sponsored-header-row">
            <div>
              <span class="section-eyebrow" style="color: var(--bounty-gold);">Funded Innovation Challenges</span>
              <h2 class="section-title">Sponsored Innovation Challenges</h2>
              <p class="section-subtitle">
                High-priority problems funded by foundations, research laboratories, and civic bodies with confirmed bounties. Click any challenge box to explore full requirements.
              </p>
            </div>
            <div>
              <span class="badge badge-bounty">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Verified Cash Bounties
              </span>
            </div>
          </div>

          <div class="challenge-grid">
            ${challenges.map(ch => `
              <a href="#/challenge/${ch.id}" class="challenge-card-box" aria-label="View ${ch.title}">
                <div class="challenge-sponsor-bar">
                  <div class="sponsor-meta">
                    <div class="sponsor-avatar">${ch.sponsorAvatar}</div>
                    <div>
                      <div class="sponsor-name">${ch.sponsorName}</div>
                      <div class="sponsor-type">${ch.sponsorType}</div>
                      <span class="badge badge-category" style="margin-top:0.4rem; display:inline-block;">${ch.category}</span>
                    </div>
                  </div>
                </div>

                <div class="challenge-bounty-box">
                  <div>
                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); display: block; font-weight: 800;">Award Bounty</span>
                    <span class="bounty-amount">${ch.bountyAmount}</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); display: block; font-weight: 800;">Deadline</span>
                    <span class="bounty-deadline">${ch.daysLeft} days left</span>
                  </div>
                </div>

                <h3 class="challenge-title">${ch.title}</h3>
                <p class="challenge-desc">${ch.problemSummary}</p>

                <div class="challenge-reqs-preview">
                  <strong>Key Deliverable:</strong>
                  <span>${ch.requirements[0]}</span>
                </div>

                <div class="challenge-footer">
                  <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Due ${ch.deadline}</span>
                  <span style="font-size: 0.95rem; font-weight: 700; color: var(--brand-inno); display: inline-flex; align-items: center; gap: 0.35rem;">
                    View Challenge Page →
                  </span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  // ------------------------------------------------------------------------
  // 2. Dedicated Sponsored Challenge Detail Page
  // ------------------------------------------------------------------------
  renderChallengeDetail(challengeId) {
    const ch = state.getSponsoredChallengeById(challengeId);
    if (!ch) {
      this.app.innerHTML = `
        <div class="container" style="text-align: center; padding: 4rem 1rem;">
          <h2>Challenge Not Found</h2>
          <p style="color: var(--text-secondary); margin: 1rem 0;">The sponsored challenge you are looking for does not exist.</p>
          <a href="#/" class="btn btn-primary">Back to Home</a>
        </div>
      `;
      return;
    }

    this.app.innerHTML = `
      <div class="container">
        <!-- Breadcrumbs -->
        <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 0.65rem; font-size: 0.95rem; color: var(--text-muted);">
          <a href="#/" style="color: var(--text-secondary); text-decoration: none; font-weight: 600;">← Back to Home</a>
          <span>/</span>
          <span>Sponsored Challenges</span>
          <span>/</span>
          <span style="color: var(--text-primary); font-weight: 700;">${ch.category}</span>
        </div>

        <!-- Challenge Hero Card -->
        <div class="challenge-detail-hero">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
              <div class="sponsor-avatar" style="width: 52px; height: 52px; font-size: 1.25rem;">${ch.sponsorAvatar}</div>
              <div>
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">${ch.sponsorName}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${ch.sponsorType}</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span class="badge badge-category">${ch.category}</span>
              <span class="badge badge-bounty">${ch.bountyAmount} Bounty</span>
            </div>
          </div>

          <h1 class="detail-title" style="margin-bottom: 1rem;">${ch.title}</h1>

          <div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap; padding: 1.25rem 1.5rem; background: var(--bounty-gradient); border: 1.5px solid var(--bounty-gold-border); border-radius: var(--radius-lg); margin-top: 1.5rem;">
            <div>
              <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted); display: block;">Prize Allocation</span>
              <strong style="font-size: 1.15rem; color: var(--bounty-gold);">${ch.bountyNote}</strong>
            </div>
            <div style="border-left: 1.5px solid rgba(180, 83, 9, 0.2); padding-left: 2rem;">
              <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted); display: block;">Submission Deadline</span>
              <strong style="font-size: 1.15rem; color: var(--text-primary);">${ch.deadline} (${ch.daysLeft} days remaining)</strong>
            </div>
          </div>
        </div>

        <div class="challenge-detail-grid">
          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div class="detail-card">
              <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">Problem Context & Motivation</h2>
              <p style="font-size: 1.1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.25rem;">
                ${ch.details}
              </p>
              <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1.25rem; font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">
                <strong style="color: var(--text-primary); display: block; margin-bottom: 0.35rem;">Direct Real-World Impact:</strong>
                ${ch.problemSummary}
              </div>
            </div>

            <div class="detail-card">
              <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">Technical & Submission Requirements</h2>
              <ul style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                ${ch.requirements.map(req => `<li><strong>${req}</strong></li>`).join('')}
              </ul>
            </div>

            <div class="detail-card">
              <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">Evaluation Criteria</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                ${ch.evaluationCriteria.map(ec => `
                  <div style="background: var(--bg-muted); border: 1.5px solid var(--border-light); padding: 1rem 1.25rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
                    <span style="font-weight: 600; font-size: 1rem;">${ec.label}</span>
                    <strong style="font-size: 1.25rem; color: var(--brand-inno);">${ec.weight}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div class="detail-card" style="background: var(--brand-inno-subtle); border-color: rgba(45, 46, 142, 0.2);">
              <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--brand-inno);">Ready to Submit?</h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
                Express interest or submit your technical proposal directly to the sponsor review panel.
              </p>
              <form id="challenge-submit-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                  <label class="form-label" style="font-size: 0.9rem;" for="sub-team">Team / Innovator Name</label>
                  <input type="text" id="sub-team" class="form-input" placeholder="e.g. BioSensor Labs, Sarah & Dev" required />
                </div>
                <div>
                  <label class="form-label" style="font-size: 0.9rem;" for="sub-link">Prototype / Pitch Link</label>
                  <input type="url" id="sub-link" class="form-input" placeholder="https://github.com/..." required />
                </div>
                <button type="submit" class="btn btn-green btn-lg" style="width: 100%;">
                  Submit Proposal
                </button>
              </form>
            </div>

            <div class="detail-card">
              <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem;">Eligibility Guidelines</h3>
              <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                ${ch.eligibility}
              </p>
              <div style="font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border-light); padding-top: 0.75rem;">
                Have questions about specs? <a href="#/how-it-works" style="color: var(--brand-inno); font-weight: 700;">Review challenge policies →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const form = this.app.querySelector('#challenge-submit-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const team = this.app.querySelector('#sub-team').value;
        this.showToast(`Proposal successfully submitted for ${team}!`, 'success');
        form.reset();
      });
    }
  }

  // ------------------------------------------------------------------------
  // 3. Problem Card HTML — FIXED: No overlap with text!
  // ------------------------------------------------------------------------
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
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
            • Occurs: ${p.frequency || 'Regularly'}
          </span>
        </div>

        <div class="author-tag">
          <div class="author-avatar-sm">${p.author?.avatar || 'IN'}</div>
          <span>Posted by <strong>${p.author?.name || 'Community Member'}</strong></span>
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
        </div>
        <span class="card-view-btn">View Details →</span>
      </a>
    `;
  }

  // ------------------------------------------------------------------------
  // 4. Explore Feed View
  // ------------------------------------------------------------------------
  renderExplore(filters = {}) {
    const allProblems = state.getProblems();
    const activeCat = filters.category || 'All';
    const searchQuery = (filters.search || '').toLowerCase().trim();
    const activeStatus = filters.status || 'All';
    const activeSort = filters.sort || 'supported';

    let filtered = allProblems.filter(p => {
      const matchCat = (activeCat === 'All') || (p.category === activeCat);
      const matchStatus = (activeStatus === 'All') || (p.status === activeStatus);
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery);
      return matchCat && matchStatus && matchSearch;
    });

    if (activeSort === 'supported') {
      filtered.sort((a, b) => (b.supportedByCount || 0) - (a.supportedByCount || 0));
    } else if (activeSort === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeSort === 'solutions') {
      filtered.sort((a, b) => (b.solutions?.length || 0) - (a.solutions?.length || 0));
    }

    this.app.innerHTML = `
      <div class="container">
        <div class="section-header" style="display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <span class="section-eyebrow">Discover Needs</span>
            <h1 class="section-title">Explore Real-World Problems</h1>
            <p class="section-subtitle">Browse community problems, check validation stages, and find opportunities where your skills can make a difference.</p>
          </div>
          <a href="#/post" class="btn btn-primary btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Post a Problem
          </a>
        </div>

        <div class="explore-controls-box">
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

            <div style="font-size: 0.95rem; color: var(--text-muted); font-weight: 600;">
              Showing <strong>${filtered.length}</strong> of ${allProblems.length} problems
            </div>
          </div>
        </div>

        ${filtered.length > 0 ? `
          <div class="problems-grid">
            ${filtered.map(p => this.renderProblemCardHtml(p)).join('')}
          </div>
        ` : `
          <div style="background: white; border: 1.5px dashed var(--border-medium); border-radius: var(--radius-xl); padding: 5rem 2rem; text-align: center;">
            <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔎</div>
            <h3 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 0.5rem;">No matching problems found</h3>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 2rem; font-size: 1.05rem;">
              We couldn't find any problems matching your filter criteria. Try clearing filters or be the first to share this problem.
            </p>
            <a href="#/post" class="btn btn-primary btn-lg">Post This Problem</a>
          </div>
        `}
      </div>
    `;

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

  // ------------------------------------------------------------------------
  // 5. Problem Detail View
  // ------------------------------------------------------------------------
  renderDetail(problemId) {
    const problem = state.getProblemById(problemId);
    if (!problem) {
      this.app.innerHTML = `
        <div class="container" style="text-align: center; padding: 5rem 1rem;">
          <h2>Problem Not Found</h2>
          <p style="color: var(--text-secondary); margin: 1rem 0;">The problem you are looking for does not exist.</p>
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
        <div style="margin-bottom: 2rem; display: flex; align-items: center; gap: 0.65rem; font-size: 0.95rem; color: var(--text-muted);">
          <a href="#/explore" style="color: var(--text-secondary); text-decoration: none; font-weight: 600;">← Back to Problems</a>
          <span>/</span>
          <span>${problem.category}</span>
          <span>/</span>
          <span style="color: var(--text-primary); font-weight: 700;">Detail</span>
        </div>

        <div class="detail-layout">
          <div class="detail-main">
            <div class="detail-card">
              <div style="display: flex; align-items: center; gap: 0.85rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
                <span class="badge badge-category">${problem.category}</span>
                <span class="badge ${this.getStatusBadgeClass(problem.status)}">${problem.status}</span>
                <span class="badge ${this.getImpactBadgeClass(problem.impactLevel)}">${problem.impactLevel} Impact</span>
                <span style="font-size: 0.9rem; color: var(--text-muted); margin-left: auto;">Posted ${problem.createdAt}</span>
              </div>

              <h1 class="detail-title">${problem.title}</h1>

              <div class="author-tag" style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1.5px solid var(--border-light);">
                <div class="author-avatar-sm" style="width: 36px; height: 36px; font-size: 0.9rem;">${problem.author?.avatar || 'IN'}</div>
                <div>
                  <strong style="color: var(--text-primary); font-size: 1.05rem;">${problem.author?.name}</strong>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">${problem.author?.role}</div>
                </div>
              </div>

              <div style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem;">Problem Description</h3>
                <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.75;">
                  ${problem.description}
                </p>
              </div>

              ${problem.context ? `
                <div style="background: var(--bg-muted); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem; border: 1px solid var(--border-light);">
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">Additional Context & Lived Experience:</h4>
                  <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">
                    ${problem.context}
                  </p>
                </div>
              ` : ''}

              <div class="support-action-box">
                <div class="support-action-text">
                  <strong>Do you experience this problem too?</strong>
                  <span>Signal to problem-solvers and sponsors that this problem has widespread real-world impact.</span>
                </div>
                <button id="support-toggle-btn" class="btn ${isSupported ? 'support-btn supported' : 'btn-outline-inno support-btn'}">
                  <span>${isSupported ? '✓ You Supported This' : '🙌 I Experience This Too'}</span>
                  <span class="badge" style="background: rgba(0,0,0,0.12); color: inherit; font-size: 0.95rem;">${problem.supportedByCount || 0}</span>
                </button>
              </div>
            </div>

            <div class="detail-card">
              <div class="solutions-section-header">
                <div>
                  <h2 style="font-size: 1.55rem; font-weight: 900; color: var(--text-primary);">
                    Proposed Solutions (${solutions.length})
                  </h2>
                  <p style="font-size: 0.95rem; color: var(--text-muted);">
                    Community suggestions, prototypes, and open technical proposals.
                  </p>
                </div>
                <button id="open-propose-solution-btn" class="btn btn-green btn-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                  Propose a Solution
                </button>
              </div>

              ${solutions.length > 0 ? `
                <div class="solutions-list">
                  ${solutions.map(sol => this.renderSolutionCardHtml(problem.id, sol)).join('')}
                </div>
              ` : `
                <div style="border: 1.5px dashed var(--border-medium); border-radius: var(--radius-lg); padding: 3.5rem 2rem; text-align: center;">
                  <div style="font-size: 3rem; margin-bottom: 1rem;">💡</div>
                  <h4 style="font-size: 1.3rem; font-weight: 800; margin-bottom: 0.5rem;">No solutions proposed yet</h4>
                  <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 520px; margin: 0 auto 1.75rem;">
                    Have an idea, research background, or hardware/software concept to solve this? Be the first to share an approach!
                  </p>
                  <button class="btn btn-primary btn-lg" onclick="document.getElementById('open-propose-solution-btn').click()">
                    Propose the First Solution
                  </button>
                </div>
              `}
            </div>

            <div class="detail-card">
              <h3 style="font-size: 1.45rem; font-weight: 900; margin-bottom: 1.5rem;">
                Community Discussion (${comments.length})
              </h3>

              <div id="comments-list" style="display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 2rem;">
                ${comments.length > 0 ? comments.map(c => `
                  <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1.25rem; border: 1.5px solid var(--border-light);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                      <strong style="font-size: 1rem; color: var(--text-primary);">${c.author}</strong>
                      <span style="font-size: 0.85rem; color: var(--text-muted);">${c.timestamp}</span>
                    </div>
                    <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6;">${c.text}</p>
                  </div>
                `).join('') : `
                  <p style="font-size: 1rem; color: var(--text-muted); font-style: italic;">No comments yet. Share your experience or questions below.</p>
                `}
              </div>

              <form id="add-comment-form" style="border-top: 1.5px solid var(--border-light); padding-top: 1.5rem;">
                <div class="form-group">
                  <label class="form-label" for="comment-text">Add your perspective or context</label>
                  <textarea id="comment-text" class="form-textarea" placeholder="Share additional nuances, related experiences, or questions..." rows="3" required></textarea>
                </div>
                <button type="submit" class="btn btn-secondary btn-lg">Submit Comment</button>
              </form>
            </div>
          </div>

          <div class="detail-sidebar">
            <div class="detail-card" style="padding: 2rem;">
              <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--text-primary);">Problem Impact Overview</h3>
              <div style="display: flex; flex-direction: column; gap: 1.25rem; font-size: 1rem;">
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.85rem;">Reported Frequency</span>
                  <strong style="color: var(--text-primary); font-size: 1.2rem;">${problem.frequency || 'Weekly'}</strong>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.85rem;">Severity Level</span>
                  <span class="badge ${this.getImpactBadgeClass(problem.impactLevel)}" style="margin-top: 0.25rem;">${problem.impactLevel} Severity</span>
                </div>
                <div>
                  <span style="color: var(--text-muted); display: block; font-size: 0.85rem;">Community Support</span>
                  <strong style="color: var(--brand-link); font-size: 1.2rem;">${problem.supportedByCount || 0} People</strong>
                  <span style="font-size: 0.85rem; color: var(--text-muted); display: block;">experience this same friction point</span>
                </div>
              </div>
            </div>

            <div class="detail-card" style="padding: 2rem; background: var(--bg-muted);">
              <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary);">InnoLink Guidelines</h4>
              <ul style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; padding-left: 1.25rem; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <li>Ground ideas in technical feasibility and practical constraints.</li>
                <li>Cite sources, prior academic work, or link open repositories.</li>
                <li>Posting does not assign or settle patent or IP rights.</li>
              </ul>
              <a href="#/how-it-works" style="font-size: 0.95rem; font-weight: 700; color: var(--brand-inno); text-decoration: underline;">
                Read full Trust & Safety Guidelines →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const supportBtn = this.app.querySelector('#support-toggle-btn');
    supportBtn.addEventListener('click', () => {
      state.toggleSupportProblem(problem.id);
      this.renderDetail(problem.id);
      this.showToast(state.isProblemSupported(problem.id) ? "You signaled shared experience!" : "Removed support signal.", "info");
    });

    const proposeBtn = this.app.querySelector('#open-propose-solution-btn');
    proposeBtn.addEventListener('click', () => {
      this.openProposeSolutionModal(problem.id);
    });

    this.app.querySelectorAll('.vote-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const solId = btn.getAttribute('data-solution-id');
        const voteType = btn.getAttribute('data-vote-type');
        state.voteSolution(problem.id, solId, voteType);
        this.renderDetail(problem.id);
        this.showToast(`Feedback recorded: ${voteType}`, "info");
      });
    });

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
            <div class="author-tag" style="margin-top: 0.35rem;">
              <span>By <strong>${sol.author?.name}</strong> (${sol.author?.role})</span>
            </div>
          </div>
          <div>
            ${sol.isExpertReviewed ? `
              <span class="badge" style="background: #F3E8FF; color: #7C3AED; border: 1.5px solid #D8B4FE;">
                ✓ Expert Reviewed
              </span>
            ` : `
              <span class="badge" style="background: var(--bg-muted); color: var(--text-secondary);">
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
              🔗 Evidence / Prototype Link (${sol.evidenceUrl.replace(/^https?:\/\//, '').slice(0, 36)}...)
            </a>
          </div>
        ` : ''}

        ${sol.expertNotes ? `
          <div style="background: #FAF5FF; border: 1.5px solid #E9D5FF; border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem; font-size: 0.95rem; color: #6B21A8; line-height: 1.6;">
            <strong>Expert Feedback Note:</strong> ${sol.expertNotes}
          </div>
        ` : ''}

        <div class="solution-vote-bar">
          <div class="vote-actions">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-right: 0.35rem;">Helpfulness:</span>
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
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // 6. Post a Problem View
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

            <div class="ai-category-box">
              <div class="ai-category-info">
                <strong>✨ AI Category Assistant:</strong>
                <span>Type your description below, then click to auto-suggest the best matching category.</span>
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

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
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

            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 1.25rem; margin-top: 2rem; border-top: 1.5px solid var(--border-light); padding-top: 1.5rem;">
              <a href="#/explore" class="btn btn-secondary btn-lg">Cancel</a>
              <button type="submit" class="btn btn-primary btn-lg">Publish Problem to Feed</button>
            </div>
          </form>

          <div class="preview-sticky-box">
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem;">
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
                <span id="preview-freq" style="font-size: 0.85rem; color: var(--text-muted);">• Occurs: Weekly</span>
              </div>
              <div class="problem-card-footer">
                <div class="problem-stats">
                  <span class="stat-item">🙌 <strong>1</strong> support</span>
                  <span class="stat-item">💡 <strong>0</strong> solutions</span>
                </div>
                <span class="card-action-pill">Live Preview</span>
              </div>
            </div>

            <div style="margin-top: 1.5rem; padding: 1.25rem; background: var(--bg-surface); border: 1.5px solid var(--border-light); border-radius: var(--radius-lg); font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
              <strong>Privacy Notice:</strong> Your problem post will be visible across InnoLink. Do not share confidential organizational secrets or private personal health information.
            </div>
          </div>
        </div>
      </div>
    `;

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
      this.showToast(`✨ Suggested category: "${suggested}"`, "info");
    });

    const form = this.app.querySelector('#post-problem-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const grpTitle = this.app.querySelector('#group-title');
      if (titleInput.value.trim().length < 10) {
        grpTitle.classList.add('has-error');
        valid = false;
      } else {
        grpTitle.classList.remove('has-error');
      }

      const grpCat = this.app.querySelector('#group-category');
      if (!catInput.value) {
        grpCat.classList.add('has-error');
        valid = false;
      } else {
        grpCat.classList.remove('has-error');
      }

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
  // 7. How It Works & Trust Guidelines View
  // ------------------------------------------------------------------------
  renderHowItWorks() {
    this.app.innerHTML = `
      <div class="container" style="max-width: 960px;">
        <div class="section-header">
          <span class="section-eyebrow">Platform Guidelines</span>
          <h1 class="section-title">How InnoLink Works & Trust Policy</h1>
          <p class="section-subtitle">
            InnoLink surfaces overlooked real-world problems and connects them with motivated problem-solvers. Read how we distinguish community sentiment from technical validation.
          </p>
        </div>

        <div class="detail-card" style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 1.5rem;">The Innovation Lifecycle</h2>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
            <div style="text-align: center; padding: 1.5rem 1rem; background: var(--bg-muted); border-radius: var(--radius-lg);">
              <div style="font-size: 2rem; margin-bottom: 0.75rem;">1️⃣</div>
              <strong style="display: block; font-size: 1.05rem; margin-bottom: 0.35rem;">1. Post Problem</strong>
              <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">People with lived experience share persistent frictions.</span>
            </div>
            <div style="text-align: center; padding: 1.5rem 1rem; background: var(--bg-muted); border-radius: var(--radius-lg);">
              <div style="font-size: 2rem; margin-bottom: 0.75rem;">2️⃣</div>
              <strong style="display: block; font-size: 1.05rem; margin-bottom: 0.35rem;">2. Community Signal</strong>
              <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Peers indicate shared experience ("I experience this too").</span>
            </div>
            <div style="text-align: center; padding: 1.5rem 1rem; background: var(--bg-muted); border-radius: var(--radius-lg);">
              <div style="font-size: 2rem; margin-bottom: 0.75rem;">3️⃣</div>
              <strong style="display: block; font-size: 1.05rem; margin-bottom: 0.35rem;">3. Solution Proposals</strong>
              <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Students and makers propose prototypes and evidence links.</span>
            </div>
            <div style="text-align: center; padding: 1.5rem 1rem; background: var(--bg-muted); border-radius: var(--radius-lg);">
              <div style="font-size: 2rem; margin-bottom: 0.75rem;">4️⃣</div>
              <strong style="display: block; font-size: 1.05rem; margin-bottom: 0.35rem;">4. Expert Review</strong>
              <span style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">Domain mentors evaluate safety and feasibility claims.</span>
            </div>
          </div>
        </div>

        <div class="detail-card" style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 0.75rem;">
            Community Support vs. Expert Validation
          </h2>
          <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
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
                  <td><span class="badge" style="background: var(--bg-muted); color: var(--text-secondary);">Community Submitted</span></td>
                  <td><span class="badge" style="background: #F3E8FF; color: #7C3AED; border: 1.5px solid #D8B4FE;">✓ Expert Reviewed</span></td>
                </tr>
                <tr>
                  <td><strong>Guarantees</strong></td>
                  <td>None. Votes do not guarantee that a solution works or is safe.</td>
                  <td>Subject to formal testing notes, methodology audit, and documented boundaries.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="detail-card">
          <h2 style="font-size: 1.45rem; font-weight: 800; margin-bottom: 1.25rem;">Intellectual Property & Safety Rules</h2>
          <div style="display: flex; flex-direction: column; gap: 1.25rem; font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">
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
  // 8. Roadmap View
  // ------------------------------------------------------------------------
  renderRoadmap() {
    this.app.innerHTML = `
      <div class="container" style="max-width: 960px;">
        <div class="section-header">
          <span class="section-eyebrow">Platform Vision</span>
          <h1 class="section-title">InnoLink Platform Roadmap</h1>
          <p class="section-subtitle">
            Upcoming capabilities being designed for university partnerships, research grants, and organization challenge sprints.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div class="detail-card">
            <span class="badge" style="background: #F5F3FF; color: #7C3AED; margin-bottom: 1rem;">Phase 2 Initiative</span>
            <h3 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem;">
              Verified Expert Review & Academic Mentorship Network
            </h3>
            <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.25rem;">
              Faculty members, patent attorneys, and industry specialists can claim problems in their domain to provide technical vetting, laboratory access credentials, and co-authorship mentorship for promising student prototypes.
            </p>
            <div style="background: var(--bg-muted); border-radius: var(--radius-lg); padding: 1.25rem; font-size: 0.95rem; line-height: 1.6;">
              <strong>Upcoming Features:</strong> Academic institutional SSO (ORCID / EduPerson), peer review rubrics, lab equipment reservation passes, and verified validator profile badges.
            </div>
          </div>

          <div class="detail-card">
            <span class="badge badge-bounty" style="margin-bottom: 1rem;">Phase 2 Initiative</span>
            <h3 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem;">
              Organization Innovation Portal & Prize Escrow
            </h3>
            <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.25rem;">
              Companies, NGOs, and municipal councils can launch custom challenge sprints, fund escrow prize pools, and establish transparent IP co-development agreements with student teams.
            </p>
            <div style="background: var(--bg-muted); border-radius: var(--radius-lg); padding: 1.25rem; font-size: 0.95rem; line-height: 1.6;">
              <strong>Upcoming Features:</strong> Transparent smart escrow funding, legal challenge templates, NDA-safe sandboxes, and milestone-based grant disbursements.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // 9. Modals
  // ------------------------------------------------------------------------
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
            <span style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Propose Solution for:</span>
            <h3 class="modal-title" style="font-size: 1.3rem;">${problem.title}</h3>
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

            <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 1rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>Note on IP:</strong> Submitted concepts will be marked as "Community Proposed". Posting on InnoLink does not establish a patent or settle intellectual property rights.
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" id="modal-cancel-btn" class="btn btn-secondary btn-lg">Cancel</button>
            <button type="submit" class="btn btn-green btn-lg">Submit Solution</button>
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
  // 10. Usability Tester Hub Drawer (Brought back + Google Sheet Sync Option 1)
  // ------------------------------------------------------------------------
  initTesterHub() {
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
      const currentWebhook = state.getWebhookUrl();
      const likedCount = feedbackList.filter(f => f.sentiment === 'liked').length;
      const neutralCount = feedbackList.filter(f => f.sentiment === 'neutral_unhappy').length;

      drawer.innerHTML = `
        <div class="tester-drawer-header">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--brand-link); font-weight: 800; letter-spacing: 0.05em;">Section 8 Usability Plan</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0.2rem 0 0;">Usability Testing Hub</h3>
          </div>
          <button id="close-tester-drawer" style="background: none; border: none; color: white; font-size: 1.75rem; cursor: pointer; padding: 0.25rem;">&times;</button>
        </div>

        <div class="tester-drawer-body">
          <!-- Option 1: Google Sheet Webhook Sync Configuration -->
          <div class="webhook-sync-card">
            <strong style="display: block; font-size: 0.95rem; margin-bottom: 0.35rem;">📊 Google Sheet Real-Time Sync </strong>
            <p style="margin-bottom: 0.75rem; font-size: 0.85rem; color: #1E3A8A; line-height: 1.5;">
              Paste your Google Apps Script or SheetDB Webhook URL below. Whenever friends test and submit feedback on GitHub Pages, their responses arrive in your Google Sheet instantly!
            </p>
            <div style="display: flex; gap: 0.5rem;">
              <input type="url" id="webhook-url-input" class="form-input" style="font-size: 0.85rem; padding: 0.45rem 0.65rem;" placeholder="https://script.google.com/macros/s/... or SheetDB URL" value="${currentWebhook}" />
              <button id="save-webhook-btn" class="btn btn-primary btn-sm" style="white-space: nowrap;">Save</button>
            </div>
            ${currentWebhook ? `
              <div style="color: #059669; font-weight: 700; font-size: 0.8rem; margin-top: 0.4rem;">
                ✓ Google Sheet Webhook Connected & Active
              </div>
            ` : `
              <div style="color: #64748B; font-size: 0.75rem; margin-top: 0.4rem;">
                (Optional: If empty, feedback is safely saved to local storage and exportable below)
              </div>
            `}
          </div>

          <!-- Tasks Checklist -->
          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">
              Participant Tasks (${completed.length}/5 Completed)
            </h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Ask participants to complete each task:
            </p>

            ${VALIDATION_TASKS.map(task => {
              const isDone = completed.includes(task.id);
              return `
                <div class="task-checklist-item ${isDone ? 'done' : ''}">
                  <input type="checkbox" class="task-checkbox" data-task-id="${task.id}" ${isDone ? 'checked' : ''} />
                  <div style="font-size: 0.95rem; line-height: 1.4;">
                    <strong>Task ${task.id}:</strong> ${task.title}
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Post-Test Survey Form -->
          <div style="border-top: 1.5px solid var(--border-light); padding-top: 1.5rem; margin-bottom: 1.75rem;">
            <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 0.35rem;">Record Test Feedback</h4>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Record your participant's feedback after testing:
            </p>

            <form id="tester-feedback-form">
              <div class="form-group">
                <label class="form-label" style="font-size: 0.9rem;">Overall Impression</label>
                <div style="display: flex; gap: 1rem;">
                  <label style="font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                    <input type="radio" name="sentiment" value="liked" required /> 👍 Liked / Loved
                  </label>
                  <label style="font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 0.35rem; cursor: pointer;">
                    <input type="radio" name="sentiment" value="neutral_unhappy" required /> 😐 Neutral / Unhappy
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="fb-useful" style="font-size: 0.9rem;">What was most useful or appealing?</label>
                <input type="text" id="fb-useful" class="form-input" style="font-size: 0.95rem;" placeholder="e.g. Real problems, clear bounties in rupees..." />
              </div>

              <div class="form-group">
                <label class="form-label" for="fb-confusing" style="font-size: 0.9rem;">What was confusing or difficult?</label>
                <input type="text" id="fb-confusing" class="form-input" style="font-size: 0.95rem;" placeholder="e.g. Where to submit proposal..." />
              </div>

              <div class="form-group">
                <label class="form-label" for="fb-feature" style="font-size: 0.9rem;">One feature they would most want added?</label>
                <input type="text" id="fb-feature" class="form-input" style="font-size: 0.95rem;" placeholder="e.g. Chat with poster, student team finder..." />
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
                Submit & Sync Test Record
              </button>
            </form>
          </div>

          <!-- Logged Results Summary & Export Buttons -->
          <div style="border-top: 1.5px solid var(--border-light); padding-top: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <h4 style="font-size: 1.05rem; font-weight: 800;">Recorded Tests (${feedbackList.length})</h4>
              <div style="display: flex; gap: 0.5rem;">
                <button id="export-json-btn" class="btn btn-secondary btn-sm" style="font-size: 0.75rem;">
                  📥 Copy JSON
                </button>
                <button id="reset-test-data-btn" class="btn btn-subtle btn-sm" style="font-size: 0.75rem; color: var(--impact-critical);">
                  Reset
                </button>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
              <div style="background: #ECFDF5; border: 1.5px solid #A7F3D0; border-radius: var(--radius-md); padding: 0.75rem; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #047857;">${likedCount}</div>
                <div style="font-size: 0.8rem; font-weight: 700; color: #065F46;">Liked / Loved</div>
              </div>
              <div style="background: #FFFBEB; border: 1.5px solid #FDE68A; border-radius: var(--radius-md); padding: 0.75rem; text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 900; color: #B45309;">${neutralCount}</div>
                <div style="font-size: 0.8rem; font-weight: 700; color: #92400E;">Neutral / Unhappy</div>
              </div>
            </div>

            <div style="max-height: 220px; overflow-y: auto; font-size: 0.85rem; display: flex; flex-direction: column; gap: 0.65rem;">
              ${feedbackList.map((fb, idx) => `
                <div style="background: var(--bg-muted); border-radius: var(--radius-md); padding: 0.75rem; border: 1px solid var(--border-light);">
                  <div style="display: flex; justify-content: space-between; font-weight: 700;">
                    <span>Participant #${idx + 1} (${fb.sentiment === 'liked' ? '👍 Liked' : '😐 Neutral'})</span>
                    <span style="color: var(--text-muted); font-size: 0.75rem;">${fb.completedTaskCount}/5 tasks</span>
                  </div>
                  ${fb.useful ? `<div style="color: var(--text-secondary); margin-top: 0.25rem;">+ <em>${fb.useful}</em></div>` : ''}
                  ${fb.confusing ? `<div style="color: var(--impact-critical); margin-top: 0.15rem;">! <em>${fb.confusing}</em></div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      // Drawer close
      drawer.querySelector('#close-tester-drawer').addEventListener('click', () => {
        drawer.classList.remove('open');
      });

      // Save Webhook URL
      drawer.querySelector('#save-webhook-btn').addEventListener('click', () => {
        const url = drawer.querySelector('#webhook-url-input').value;
        state.setWebhookUrl(url);
        this.showToast("Google Sheet Webhook URL saved!", "success");
        renderDrawerContent();
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
      fbForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sentiment = fbForm.querySelector('input[name="sentiment"]:checked')?.value;
        const useful = fbForm.querySelector('#fb-useful').value;
        const confusing = fbForm.querySelector('#fb-confusing').value;
        const feature = fbForm.querySelector('#fb-feature').value;

        await state.saveTesterFeedback({
          sentiment,
          useful,
          confusing,
          feature
        });

        this.showToast("Test feedback recorded & synced!", "success");
        renderDrawerContent();
      });

      // Copy JSON
      const exportBtn = drawer.querySelector('#export-json-btn');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => {
          const dataStr = JSON.stringify(feedbackList, null, 2);
          navigator.clipboard.writeText(dataStr);
          this.showToast("All feedback copied to clipboard as JSON!", "success");
        });
      }

      // Reset
      drawer.querySelector('#reset-test-data-btn').addEventListener('click', () => {
        if (confirm("Reset feedback data to initial state?")) {
          state.resetAllData();
          this.showToast("Data reset.", "info");
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

    // Also attach quicklink from top bar
    const topQuicklink = document.getElementById('tester-hub-quicklink');
    if (topQuicklink) {
      topQuicklink.addEventListener('click', () => {
        drawer.classList.add('open');
        renderDrawerContent();
      });
    }
  }
}
