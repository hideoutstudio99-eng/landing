import { BookingDemo } from "@/components/booking/BookingDemo";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsBuilt } from "@/components/WhatsBuilt";
import { bedroom } from "@/lib/photos";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <ScrollReveal photo={bedroom} caption="The bedroom · the real thing, not a render" />
        <Gallery />
        <BookingDemo />
        <WhatsBuilt />
      </main>
      <Footer />
    </>
  );
}
