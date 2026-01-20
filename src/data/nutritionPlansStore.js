import mockNutritionPlan from "./mockNutritionPlan";

const KEY = "owncoaching_nutritionplans_v1";

const listeners = new Set();
function emit() {
  listeners.forEach((fn) => fn());
}

// Ensure every plan has the fields the UI expects
function normalizePlan(p) {
  return {
    ...p,
    coachNotes: p.coachNotes ?? "",
    dailyGoals: {
      calories: Number(p.dailyGoals?.calories ?? 0),
      protein: Number(p.dailyGoals?.protein ?? 0),
      carbs: Number(p.dailyGoals?.carbs ?? 0),
      fat: Number(p.dailyGoals?.fat ?? 0),
    },
    days: Array.isArray(p.days) ? p.days : [],
  };
}

function normalizeState(all) {
  const next = { ...(all || {}) };

  Object.keys(next).forEach((clientId) => {
    const st = next[clientId] || {};
    const plans = Array.isArray(st.plans) ? st.plans.map(normalizePlan) : [];
    const currentPlanId = st.currentPlanId ?? plans[0]?.id ?? "";

    next[clientId] = { plans, currentPlanId };
  });

  return next;
}

// We store plans per clientId:
// { [clientId]: { plans: [...], currentPlanId: "p1" } }
function getDefaultState() {
  const plans = (mockNutritionPlan.plans || []).map(normalizePlan);
  const firstPlanId = plans?.[0]?.id || "";
  return {
    c1: {
      plans,
      currentPlanId: firstPlanId,
    },
  };
}

function readAll() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return getDefaultState();

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return getDefaultState();
    return normalizeState(parsed);
  } catch {
    return getDefaultState();
  }
}

function writeAll(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

export function getNutritionState(clientId) {
  const all = readAll();

  if (!all[clientId]) {
    all[clientId] = { plans: [], currentPlanId: "" };
    writeAll(all);
  }

  return all[clientId];
}

export function saveNutritionState(clientId, nextState) {
  const all = readAll();
  all[clientId] = {
    plans: Array.isArray(nextState?.plans) ? nextState.plans.map(normalizePlan) : [],
    currentPlanId: nextState?.currentPlanId ?? nextState?.plans?.[0]?.id ?? "",
  };
  writeAll(all);
}

export function onNutritionPlansChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function resetNutritionPlans() {
  localStorage.removeItem(KEY);
  emit();
}
