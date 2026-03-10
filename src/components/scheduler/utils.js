import { ALL_SLOTS, SLOT_INTERVAL, MAX_GROUP } from "./constants";

// ── Booking key helpers ──────────────────────────────────────────────────────
export function dateKey(d) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function slotKey(date, slotId) {
  return `${dateKey(date)}__${slotId}`;
}

// ── Slot status ──────────────────────────────────────────────────────────────
// Returns: "available" | "joinable" | "full"
export function getSlotStatus(bookings, date, slot) {
  const k    = slotKey(date, slot.id);
  const list = bookings[k] || [];
  const total   = list.reduce((s, b) => s + b.players.length, 0);
  const hasOpen = list.some(b => b.open && b.players.length < MAX_GROUP);
  if (total === 0) return "available";
  if (hasOpen)     return "joinable";
  return "full";
}

export function getOpenBooking(bookings, date, slot) {
  const k    = slotKey(date, slot.id);
  const list = bookings[k] || [];
  return list.find(b => b.open && b.players.length < MAX_GROUP) || null;
}

// ── Google Calendar link ─────────────────────────────────────────────────────
export function buildGCalLink(booking, date, slot) {
  const y     = date.getFullYear();
  const mo    = String(date.getMonth() + 1).padStart(2, "0");
  const d     = String(date.getDate()).padStart(2, "0");
  const hS    = String(slot.h).padStart(2, "0");
  const mS    = String(slot.m).padStart(2, "0");
  const endH  = slot.m + SLOT_INTERVAL >= 60 ? slot.h + 1 : slot.h;
  const endM  = (slot.m + SLOT_INTERVAL) % 60;
  const hE    = String(endH).padStart(2, "0");
  const mE    = String(endM).padStart(2, "0");
  const start = `${y}${mo}${d}T${hS}${mS}00`;
  const end   = `${y}${mo}${d}T${hE}${mE}00`;

  const guests  = booking.players.slice(1).map(p => p.email).filter(Boolean).join(",");
  const details = [
    "Big Rock Disc Golf – Non-Member Tee Time",
    `Booker: ${booking.players[0].name}`,
    `Group: ${booking.players.map(p => p.name).join(", ")}`,
    "$10/player",
  ].join("\n");

  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=Big+Rock+Tee+Time` +
    `&dates=${start}/${end}` +
    `&details=${encodeURIComponent(details)}` +
    `&location=Waterbury+Center,+Vermont` +
    `&add=${encodeURIComponent(guests)}`
  );
}

// ── Demo seed data ───────────────────────────────────────────────────────────
// Remove or replace this once you have a real backend
export function seedBookings() {
  const today    = new Date();
  const b        = {};
  const offsets  = [0, 0, 1, 2, 3];
  const slotIds  = ["9:00", "10:00", "10:30", "13:00", "14:30"];
  const names    = ["Alex R.", "Jamie T.", "Sam K.", "Jordan M.", "Casey W."];

  offsets.forEach((off, i) => {
    const d    = new Date(today);
    d.setDate(today.getDate() + off);
    const slot = ALL_SLOTS.find(s => s.id === slotIds[i]);
    if (!slot) return;
    const k = slotKey(d, slot.id);
    if (!b[k]) b[k] = [];
    b[k].push({
      id:      `demo-${i}`,
      players: [{ name: names[i], email: "" }],
      open:    i % 2 === 0,
    });
  });

  return b;
}
