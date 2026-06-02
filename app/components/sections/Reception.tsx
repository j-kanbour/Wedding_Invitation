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
              Venue<span className="v">Lantana Venues</span>
            </div>
            <div className="meta-item">
              Location<span className="v">Bonnyrigg, NSW</span>
            </div>
            <div className="meta-item">
              Doors<span className="v">6.00pm</span>
            </div>
          </div>
        </div>
      </div>
      <Ornament />
    </section>
  );
}
