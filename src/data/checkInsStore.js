import mockCheckIns from "./mockCheckIns";

const KEY = "owncoaching_checkins_v1";

export function getCheckIns() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return mockCheckIns;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : mockCheckIns;
  } catch {
    return mockCheckIns;
  }
}

export function saveCheckIns(next) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function resetCheckIns() {
  localStorage.removeItem(KEY);
}
