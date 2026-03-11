import { isSlotPast, MAX_GROUP } from "./constants";
import { getSlotStatus, getOpenBooking } from "./utils";

/**
 * SlotBtn
 *
 * Props:
 *   date      Date       — the date this slot is on
 *   slot      object     — slot object from ALL_SLOTS
 *   showTime  bool       — whether to prefix the button label with the time
 *   bookings  object     — full bookings map from Scheduler state
 *   timezone  string     — IANA timezone string e.g. "America/New_York"
 *   onBook    fn(date, slot)              — called when user wants to book
 *   onJoin    fn(date, slot, bookingId)   — called when user wants to join
 */
export default function SlotBtn({ date, slot, showTime = true, bookings, timezone, onBook, onJoin }) {
  const status      = getSlotStatus(bookings, date, slot);
  const openBooking = getOpenBooking(bookings, date, slot);
  const past        = isSlotPast(date, slot, timezone);

  const colorCls = status === "available" ? "br-slot-open"
                 : status === "joinable"  ? "br-slot-join"
                 : "br-slot-full";
  const cls = `br-slot-btn ${colorCls}${past ? " br-slot-past" : ""}`;

  const label = status === "available" ? "Open"
              : status === "joinable"  ? `Join (${openBooking?.players.length}/${MAX_GROUP})`
              : "Full";

  function handleClick() {
    if (past || status === "full") return;
    if (status === "available") onBook(new Date(date), slot);
    else onJoin(new Date(date), slot, openBooking.id);
  }

  return (
    <button className={cls} onClick={handleClick} disabled={past || status === "full"}>
      {showTime ? `${slot.label} · ${label}` : label}
    </button>
  );
}