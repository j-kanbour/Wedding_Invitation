import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="topbar" aria-label="Primary">
      <Link className="ampersand" href="#top">
        J <em>&amp;</em> J
      </Link>
      <div className="mono">
        <a href="#church">Church</a>
        <a href="#reception">Reception</a>
        <a href="#rsvp">RSVP</a>
      </div>
    </nav>
  );
}
