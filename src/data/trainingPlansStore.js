// src/data/trainingPlansStore.js
import mockTrainingPlan from "./mockTrainingPlan";

const KEY = "owncoaching_trainingplans_v1";
const EVT = "owncoaching:trainingplans_changed";

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function normalizePlan(plan) {
  const safe = plan && typeof plan === "object" ? plan : {};
  return {
    planName: safe.planName ?? "Training Plan",
    durationWeeks: Number(safe.durationWeeks ?? 12),
    currentWeek: Number(safe.currentWeek ?? 1),
    weeks: Array.isArray(safe.weeks) ? safe.weeks : [],
  };
}

function buildDefaultForClient(clientId) {
  // same default for all clients for now (course-level mock)
  // but stored separately per clientId
  const base = normalizePlan(mockTrainingPlan);

  // ensure IDs/data are cloned so edits don’t mutate mock imports
  return deepClone(base);
}

function readAll() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(nextMap) {
  localStorage.setItem(KEY, JSON.stringify(nextMap));
  window.dispatchEvent(new Event(EVT));
}

export function onTrainingPlansChange(handler) {
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}

export function getTrainingPlan(clientId) {
  const map = readAll();
  const stored = map?.[clientId];

  if (!stored) return buildDefaultForClient(clientId);

  return normalizePlan(stored);
}

export function saveTrainingPlan(clientId, nextPlan) {
  const map = readAll();
  const normalized = normalizePlan(nextPlan);

  const nextMap = {
    ...map,
    [clientId]: deepClone(normalized),
  };

  writeAll(nextMap);
}

export function resetTrainingPlans() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}
