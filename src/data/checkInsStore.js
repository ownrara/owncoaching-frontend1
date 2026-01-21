import mockCheckIns from "./mockCheckIns";

const KEY = "owncoaching_checkins_v1";

const listeners = new Set();
function emit() {
  listeners.forEach((fn) => fn());
}

function normalizePhotos(photos) {
  const p = photos && typeof photos === "object" ? photos : {};
  return {
    front: p.front ?? null,
    side: p.side ?? null,
    back: p.back ?? null,
  };
}

function normalizeCheckIn(c) {
  return {
    ...c,
    coachNotes: c.coachNotes ?? "",
    status: c.status ?? "Pending",

    weightUnit: c.weightUnit ?? "kg",
    measureUnit: c.measureUnit ?? "cm",
    body: c.body && typeof c.body === "object" ? c.body : {},
    photos: normalizePhotos(c.photos),
    notes: c.notes ?? "",
  };
}

function normalizeCheckIns(list) {
  return list.map(normalizeCheckIn);
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

export function onCheckInsChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
