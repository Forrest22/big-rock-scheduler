// ── Scheduler config ─────────────────────────────────────────────────────────
export const SLOT_INTERVAL = 30;  // minutes between tee times
export const OPEN_HOUR     = 8;   // first tee time (8:00 AM)
export const CLOSE_HOUR    = 18;  // last tee time  (6:00 PM)
export const MAX_GROUP     = 4;   // max players per tee time (booker + 3)

// ── Date label arrays ────────────────────────────────────────────────────────
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAYS_LONG  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// ── Slot generation ──────────────────────────────────────────────────────────
function generateSlots() {
  const slots = [];
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_INTERVAL) {
      if (h === CLOSE_HOUR && m > 0) break;
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm   = h >= 12 ? "PM" : "AM";
      const label  = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
      slots.push({ id: `${h}:${String(m).padStart(2, "0")}`, label, h, m });
    }
  }
  return slots;
}

export const ALL_SLOTS = generateSlots();

// ── Date helpers ─────────────────────────────────────────────────────────────
export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate()
  );
}

export function isPast(date) {
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const t = new Date();     t.setHours(0, 0, 0, 0);
  return d < t;
}

export function getWeekDates(anchor) {
  const sunday = new Date(anchor);
  sunday.setDate(anchor.getDate() - anchor.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}

export function getMonthGrid(anchor) {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const last  = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const grid  = [];
  for (let i = 0; i < first.getDay(); i++) grid.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    grid.push(new Date(anchor.getFullYear(), anchor.getMonth(), d));
  }
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}
