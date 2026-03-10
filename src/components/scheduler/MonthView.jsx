import { ALL_SLOTS, DAYS_SHORT, isSameDay, getMonthGrid } from "./constants";
import { getSlotStatus } from "./utils";

/**
 * MonthView
 *
 * Props:
 *   anchor      Date     — any date in the target month
 *   bookings    object   — full bookings map
 *   onDayClick  fn(date) — called when user clicks a day cell
 */
export default function MonthView({ anchor, bookings, onDayClick }) {
  const grid  = getMonthGrid(anchor);
  const today = new Date();

  return (
    <div>
      {/* Day-of-week headers */}
      <div className="br-month-header">
        {DAYS_SHORT.map(d => (
          <div key={d} className="br-month-day-name">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="br-month-grid">
        {grid.map((d, i) => {
          if (!d) return <div key={i} className="br-month-cell br-empty" />;

          const statuses  = ALL_SLOTS.map(s => getSlotStatus(bookings, new Date(d), s));
          const openCount = statuses.filter(s => s === "available").length;
          const joinCount = statuses.filter(s => s === "joinable").length;
          const isToday   = isSameDay(d, today);

          return (
            <div
              key={i}
              className={`br-month-cell${isToday ? " br-today-cell" : ""}`}
              onClick={() => onDayClick(new Date(d))}
            >
              <div className="br-month-num">{d.getDate()}</div>
              {openCount > 0 && <span className="br-month-badge br-badge-open">🟢 {openCount} open</span>}
              {joinCount > 0 && <span className="br-month-badge br-badge-join">🔵 {joinCount} join</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
