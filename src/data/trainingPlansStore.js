import mockTrainingPlan from "./mockTrainingPlan";

const KEY = "owncoaching_training_plans_v1";

// simple event bus to refresh pages after save
let listeners = [];

export function onTrainingPlansChange(cb) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((x) => x !== cb);
  };
}

function emit() {
  listeners.forEach((fn) => fn());
}

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * We store all training plans in an object:
 * {
 *   c1: { ...plan },
 *   c2: { ...plan }
 * }
 */
function getAllTrainingPlans() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return {};

  const parsed = safeParse(raw);
  return parsed ? parsed : {};
}

function saveAllTrainingPlans(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

// ensure minimum shape (course-friendly)
function normalizePlan(plan) {
  const p = plan || {};

  return {
    planName: p.planName || "Training Plan",
    durationWeeks: Number(p.durationWeeks || 12),
    currentWeek: Number(p.currentWeek || 1),
    weeks: Array.isArray(p.weeks) ? p.weeks : [],
  };
}

// fallback: if no plan saved, use mockTrainingPlan as template
function defaultPlanForClient(clientId) {
  const base = normalizePlan(mockTrainingPlan);

  // (optional) customize plan name per client so you can see it changed
  return {
    ...base,
    planName: `${base.planName} (${clientId})`,
  };
}

export function getTrainingPlan(clientId) {
  const all = getAllTrainingPlans();
  const existing = all[clientId];

  if (!existing) return defaultPlanForClient(clientId);

  return normalizePlan(existing);
}

export function saveTrainingPlan(clientId, plan) {
  const all = getAllTrainingPlans();
  const next = {
    ...all,
    [clientId]: normalizePlan(plan),
  };

  saveAllTrainingPlans(next);
}

export function resetTrainingPlans() {
  localStorage.removeItem(KEY);
  emit();
}
