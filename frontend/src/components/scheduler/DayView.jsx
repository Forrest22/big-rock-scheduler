import { ALL_SLOTS, MONTHS, DAYS_LONG } from "./constants";
import SlotButton from "./SlotButton";

/**
 * DayView
 *
 * Props:
 *   anchor    Date     — currently selected date
 *   bookings  object   — full bookings map
 *   timezone  string   — IANA timezone string e.g. "America/New_York"
 *   onBook    fn(date, slot)
 *   onJoin    fn(date, slot, bookingId)
 */
export default function DayView({ anchor, bookings, timezone, onBook, onJoin }) {
  return (
    <div>
      <div className="br-day-title">
        {DAYS_LONG[anchor.getDay()]}, {MONTHS[anchor.getMonth()]} {anchor.getDate()}, {anchor.getFullYear()}
      </div>
      <div className="br-day-grid">
        {ALL_SLOTS.map(slot => (
          <div key={slot.id} className="br-day-slot">
            <span className="br-day-slot-time">{slot.label}</span>
            <SlotButton
              date={anchor}
              slot={slot}
              showTime={false}
              bookings={bookings}
              timezone={timezone}
              onBook={onBook}
              onJoin={onJoin}
            />
          </div>
        ))}
      </div>
    </div>
  );
}