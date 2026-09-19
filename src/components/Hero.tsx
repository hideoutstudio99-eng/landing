import { ButtonLink } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { DoorHangerMark } from "./Mark";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="pt-[clamp(40px,7vw,76px)] pb-[clamp(52px,8vw,96px)]">
      <Container className="grid grid-cols-[1.2fr_.8fr] items-center gap-[clamp(24px,5vw,56px)] max-[860px]:grid-cols-1">
        <div className="flex flex-col items-start gap-[22px]">
          <Eyebrow>Direct booking · No platform fees</Eyebrow>

          <h1 className="flex flex-col">
            <span>Hideout</span>{" "}
            <span className="text-[.46em] font-medium tracking-[.12em] text-brand">Studios</span>
          </h1>

          <p className="border-t-[3px] border-brand pt-4 font-display text-[clamp(.9rem,2vw,1.1rem)] font-medium uppercase tracking-[.3em] text-ink-2">
            {site.tagline}
          </p>

          <p className="max-w-[38ch]">
            One private studio, kept properly. Live availability, honest pricing, and a real
            person on WhatsApp — without handing a cut to a platform.
          </p>

          <ul className="flex list-none flex-wrap gap-x-[26px] gap-y-1.5 p-0 text-[.89rem] text-ink-3">
            <li>
              <b className="font-semibold text-ink">₹2,500</b> per night
            </li>
            <li>
              Sleeps <b className="font-semibold text-ink">4</b>
            </li>
            <li>
              Check-in <b className="font-semibold text-ink">2:00 PM</b>
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#booking">Try the booking demo</ButtonLink>
            <ButtonLink href="#built" variant="ghost">
              What&apos;s built
            </ButtonLink>
          </div>
        </div>

        <div className="grid place-items-center">
          <DoorHangerMark className="h-auto w-[min(270px,58vw)]" />
        </div>
      </Container>
    </section>
  );
}
