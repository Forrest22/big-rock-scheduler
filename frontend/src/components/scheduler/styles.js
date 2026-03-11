// All styles scoped under .br-app to prevent conflicts with Vite/CRA defaults.
// Injected via a <style> tag in Scheduler.jsx.

const schedulerCSS = `
  .br-app, .br-app * { box-sizing: border-box; }
  .br-app {
    background: #e8f5e9;
    min-height: 100vh;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 16px;
    color: #222;
    width: 100%;
  }

  /* ── Full button reset — prevents Vite default styles bleeding in ── */
  .br-app button {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    font-family: system-ui, -apple-system, sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }
  .br-app button:focus-visible { outline: 2px solid #43a047; outline-offset: 2px; }

  /* ── Header ── */
  .br-header {
    background: #2e7d32;
    color: #fff;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
  .br-header-left  { display: flex; align-items: center; gap: 14px; }
  .br-header-title { font-size: 1.7rem; font-weight: 800; line-height: 1; color: #fff; }
  .br-header-sub   { font-size: 0.72rem; opacity: 0.8; margin-top: 3px; letter-spacing: 0.07em; color: #fff; }

  /* ── Layout ── */
  .br-main {
    max-width: 980px;
    margin: 0 auto;
    padding: 20px;
  }
  .br-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.07);
    padding: 20px;
  }
  .br-footer {
    color: #81c784;
    font-size: 12px;
    text-align: center;
    margin-top: 16px;
    padding-bottom: 24px;
  }

  /* ── Controls bar ── */
  .br-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 14px;
  }
  .br-view-tabs { display: flex; gap: 4px; background: #c8e6c9; border-radius: 8px; padding: 4px; }
  .br-view-tab {
    background: transparent !important;
    border: none !important;
    padding: 6px 18px !important;
    border-radius: 6px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #2e7d32 !important;
    text-transform: capitalize;
    transition: all 0.15s;
  }
  .br-view-tab.active { background: #2e7d32 !important; color: #fff !important; }

  .br-nav-row   { display: flex; align-items: center; gap: 8px; }
  .br-nav-arrow {
    background: #fff !important;
    border: 1.5px solid #a5d6a7 !important;
    color: #2e7d32 !important;
    width: 34px !important; height: 34px !important;
    border-radius: 7px !important;
    font-size: 20px !important;
    font-weight: bold !important;
  }
  .br-nav-arrow:hover { background: #c8e6c9 !important; }
  .br-nav-label {
    color: #1b5e20;
    font-size: 15px;
    font-weight: 700;
    min-width: 220px;
    text-align: center;
  }
  .br-today-btn {
    background: #fff !important;
    border: 1.5px solid #a5d6a7 !important;
    color: #2e7d32 !important;
    padding: 6px 14px !important;
    border-radius: 7px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
  }
  .br-today-btn:hover { background: #c8e6c9 !important; }

  /* ── Legend ── */
  .br-legend {
    display: flex;
    gap: 18px;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    margin-bottom: 14px;
    align-items: center;
  }
  .br-legend-dot {
    width: 13px; height: 13px;
    border-radius: 3px;
    display: inline-block;
    margin-right: 5px;
    vertical-align: middle;
  }

  /* ── Slot buttons ── */
  .br-slot-btn {
    border-radius: 7px !important;
    padding: 7px 12px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    white-space: nowrap;
    transition: all 0.15s;
    border: none !important;
  }
  .br-slot-open { background: #43a047 !important; color: #fff !important; }
  .br-slot-open:hover { background: #2e7d32 !important; }
  .br-slot-join { background: #1e88e5 !important; color: #fff !important; }
  .br-slot-join:hover { background: #1565c0 !important; }
  .br-slot-full { background: #e53935 !important; color: #fff !important; opacity: 0.7; cursor: not-allowed !important; }
  .br-slot-past { opacity: 0.35 !important; cursor: not-allowed !important; pointer-events: none; }

  /* ── Day view ── */
  .br-day-title { font-size: 1.3rem; font-weight: 700; color: #1b5e20; margin-bottom: 16px; }
  .br-day-grid  { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; }
  .br-day-slot  {
    display: flex; align-items: center; justify-content: space-between;
    background: #f1f8e9; border: 1px solid #c8e6c9; border-radius: 8px;
    padding: 8px 12px; gap: 8px;
  }
  .br-day-slot-time { font-size: 13px; font-weight: 600; color: #333; }

  /* ── Week view ── */
  .br-week-wrap   { overflow-x: auto; }
  .br-week-inner  { min-width: 580px; }
  .br-week-header {
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    border-bottom: 2px solid #c8e6c9;
    margin-bottom: 4px;
  }
  .br-week-day-head    { text-align: center; padding: 8px 4px; }
  .br-week-day-name    { font-size: 12px; color: #666; font-weight: 600; }
  .br-week-day-num-wrap { display: flex; justify-content: center; margin-top: 2px; }
  .br-week-day-num {
    font-size: 1.1rem !important; font-weight: 800 !important; color: #1b5e20 !important;
    width: 32px !important; height: 32px !important;
    border-radius: 50% !important;
    background: transparent !important; border: none !important;
    transition: background 0.15s;
  }
  .br-week-day-num:hover      { background: #c8e6c9 !important; }
  .br-week-day-num.br-today-num { background: #43a047 !important; color: #fff !important; }
  .br-week-row {
    display: grid;
    grid-template-columns: 80px repeat(7, 1fr);
    border-bottom: 1px solid #f1f8e9;
  }
  .br-week-time {
    font-size: 12px; color: #888; padding: 8px 4px;
    display: flex; align-items: center; font-weight: 600; white-space: nowrap;
  }
  .br-week-cell   { padding: 4px; display: flex; align-items: center; justify-content: center; }
  .br-week-dot {
    font-size: 20px !important;
    background: none !important; border: none !important;
    padding: 2px !important; line-height: 1;
    transition: transform 0.1s;
  }
  .br-week-dot:hover:not(:disabled) { transform: scale(1.3); }
  .br-week-dot:disabled              { opacity: 0.4; cursor: not-allowed !important; }
  .br-week-legend { display: flex; gap: 16px; margin-top: 12px; font-size: 13px; font-weight: 600; color: #444; }

  /* ── Month view ── */
  .br-month-header { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 6px; }
  .br-month-day-name { text-align: center; font-size: 12px; font-weight: 700; color: #666; padding: 6px 0; }
  .br-month-grid  { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
  .br-month-cell  {
    background: #fff; border: 1.5px solid #c8e6c9; border-radius: 8px;
    min-height: 68px; padding: 6px 8px; cursor: pointer; transition: all 0.15s;
  }
  .br-month-cell:hover         { border-color: #43a047; box-shadow: 0 2px 8px rgba(67,160,71,0.15); }
  .br-month-cell.br-today-cell { border-color: #1e88e5; background: #e3f2fd; }
  .br-month-cell.br-empty      { background: transparent; border-color: transparent; cursor: default; pointer-events: none; }
  .br-month-num   { font-size: 13px; font-weight: 700; color: #1b5e20; margin-bottom: 4px; }
  .br-month-badge { font-size: 11px; font-weight: 700; display: block; line-height: 1.6; }
  .br-badge-open  { color: #2e7d32; }
  .br-badge-join  { color: #1565c0; }

  /* ── Modal overlay ── */
  .br-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.45);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
  }
  .br-modal {
    background: #fff; border-radius: 14px;
    width: 100%; max-width: 420px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.2);
    overflow: hidden;
  }
  .br-modal-header {
    background: #2e7d32; color: #fff;
    padding: 16px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .br-modal-title { font-size: 1.1rem; font-weight: 800; color: #fff; }
  .br-close-btn   {
    background: none !important; border: none !important;
    color: #fff !important; font-size: 1.8rem !important;
    padding: 0 !important; width: auto !important; height: auto !important;
  }
  .br-modal-body      { padding: 20px; }
  .br-modal-slot-info {
    background: #e8f5e9; border: 1.5px solid #a5d6a7; border-radius: 8px;
    padding: 10px 14px; font-size: 14px; font-weight: 700; color: #1b5e20;
    margin-bottom: 16px;
  }
  .br-field-label {
    display: block; font-size: 12px; font-weight: 700; color: #555;
    margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .br-field-input {
    width: 100%; border: 1.5px solid #c8e6c9; border-radius: 7px;
    padding: 9px 12px; font-size: 14px; color: #222; margin-bottom: 12px;
    outline: none; font-family: system-ui, -apple-system, sans-serif;
    background: #fff; display: block;
  }
  .br-field-input:focus { border-color: #43a047; }
  .br-section-label {
    display: block; font-size: 12px; font-weight: 700; color: #666;
    margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em;
  }

  /* ── Modal buttons ── */
  .br-btn-row { display: flex; gap: 10px; margin-top: 8px; }
  .br-btn-primary {
    flex: 1;
    background: #43a047 !important; color: #fff !important;
    border: none !important; border-radius: 7px !important;
    padding: 14px 20px !important; font-size: 15px !important; font-weight: 700 !important;
    transition: background 0.15s;
  }
  .br-btn-primary:hover    { background: #2e7d32 !important; }
  .br-btn-primary:disabled { background: #a5d6a7 !important; cursor: not-allowed !important; }
  .br-btn-secondary {
    flex: 1;
    background: #f1f8e9 !important; color: #2e7d32 !important;
    border: 1.5px solid #a5d6a7 !important; border-radius: 7px !important;
    padding: 14px 20px !important; font-size: 15px !important; font-weight: 600 !important;
  }
  .br-btn-secondary:hover      { background: #c8e6c9 !important; }
  .br-btn-secondary-full       { width: 100%; display: block; }
  .br-fee-note                 { font-size: 12px; color: #888; text-align: center; margin-top: 10px; }

  /* ── Confirmation screen ── */
  .br-confirm-icon  { font-size: 3rem; text-align: center; margin-bottom: 12px; }
  .br-confirm-title { font-size: 1.4rem; font-weight: 800; color: #1b5e20; text-align: center; margin-bottom: 8px; }
  .br-confirm-sub   { font-size: 14px; color: #555; text-align: center; margin-bottom: 16px; line-height: 1.5; }
  .br-gcal-btn {
    display: block !important; width: 100%;
    background: #1e88e5 !important; color: #fff !important;
    border: none !important; border-radius: 7px !important;
    padding: 14px 20px !important; font-size: 15px !important; font-weight: 700 !important;
    margin-bottom: 10px; text-align: center; text-decoration: none;
  }
  .br-gcal-btn:hover { background: #1565c0 !important; }
`;

export default schedulerCSS;
