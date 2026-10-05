export default function Church() {
  return (
    <section id="church">
      <div className="section-grid">
        <div className="section-eyebrow">I · The Ceremony</div>
        <div className="section-body">
          <h2 className="section-title">The Church</h2>
          <p>
            Our ceremony will be a <em>full Mass</em>, including the Eucharist.
            As it will take place on a Sunday, we warmly invite you to join us
            in celebrating and praying for our marriage, and, for those who are
            able, to receive Holy Communion with us.
          </p>
          <div className="section-meta-row">
            <div className="meta-item">
              Location<span className="v">Our Lady of Mount Carmel Wentworthville</span>
              <a
                className="meta-address"
                href="https://www.google.com/maps/search/?api=1&query=Our+Lady+of+Mount+Carmel+Catholic+Church%2C+4+Bennett+St%2C+Wentworthville+NSW+2145"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
                4 Bennett St, Wentworthville NSW 2145
              </a>
            </div>
            <div className="meta-item">
              Mass begins<span className="v">2.00pm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
