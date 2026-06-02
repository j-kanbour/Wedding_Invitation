interface ContactPerson {
  role: string;
  name: string;
  phone: string;
  tel: string;
}

const PEOPLE: ContactPerson[] = [
  { role: "Groom", name: "Jayden Kanbour", phone: "0401 179 790", tel: "+61401179790" },
  { role: "Bride", name: "Jamelle Touma", phone: "0434 287 435", tel: "+61434287435" },
];

export default function Contact() {
  return (
    <section className="contact">
      <div className="section-eyebrow centered" style={{ marginBottom: 22 }}>
        V · Contact
      </div>
      <h2>Any questions?</h2>
      <p className="sub">
        Please don&apos;t hesitate to reach out to either of us.
      </p>
      <div className="contact-grid">
        {PEOPLE.map((p) => (
          <div key={p.tel} className="contact-card">
            <div className="role">{p.role}</div>
            <div className="name">{p.name}</div>
            <a className="phone" href={`tel:${p.tel}`}>
              {p.phone}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
