import mockCheckIns from "./mockCheckIns";

const KEY = "owncoaching_checkins_v1";

const listeners = new Set();

function emit() {
  listeners.forEach((fn) => fn());
}

function normalizeCheckIns(list) {
  return list.map((c) => ({
    ...c,
    coachNotes: c.coachNotes ?? "",
    status: c.status ?? "Pending",
  }));
}

export function getCheckIns() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return normalizeCheckIns(mockCheckIns);

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return normalizeCheckIns(mockCheckIns);
    return normalizeCheckIns(parsed);
  } catch {
    return normalizeCheckIns(mockCheckIns);
  }
}

export function saveCheckIns(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
  emit();
}

export function resetCheckIns() {
  localStorage.removeItem(KEY);
  emit();
}

// Subscribe pattern (same idea as onTrainingPlansChange)
export function onCheckInsChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
