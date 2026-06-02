import Topbar from "@/app/components/Topbar";
import Hero from "@/app/components/Hero";
import Photo from "@/app/components/Photo";
import Ornament from "@/app/components/Ornament";
import Church from "@/app/components/sections/Church";
import Reception from "@/app/components/sections/Reception";
import Contact from "@/app/components/sections/Contact";
import Footer from "@/app/components/Footer";
import RSVP from "@/app/components/rsvp/RSVP";

// This is the main page of the wedding website, which composes all the different sections together.

export default function Page() {
  return (
    <>
      <Topbar />
      <Hero />

      <Photo src="/couple-03.png" alt="Jayden and Jamelle at sunset" aspect="wide" position="20%" />

      <Church />

      <Photo src="/couple-02.png" alt="Jayden and Jamelle walking" aspect="tall" position="30%" />

      <Reception />

      <Photo src="/couple-01.png" alt="Jayden and Jamelle laughing" aspect="wide" />

      <section className="rsvp-wrap" id="rsvp">
        <div className="rsvp-header">
          <div 
            className="section-eyebrow centered"
          >
            IV · Reply by 1 December
          </div>
          <h2
            style={{ fontFamily: "var(--font-parfumerie), var(--font-display), serif" }}
          >
            Kindly reply
          </h2>
          <p>
            Find your name as it appears on your invitation, confirm who&apos;s
            coming, and share any dietary needs. Replies can be updated any time
            before the first of December.
          </p>
        </div>
        <RSVP />
      </section>

      <Contact />
      <Footer />
    </>
  );
}
