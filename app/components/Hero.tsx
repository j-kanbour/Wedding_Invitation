const CALENDAR_PARAMS = new URLSearchParams({
  action: "TEMPLATE",
  text: "Jayden & Jamelle — Wedding",
  dates: "20260117T070000Z/20260117T130000Z",
  details:
    "Ceremony at 2.00pm, reception to follow at Lantana Venues, Bonnyrigg.",
  location: "Lantana Venues, Bonnyrigg, NSW",
}).toString();

const CALENDAR_URL = `https://calendar.google.com/calendar/render?${CALENDAR_PARAMS}`;

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-eyebrow">We&apos;re getting married</div>
      <h1 
        className="hero-names"
        style={{ fontFamily: "var(--font-parfumerie), var(--font-display), serif" }}
      >
        Jayden<span className="amp">&amp;</span><wbr />Jamelle
      </h1>

      <div className="hero-meta">
        <div className="hero-meta-item">
          Date<span className="v">Sat 17 Jan 2026</span>
        </div>
        <div className="dot" aria-hidden />
        <div className="hero-meta-item">
          Ceremony<span className="v">2.00pm</span>
        </div>
        <div className="dot" aria-hidden />
        <div className="hero-meta-item">
          Reception<span className="v">6.00pm onwards</span>
        </div>
      </div>

      <div className="hero-cta">
        <a className="btn btn-filled" href="#rsvp">
          RSVP Here
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
        <a
          className="btn"
          href={CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Add to Calendar
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <rect x="4" y="5" width="16" height="16" rx="1" />
            <path d="M4 9h16M8 3v4M16 3v4" />
          </svg>
        </a>
      </div>
    </header>
  );
}
