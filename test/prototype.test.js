/* ==========================================================================
   InnoLink Prototype Automated Tests
   Run with: node --test test/prototype.test.js
   ========================================================================== */

const test = require('node:test');
const assert = require('node:assert');

// Mock localStorage for Node test environment
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}
global.localStorage = new MockLocalStorage();

test('Seed Data Integrity Tests', async (t) => {
  // Dynamically import ESM data.js
  const { SAMPLE_PROBLEMS, SPONSORED_CHALLENGES, CATEGORIES, STATUS_LABELS, VALIDATION_TASKS } = await import('../js/data.js');

  await t.test('Sample problems have required fields and valid schema', () => {
    assert.ok(Array.isArray(SAMPLE_PROBLEMS), 'SAMPLE_PROBLEMS should be an array');
    assert.ok(SAMPLE_PROBLEMS.length >= 6, 'Should have at least 6 diverse sample problems');

    const validStatuses = Object.values(STATUS_LABELS);

    for (const prob of SAMPLE_PROBLEMS) {
      assert.ok(prob.id, `Problem missing id: ${JSON.stringify(prob)}`);
      assert.ok(prob.title && prob.title.length > 5, `Problem missing valid title: ${prob.id}`);
      assert.ok(prob.description && prob.description.length > 20, `Problem missing valid description: ${prob.id}`);
      assert.ok(CATEGORIES.includes(prob.category), `Invalid category "${prob.category}" in problem ${prob.id}`);
      assert.ok(validStatuses.includes(prob.status), `Invalid status "${prob.status}" in problem ${prob.id}`);
      assert.ok(prob.author && prob.author.name, `Problem missing author: ${prob.id}`);
      assert.strictEqual(typeof prob.supportedByCount, 'number', `supportedByCount must be a number in ${prob.id}`);
      assert.ok(Array.isArray(prob.solutions), `solutions must be an array in ${prob.id}`);
      assert.ok(Array.isArray(prob.comments), `comments must be an array in ${prob.id}`);
    }
  });

  await t.test('Sponsored challenges on landing page have complete specifications', () => {
    assert.ok(Array.isArray(SPONSORED_CHALLENGES), 'SPONSORED_CHALLENGES should be an array');
    assert.strictEqual(SPONSORED_CHALLENGES.length, 3, 'Should have 3 detailed sponsored challenges');

    for (const ch of SPONSORED_CHALLENGES) {
      assert.ok(ch.id, 'Challenge must have id');
      assert.ok(ch.title, 'Challenge must have title');
      assert.ok(ch.sponsorName, 'Challenge must have sponsorName');
      assert.ok(ch.bountyAmount.includes('₹'), 'Challenge must show Indian Rupee bounty amount');
      assert.ok(ch.deadline, 'Challenge must have deadline');
      assert.ok(ch.problemSummary, 'Challenge must have problemSummary');
      assert.ok(ch.details, 'Challenge must have details');
      assert.ok(Array.isArray(ch.requirements) && ch.requirements.length >= 3, 'Must have detailed requirements');
      assert.ok(Array.isArray(ch.evaluationCriteria) && ch.evaluationCriteria.length >= 3, 'Must have evaluation criteria');
    }
  });

  await t.test('Section 8 Usability Validation Tasks are all defined', () => {
    assert.ok(Array.isArray(VALIDATION_TASKS));
    assert.strictEqual(VALIDATION_TASKS.length, 5, 'Must contain all 5 user validation tasks');
    assert.strictEqual(VALIDATION_TASKS[0].id, 1);
    assert.strictEqual(VALIDATION_TASKS[4].id, 5);
  });
});

test('State Management Logic Tests', async (t) => {
  global.localStorage.clear();
  const { state } = await import('../js/state.js');

  await t.test('Initializes with seed problems', () => {
    const problems = state.getProblems();
    assert.ok(problems.length >= 6);
  });

  await t.test('Can add a new problem and persists to storage', () => {
    const countBefore = state.getProblems().length;
    const newProb = state.addProblem({
      title: "Broken elevator in university library leaves wheelchair users stranded",
      category: "Healthcare & Accessibility",
      frequency: "Daily",
      impactLevel: "Critical",
      description: "The primary west-wing elevator has been out of service for 3 weeks with no technician ETA, preventing mobility-impaired students from reaching 4th floor study resources.",
      context: "Affects approximately 35 students registered with accessibility services."
    });

    assert.ok(newProb.id);
    assert.strictEqual(newProb.title, "Broken elevator in university library leaves wheelchair users stranded");
    assert.strictEqual(state.getProblems().length, countBefore + 1);
    assert.strictEqual(state.getProblemById(newProb.id).title, newProb.title);
    assert.ok(state.isProblemSupported(newProb.id), "Poster automatically supports their own problem");
  });

  await t.test('Can toggle support on a problem', () => {
    const testId = 'prob-2';
    const initialSupport = state.getProblemById(testId).supportedByCount;

    // First toggle: Support it
    const isSupported = state.toggleSupportProblem(testId);
    assert.strictEqual(isSupported, true);
    assert.strictEqual(state.getProblemById(testId).supportedByCount, initialSupport + 1);

    // Second toggle: Remove support
    const isSupportedAgain = state.toggleSupportProblem(testId);
    assert.strictEqual(isSupportedAgain, false);
    assert.strictEqual(state.getProblemById(testId).supportedByCount, initialSupport);
  });

  await t.test('Can propose a solution to a problem and update status', () => {
    const testId = 'prob-2';
    const prob = state.getProblemById(testId);
    const initialSolCount = prob.solutions.length;

    const sol = state.addSolution(testId, {
      title: "Silent Smartwatch Haptic Notification Relay for Ward Monitors",
      approach: "Install a secure Bluetooth Low Energy (BLE) gateway module bridging medical telemetry signals to nurse wrist wearables, replacing screeching alarms with distinct vibrational patterns.",
      evidenceUrl: "https://github.com/example/nurse-haptic-relay",
      authorRole: "Biomedical Systems Engineering Student"
    });

    assert.ok(sol.id);
    const updatedProb = state.getProblemById(testId);
    assert.strictEqual(updatedProb.solutions.length, initialSolCount + 1);
    assert.strictEqual(updatedProb.status, "Solution Proposed", "Problem status should advance to Solution Proposed");
  });

  await t.test('Can vote on a solution', () => {
    const testId = 'prob-1';
    const solId = 'sol-101';
    const sol = state.getProblemById(testId).solutions.find(s => s.id === solId);
    const initialHelpful = sol.communityVotes.helpful;

    state.voteSolution(testId, solId, 'helpful');
    assert.strictEqual(sol.communityVotes.helpful, initialHelpful + 1);
    assert.strictEqual(state.getSolutionVote(solId), 'helpful');

    // Toggle off
    state.voteSolution(testId, solId, 'helpful');
    assert.strictEqual(sol.communityVotes.helpful, initialHelpful);
    assert.strictEqual(state.getSolutionVote(solId), null);
  });

  await t.test('Can retrieve sponsored challenge by id for dedicated challenge page', () => {
    const ch = state.getSponsoredChallengeById('sc-1');
    assert.ok(ch);
    assert.strictEqual(ch.title, "Non-Invasive Continuous Hydration Monitoring for Outdoor Agricultural Workers");
    assert.ok(ch.bountyAmount.includes('₹10,00,000'));
  });

  await t.test('Can log usability tester feedback (Section 8 Validation)', async () => {
    const fb = await state.saveTesterFeedback({
      sentiment: 'liked',
      useful: 'Found the real-world lab problems very inspiring for senior design capstone.',
      confusing: 'Took a second to notice the difference between community votes and expert validation.',
      feature: 'Direct mentor messaging.'
    });

    assert.ok(fb.id);
    const feedbackList = state.getTesterFeedback();
    assert.ok(feedbackList.length > 0);
    assert.strictEqual(feedbackList[feedbackList.length - 1].sentiment, 'liked');
  });
});

