# InnoLink — Clickable Website Prototype

> **Core Idea:** *People know the problems. Problem-solvers bring the expertise. InnoLink connects them.*

InnoLink connects people who experience overlooked, niche real-world problems with students, researchers, professionals, and innovators who can solve them.

This clickable prototype is designed for **usability validation**—testing whether users understand the concept, can post problems, discover needs, submit solutions, and navigate the trust distinction between community sentiment and technical validation.

---

## 🎨 Brand Identity

- **Logo**: Features the official InnoLink logo (`assets/logo.png`) linking deep royal indigo (`#2D2E8E`) with vibrant innovation emerald (`#0FA968`).
- **Typography & Theme**: Clean, responsive modern layout with accessible contrast ratios, card components, and interactive micro-states.

---

## 🚀 Quick Start

### 1. Run with Node.js (Zero external dependencies)
```bash
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Alternatively, run with Python
```bash
python3 -m http.server 3000
```

### 3. Run Automated Tests
```bash
node --test test/prototype.test.js
```

---

## 🧭 Key User Journeys & Prototype Features

### 1. Landing Page (`#/`)
- Hero section clearly articulating the mission and primary actions: **"Post a Problem"** and **"Explore Problems"**.
- Value propositions for the 4 key roles: **Problem Poster**, **Problem-Solver / Innovator**, **Expert / Validator**, and **Organization / Sponsor**.
- **Featured Sponsored Challenges**: Prominently highlights funded challenges with sponsor identity, verified bounty pool, deadline countdown, technical constraints, evaluation criteria %, and an interactive "View Requirements" modal.

### 2. Explore Problems Feed (`#/explore`)
- Filter problems by category (Healthcare, Campus Life, Urban Tech, Everyday Living, Workplace, Sustainability).
- Real-time instant search by keyword across titles and problem descriptions.
- Filter by lifecycle status: *Open*, *Solution Proposed*, *In Development*, *Solved*.
- Sort by Most Supported, Newest, or Most Solutions.

### 3. Problem Detail View (`#/problem/:id`)
- Deep dive into problem background, lived experience context, frequency, and severity.
- **"🙌 I Experience This Too"** interactive support button that increments community validation in real time.
- Proposed solutions thread with distinct badges for **Community Submitted** vs **Expert Reviewed** solutions.
- Community helpfulness voting (*Helpful*, *Needs Work*, *I Can Build This*) with trust disclaimer.
- Discussion comments thread with instant response capability.

### 4. Post a Problem Form (`#/post`)
- Structured form: Title, Category, Frequency, Impact Severity, Description, and Affected Stakeholders.
- **✨ Simulated AI Category Assistant**: Scans your description text and suggests the most appropriate category with a single click.
- **Live Feed Card Preview**: Visualizes how the problem card will look in the feed before publishing.
- Client-side validation ensuring substantive, actionable descriptions.

### 5. Propose a Solution Interaction
- Accessible on any problem detail page via **"Propose a Solution"**.
- Captures solution headline, technical approach / methodology, optional evidence/repo link, and solver role.
- Automatically transitions problem lifecycle status from *Open* to *Solution Proposed*.

### 6. Trust, Safety & IP (`#/how-it-works`)
- Clear comparison table: **Community Feedback (Voting)** vs **Expert / Validator Review**.
- Explicit legal & IP notice: Posting does not assign patents or settle intellectual property rights.
- Content guidelines prohibiting confidential or sensitive personal health data.

### 7. 🧪 Interactive Usability Tester Hub
- Accessible via the floating pill button at the bottom right.
- Tracks completion of all **5 Section 8 Validation Tasks**:
  1. *Explain what InnoLink does after viewing the landing page.*
  2. *Find a problem relevant to you using feed/search/filters.*
  3. *Post a sample problem using the creation form.*
  4. *Find where you would submit a solution to an existing problem.*
  5. *Explain how you tell if a solution is community-voted vs expert-validated.*
- Built-in post-test survey: logs participant impressions (*Liked/Loved* vs *Neutral/Unhappy*), useful elements, friction points, and requested features into local storage.

---

## 📁 Project Structure

```
InnoLink/
├── assets/
│   └── logo.png              # Official InnoLink brand logo
├── css/
│   ├── variables.css         # Brand colors, typography, elevations, status colors
│   ├── main.css              # Reset, typography, navigation, modals, toasts, footer
│   └── components.css        # Cards, sponsored challenges, forms, tester drawer
├── js/
│   ├── data.js               # Fictional sample problems, sponsored challenges, personas
│   ├── state.js              # Reactive state manager backed by localStorage
│   ├── router.js             # Hash-based SPA routing
│   ├── ui.js                 # Dynamic view renderers, modals, and toasts
│   └── app.js                # Bootstrap, persona switcher, and event controllers
├── test/
│   └── prototype.test.js     # Automated test suite (node:test)
├── index.html                # Single-page application shell
├── server.js                 # Zero-dependency local Node.js static server
└── README.md                 # Project documentation
```

