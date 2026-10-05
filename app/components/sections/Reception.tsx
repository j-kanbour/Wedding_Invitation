import Ornament from "../Ornament";

export default function Reception() {
  return (
    <section id="reception">
      <div className="section-grid">
        <div className="section-eyebrow">II · The Reception</div>
        <div className="section-body">
          <h2 className="section-title">The Reception</h2>
          <p>
            Dinner and dancing will follow directly after the Mass at{" "}
            <em>6.00pm</em>. Please join us at <em>Lantana Venues</em> in
            Bonnyrigg.
          </p>
          <div className="section-meta-row">
            <div className="meta-item">
              Venue<span className="v">Lantana Venues Bonnyrigg, NSW</span>
              <a
                className="meta-address"
                href="https://www.google.com/maps/search/?api=1&query=Lantana+Venues%2C+130+Edensor+Rd%2C+Bonnyrigg+NSW+2177"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
                130 Edensor Rd, Bonnyrigg NSW 2177
              </a>
            </div>
            <div className="meta-item">
              Doors<span className="v">6.00pm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
