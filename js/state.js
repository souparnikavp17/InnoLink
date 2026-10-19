/* ==========================================================================
   InnoLink State Management
   Provides reactive state backed by localStorage with fallback to seed data.
   ========================================================================== */

import { SAMPLE_PROBLEMS, SPONSORED_CHALLENGES, PERSONAS, VALIDATION_TASKS, STATUS_LABELS } from './data.js';

const STORAGE_KEYS = {
  PROBLEMS: 'innolink_problems_v1',
  SUPPORTED_PROBLEMS: 'innolink_supported_problems_v1',
  VOTED_SOLUTIONS: 'innolink_voted_solutions_v1',
  ACTIVE_PERSONA: 'innolink_active_persona_v1',
  COMPLETED_TASKS: 'innolink_completed_tasks_v1',
  TESTER_FEEDBACK: 'innolink_tester_feedback_v1'
};

class StateManager {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    // Check if problems exist in storage, otherwise seed
    const stored = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
    if (!stored) {
      this.problems = JSON.parse(JSON.stringify(SAMPLE_PROBLEMS));
      this.saveProblems();
    } else {
      try {
        this.problems = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse stored problems, falling back to seed", e);
        this.problems = JSON.parse(JSON.stringify(SAMPLE_PROBLEMS));
        this.saveProblems();
      }
    }

    // Supported problem IDs by this local user
    try {
      this.supportedMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUPPORTED_PROBLEMS) || '{}');
    } catch {
      this.supportedMap = {};
    }

    // Voted solutions map: { [solutionId]: voteType }
    try {
      this.votedSolutionsMap = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOTED_SOLUTIONS) || '{}');
    } catch {
      this.votedSolutionsMap = {};
    }

    // Active persona
    this.activePersona = localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA) || 'poster';

    // Completed validation tasks
    try {
      this.completedTasks = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TASKS) || '[]');
    } catch {
      this.completedTasks = [];
    }

    // Usability feedback entries
    try {
      this.testerFeedback = JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTER_FEEDBACK) || '[]');
    } catch {
      this.testerFeedback = [];
    }

    this.challenges = SPONSORED_CHALLENGES;
  }

  saveProblems() {
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(this.problems));
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try { cb(); } catch (err) { console.error("Listener error:", err); }
    });
  }

  getProblems() {
    return [...this.problems];
  }

  getProblemById(id) {
    return this.problems.find(p => p.id === id);
  }

  addProblem(data) {
    const newId = `prob-${Date.now()}`;
    const persona = PERSONAS.find(p => p.id === this.activePersona) || PERSONAS[0];

    const newProblem = {
      id: newId,
      title: data.title.trim(),
      category: data.category,
      status: STATUS_LABELS.OPEN,
      frequency: data.frequency || "Weekly",
      impactLevel: data.impactLevel || "Moderate",
      description: data.description.trim(),
      context: data.context ? data.context.trim() : "",
      author: {
        name: data.authorName || (persona.id === 'poster' ? "You (Community Poster)" : `You (${persona.label})`),
        role: persona.label,
        avatar: "ME"
      },
      createdAt: new Date().toISOString().split('T')[0],
      supportedByCount: 1, // Author experiences it too!
      comments: [],
      solutions: []
    };

    this.problems.unshift(newProblem);
    this.saveProblems();
    
    // Automatically mark the creator as supporting it
    this.supportedMap[newId] = true;
    localStorage.setItem(STORAGE_KEYS.SUPPORTED_PROBLEMS, JSON.stringify(this.supportedMap));

    this.notify();
    return newProblem;
  }

  isProblemSupported(problemId) {
    return !!this.supportedMap[problemId];
  }

  toggleSupportProblem(problemId) {
    const prob = this.getProblemById(problemId);
    if (!prob) return false;

    if (this.supportedMap[problemId]) {
      delete this.supportedMap[problemId];
      prob.supportedByCount = Math.max(0, (prob.supportedByCount || 1) - 1);
    } else {
      this.supportedMap[problemId] = true;
      prob.supportedByCount = (prob.supportedByCount || 0) + 1;
    }

    localStorage.setItem(STORAGE_KEYS.SUPPORTED_PROBLEMS, JSON.stringify(this.supportedMap));
    this.saveProblems();
    this.notify();
    return this.isProblemSupported(problemId);
  }

  addSolution(problemId, solutionData) {
    const prob = this.getProblemById(problemId);
    if (!prob) return null;

    const solId = `sol-${Date.now()}`;
    const persona = PERSONAS.find(p => p.id === this.activePersona) || PERSONAS[1];

    const newSolution = {
      id: solId,
      title: solutionData.title.trim(),
      author: {
        name: solutionData.authorName || `You (${persona.label})`,
        role: solutionData.authorRole || persona.label
      },
      approach: solutionData.approach.trim(),
      evidenceUrl: solutionData.evidenceUrl ? solutionData.evidenceUrl.trim() : "",
      status: "Community Proposed",
      isExpertReviewed: false,
      communityVotes: {
        helpful: 1,
        needsWork: 0,
        canBuild: 0
      }
    };

    if (!prob.solutions) prob.solutions = [];
    prob.solutions.push(newSolution);

    // If problem was Open, update status to Solution Proposed
    if (prob.status === STATUS_LABELS.OPEN) {
      prob.status = STATUS_LABELS.SOLUTION_PROPOSED;
    }

    this.saveProblems();
    this.notify();
    return newSolution;
  }

  getSolutionVote(solutionId) {
    return this.votedSolutionsMap[solutionId] || null;
  }

  voteSolution(problemId, solutionId, voteType) {
    const prob = this.getProblemById(problemId);
    if (!prob) return;

    const sol = prob.solutions.find(s => s.id === solutionId);
    if (!sol) return;

    if (!sol.communityVotes) {
      sol.communityVotes = { helpful: 0, needsWork: 0, canBuild: 0 };
    }

    const previousVote = this.votedSolutionsMap[solutionId];
    if (previousVote === voteType) {
      // Toggle off
      sol.communityVotes[voteType] = Math.max(0, sol.communityVotes[voteType] - 1);
      delete this.votedSolutionsMap[solutionId];
    } else {
      // Deduct previous if any
      if (previousVote && sol.communityVotes[previousVote]) {
        sol.communityVotes[previousVote] = Math.max(0, sol.communityVotes[previousVote] - 1);
      }
      // Add new
      sol.communityVotes[voteType] = (sol.communityVotes[voteType] || 0) + 1;
      this.votedSolutionsMap[solutionId] = voteType;
    }

    localStorage.setItem(STORAGE_KEYS.VOTED_SOLUTIONS, JSON.stringify(this.votedSolutionsMap));
    this.saveProblems();
    this.notify();
  }

  addComment(problemId, text, authorName) {
    const prob = this.getProblemById(problemId);
    if (!prob) return null;

    const persona = PERSONAS.find(p => p.id === this.activePersona) || PERSONAS[0];
    const newComment = {
      id: `c-${Date.now()}`,
      author: authorName || `You (${persona.label})`,
      text: text.trim(),
      timestamp: "Just now"
    };

    if (!prob.comments) prob.comments = [];
    prob.comments.push(newComment);
    this.saveProblems();
    this.notify();
    return newComment;
  }

  getSponsoredChallenges() {
    return this.challenges;
  }

  getSponsoredChallengeById(id) {
    return this.challenges.find(c => c.id === id);
  }

  getActivePersona() {
    return this.activePersona;
  }

  setActivePersona(roleId) {
    this.activePersona = roleId;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, roleId);
    this.notify();
  }

  getCompletedTasks() {
    return this.completedTasks;
  }

  toggleTaskCompleted(taskId) {
    const idx = this.completedTasks.indexOf(taskId);
    if (idx > -1) {
      this.completedTasks.splice(idx, 1);
    } else {
      this.completedTasks.push(taskId);
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify(this.completedTasks));
    this.notify();
    return this.completedTasks.includes(taskId);
  }

  getTesterFeedback() {
    return this.testerFeedback;
  }

  saveTesterFeedback(feedback) {
    const entry = {
      id: `fb-${Date.now()}`,
      timestamp: new Date().toISOString(),
      persona: this.activePersona,
      completedTaskCount: this.completedTasks.length,
      ...feedback
    };
    this.testerFeedback.push(entry);
    localStorage.setItem(STORAGE_KEYS.TESTER_FEEDBACK, JSON.stringify(this.testerFeedback));
    this.notify();
    return entry;
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.PROBLEMS);
    localStorage.removeItem(STORAGE_KEYS.SUPPORTED_PROBLEMS);
    localStorage.removeItem(STORAGE_KEYS.VOTED_SOLUTIONS);
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_TASKS);
    this.init();
    this.notify();
  }
}

export const state = new StateManager();

