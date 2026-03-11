import { useState } from "react";
import { MONTHS, DAYS_LONG, getWeekDates } from "./constants";
import { slotKey, buildGCalLink, seedBookings } from "./utils";
import schedulerCSS from "./styles";
import DayView      from "./DayView";
import WeekView     from "./WeekView";
import MonthView    from "./MonthView";
import BookingModal from "./BookingModal";

const MAX_GROUP = 4;

/**
 * Scheduler
 *
 * The top-level tee-time scheduling component. Manages all shared state
 * (current view, anchor date, bookings, modal) and passes props down.
 *
 * Props:
 *   courseName     string   — display name shown in the header
 *   courseSubtitle string   — subtitle line shown below the name
 *   footerNote     string   — small print at the bottom
 *   initialView    string   — "day" | "week" | "month"  (default: "week")
 *   timezone       string   — IANA timezone for the course, e.g. "America/New_York"
 *                             Used to correctly grey out past slots regardless of
 *                             where the visitor's browser is located.
 */
export default function Scheduler({
  courseName     = "Big Rock Disc Golf",
  courseSubtitle = "WATERBURY CENTER, VT · NON-MEMBER TEE TIMES · $10/ROUND",
  footerNote     = "Members may walk on at any time · Non-members must book & pay $10/round · Private land — no walk-ons",
  initialView    = "week",
  timezone       = "America/New_York",
}) {
  const [view,     setView]     = useState(initialView);
  const [anchor,   setAnchor]   = useState(new Date());
  const [bookings, setBookings] = useState(seedBookings);
  const [modal,    setModal]    = useState(null);

  // ── Navigation ─────────────────────────────────────────────────────────────
  function navPrev() {
    const d = new Date(anchor);
    if (view === "day")   d.setDate(d.getDate() - 1);
    else if (view === "week") d.setDate(d.getDate() - 7);
    else d.setMonth(d.getMonth() - 1);
    setAnchor(d);
  }
  function navNext() {
    const d = new Date(anchor);
    if (view === "day")   d.setDate(d.getDate() + 1);
    else if (view === "week") d.setDate(d.getDate() + 7);
    else d.setMonth(d.getMonth() + 1);
    setAnchor(d);
  }
  function navLabel() {
    if (view === "day") {
      return `${DAYS_LONG[anchor.getDay()]}, ${MONTHS[anchor.getMonth()]} ${anchor.getDate()}, ${anchor.getFullYear()}`;
    }
    if (view === "week") {
      const days = getWeekDates(anchor);
      const f = days[0], l = days[6];
      if (f.getMonth() === l.getMonth()) {
        return `${MONTHS[f.getMonth()]} ${f.getDate()}–${l.getDate()}, ${f.getFullYear()}`;
      }
      return `${MONTHS[f.getMonth()]} ${f.getDate()} – ${MONTHS[l.getMonth()]} ${l.getDate()}, ${f.getFullYear()}`;
    }
    return `${MONTHS[anchor.getMonth()]} ${anchor.getFullYear()}`;
  }

  // ── Modal helpers ───────────────────────────────────────────────────────────
  function openBook(date, slot) { setModal({ type: "book", date, slot }); }
  function openJoin(date, slot, bookingId) { setModal({ type: "join", date, slot, bookingId }); }
  function closeModal() { setModal(null); }

  // ── Booking actions ─────────────────────────────────────────────────────────
  function submitBook({ name, email, players }) {
    const { date, slot } = modal;
    const k = slotKey(date, slot.id);
    const extraPlayers = players.filter(p => p.trim()).map(n => ({ name: n, email: "" }));
    const allPlayers   = [{ name, email }, ...extraPlayers];
    const newBooking   = {
      id:      Date.now().toString(),
      players: allPlayers,
      open:    allPlayers.length < MAX_GROUP,
    };
    setBookings(prev => ({ ...prev, [k]: [...(prev[k] || []), newBooking] }));
    const link = buildGCalLink(newBooking, date, slot);
    setModal({ type: "confirm", date, slot, booking: newBooking, link });
  }

  function submitJoin({ name, email }) {
    const { date, slot, bookingId } = modal;
    const k = slotKey(date, slot.id);
    setBookings(prev => {
      const list  = [...(prev[k] || [])];
      const idx   = list.findIndex(b => b.id === bookingId);
      if (idx === -1) return prev;
      const booking   = { ...list[idx] };
      booking.players = [...booking.players, { name, email }];
      if (booking.players.length >= MAX_GROUP) booking.open = false;
      list[idx] = booking;
      return { ...prev, [k]: list };
    });
    setModal(null);
  }

  // ── Drill into day from week/month ──────────────────────────────────────────
  function goToDay(date) {
    setAnchor(date);
    setView("day");
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="br-app">
      <style>{schedulerCSS}</style>

      {/* Header */}
      <header className="br-header">
        <div className="br-header-left">
          <span style={{ fontSize: "2.2rem" }}>🪨</span>
          <div>
            <div className="br-header-title">{courseName}</div>
            <div className="br-header-sub">{courseSubtitle}</div>
          </div>
        </div>
      </header>

      <div className="br-main">

        {/* Controls */}
        <div className="br-controls">
          <div className="br-view-tabs">
            {["day", "week", "month"].map(v => (
              <button
                key={v}
                className={`br-view-tab${view === v ? " active" : ""}`}
                onClick={() => setView(v)}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="br-nav-row">
            <button className="br-nav-arrow" onClick={navPrev}>‹</button>
            <span className="br-nav-label">{navLabel()}</span>
            <button className="br-nav-arrow" onClick={navNext}>›</button>
            <button className="br-today-btn" onClick={() => setAnchor(new Date())}>Today</button>
          </div>
        </div>

        {/* Legend */}
        <div className="br-legend">
          <span><span className="br-legend-dot" style={{ background: "#43a047" }} />Open</span>
          <span><span className="br-legend-dot" style={{ background: "#1e88e5" }} />Joinable</span>
          <span><span className="br-legend-dot" style={{ background: "#e53935" }} />Full</span>
        </div>

        {/* Calendar view */}
        <div className="br-card">
          {view === "day" && (
            <DayView anchor={anchor} bookings={bookings} timezone={timezone} onBook={openBook} onJoin={openJoin} />
          )}
          {view === "week" && (
            <WeekView anchor={anchor} bookings={bookings} timezone={timezone} onBook={openBook} onJoin={openJoin} onDayClick={goToDay} />
          )}
          {view === "month" && (
            <MonthView anchor={anchor} bookings={bookings} onDayClick={goToDay} />
          )}
        </div>

        <div className="br-footer">{footerNote}</div>
      </div>

      {/* Booking modal */}
      <BookingModal
        modal={modal}
        onClose={closeModal}
        onSubmitBook={submitBook}
        onSubmitJoin={submitJoin}
      />
    </div>
  );
}