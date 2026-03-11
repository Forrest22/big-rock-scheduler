// ── Scheduler config ─────────────────────────────────────────────────────────
export const SLOT_INTERVAL = 30; // minutes between tee times
export const OPEN_HOUR = 8; // first tee time (8:00 AM)
export const CLOSE_HOUR = 18; // last tee time  (6:00 PM)
export const MAX_GROUP = 4; // max players per tee time (booker + 3)

// ── Date label arrays ────────────────────────────────────────────────────────
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const DAYS_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// ── Slot generation ──────────────────────────────────────────────────────────
function generateSlots() {
  const slots = [];
  for (let h = OPEN_HOUR; h <= CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_INTERVAL) {
      if (h === CLOSE_HOUR && m > 0) break;
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const label = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
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
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// isDayPast — true if the entire date is before today (used in WeekView dots)
export function isPast(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return d < t;
}

// isSlotPast — true if this specific slot's start time has already passed.
// Pass the course timezone (IANA string) so the comparison is accurate
// regardless of where the visitor's browser is located.
// e.g. timezone = "America/New_York"
export function isSlotPast(date, slot, timezone) {
  // Build a Date representing the slot start in the course's local time
  const slotDateStr =
    [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-") +
    `T${String(slot.h).padStart(2, "0")}:${String(slot.m).padStart(2, "0")}:00`;

  // If the browser supports Intl, compare against course-local "now"
  try {
    const slotMs = new Date(slotDateStr).getTime();
    // Current moment expressed as if we were in the course's timezone
    const nowInTz = new Date(
      new Date().toLocaleString("en-US", { timeZone: timezone }),
    ).getTime();
    return slotMs < nowInTz;
  } catch {
    // Fallback: compare against local browser time
    return new Date(slotDateStr) < new Date();
  }
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
  const last = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const grid = [];
  for (let i = 0; i < first.getDay(); i++) grid.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    grid.push(new Date(anchor.getFullYear(), anchor.getMonth(), d));
  }
  while (grid.length % 7 !== 0) grid.push(null);
  return grid;
}
