import { ALL_SLOTS, DAYS_SHORT, MAX_GROUP, isSameDay, getWeekDates, isSlotPast } from "./constants";
import { getSlotStatus, getOpenBooking } from "./utils";

/**
 * WeekView
 *
 * Props:
 *   anchor      Date     — anchor date (any day in the target week)
 *   bookings    object   — full bookings map
 *   timezone    string   — IANA timezone string e.g. "America/New_York"
 *   onBook      fn(date, slot)
 *   onJoin      fn(date, slot, bookingId)
 *   onDayClick  fn(date) — drill into DayView
 */
export default function WeekView({ anchor, bookings, timezone, onBook, onJoin, onDayClick }) {
  const days  = getWeekDates(anchor);
  const today = new Date();

  return (
    <div className="br-week-wrap">
      <div className="br-week-inner">

        {/* Day headers */}
        <div className="br-week-header">
          <div />
          {days.map((d, i) => (
            <div key={i} className="br-week-day-head">
              <div className="br-week-day-name">{DAYS_SHORT[d.getDay()]}</div>
              <div className="br-week-day-num-wrap">
                <button
                  className={`br-week-day-num${isSameDay(d, today) ? " br-today-num" : ""}`}
                  onClick={() => onDayClick(new Date(d))}
                >
                  {d.getDate()}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slot rows */}
        {ALL_SLOTS.map(slot => (
          <div key={slot.id} className="br-week-row">
            <div className="br-week-time">{slot.label}</div>
            {days.map((d, i) => {
              const date   = new Date(d);
              const status = getSlotStatus(bookings, date, slot);
              const past   = isSlotPast(date, slot, timezone);
              const openB  = getOpenBooking(bookings, date, slot);
              const dot    = status === "available" ? "🟢"
                           : status === "joinable"  ? "🔵"
                           : "🔴";
              return (
                <div key={i} className="br-week-cell">
                  <button
                    className="br-week-dot"
                    title={`${slot.label} · ${status}${status === "joinable" ? ` (${openB?.players.length}/${MAX_GROUP})` : ""}`}
                    onClick={() => {
                      if (past || status === "full") return;
                      if (status === "available") onBook(date, slot);
                      else onJoin(date, slot, openB.id);
                    }}
                    disabled={past || status === "full"}
                  >
                    {dot}
                  </button>
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="br-week-legend">
          <span>🟢 Open</span>
          <span>🔵 Joinable</span>
          <span>🔴 Full</span>
        </div>

      </div>
    </div>
  );
}