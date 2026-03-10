import { useState } from "react";
import { MONTHS, DAYS_LONG } from "./constants";

/**
 * BookingModal
 *
 * Must be defined outside of App/Scheduler to prevent remounting on every
 * parent re-render (which would reset focus after each keystroke).
 *
 * Props:
 *   modal         object|null  — current modal state: { type, date, slot, link?, bookingId? }
 *   onClose       fn()         — close the modal
 *   onSubmitBook  fn({ name, email, players })  — submit a new booking
 *   onSubmitJoin  fn({ name, email })           — submit a join request
 */
export default function BookingModal({ modal, onClose, onSubmitBook, onSubmitJoin }) {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [players, setPlayers] = useState(["", "", ""]);

  if (!modal) return null;

  const { type, date, slot, link } = modal;
  const isBook    = type === "book";
  const isJoin    = type === "join";
  const isConfirm = type === "confirm";

  function handleBook() {
    onSubmitBook({ name, email, players });
    // reset local form state after submit
    setName(""); setEmail(""); setPlayers(["", "", ""]);
  }

  function handleJoin() {
    onSubmitJoin({ name, email });
    setName(""); setEmail(""); setPlayers(["", "", ""]);
  }

  function updatePlayer(i, val) {
    setPlayers(prev => { const p = [...prev]; p[i] = val; return p; });
  }

  return (
    <div className="br-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="br-modal">

        {/* Header */}
        <div className="br-modal-header">
          <span className="br-modal-title">
            {isBook    ? "📅 Book Tee Time"
           : isJoin    ? "➕ Join Tee Time"
           : "✅ You're On the Tee!"}
          </span>
          <button className="br-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="br-modal-body">

          {/* ── Confirmation screen ── */}
          {isConfirm && (
            <>
              <div className="br-confirm-icon">🥏</div>
              <div className="br-confirm-title">Tee time booked!</div>
              <div className="br-confirm-sub">
                {slot.label} · {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
                <br />$10 green fee payable on arrival
              </div>
              <a className="br-gcal-btn" href={link} target="_blank" rel="noopener noreferrer">
                📅 Add to Google Calendar
              </a>
              <button className="br-btn-secondary br-btn-secondary-full" onClick={onClose}>
                Done
              </button>
            </>
          )}

          {/* ── Book / Join form ── */}
          {(isBook || isJoin) && (
            <>
              <div className="br-modal-slot-info">
                {DAYS_LONG[date.getDay()]}, {MONTHS[date.getMonth()]} {date.getDate()} · {slot.label}
              </div>

              <label className="br-field-label">Your Name *</label>
              <input
                className="br-field-input"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <label className="br-field-label">Email (for Google Calendar invite)</label>
              <input
                className="br-field-input"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              {isBook && (
                <>
                  <span className="br-section-label">
                    Add players to your group (optional, up to 3 more)
                  </span>
                  {[0, 1, 2].map(i => (
                    <input
                      key={i}
                      className="br-field-input"
                      placeholder={`Player ${i + 2} name`}
                      value={players[i]}
                      onChange={e => updatePlayer(i, e.target.value)}
                    />
                  ))}
                </>
              )}

              <div className="br-btn-row">
                <button className="br-btn-secondary" onClick={onClose}>Cancel</button>
                <button
                  className="br-btn-primary"
                  disabled={!name.trim()}
                  onClick={isBook ? handleBook : handleJoin}
                >
                  {isBook ? "Book It →" : "Join Group →"}
                </button>
              </div>
              <div className="br-fee-note">$10 green fee · payable on arrival · private land</div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
