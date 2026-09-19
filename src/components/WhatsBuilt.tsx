import { Container } from "./Container";
import { Panel } from "./Panel";
import { SectionHeader } from "./SectionHeader";

const flow = [
  "Instagram / Google",
  "Website",
  "Live calendar",
  "Guest details",
  "UPI or cash",
  "Confirmed",
  "WhatsApp",
];
const HOT_STEP = "UPI or cash";

const features = [
  {
    tag: "Guest side",
    title: "Five pages, one booking flow",
    body: "Home, the studio, amenities, location and booking — plus terms, cancellation and privacy. Dates and price are calculated on the server, so the number on screen is the number charged.",
  },
  {
    tag: "Payments",
    title: "UPI now, gateway when you want it",
    body: "Pay by UPI and submit the reference, or choose cash and send a request you approve by hand. Razorpay is wired in and switches on the moment real keys are added — then online payments confirm automatically.",
  },
  {
    tag: "Host side",
    title: "A dashboard that runs the place",
    body: "Month calendar colour-coded by booked, pending, blocked and Airbnb. Confirm or cancel, mark cash received, block dates, add walk-ins, and change pricing without touching code.",
  },
  {
    tag: "Airbnb",
    title: "One calendar, both directions",
    body: "Airbnb bookings import and block the website automatically. Direct bookings publish back out as a calendar feed Airbnb reads. No more double bookings from two separate calendars.",
  },
  {
    tag: "Safeguards",
    title: "The boring things that matter",
    body: "Overlapping dates are rejected by the server. Unpaid holds expire after 24 hours. The exact address is only released once a booking is confirmed. Guests look up a booking with its ID plus the last four digits of their phone number.",
  },
  {
    tag: "Cost",
    title: "Domain and hosting, nothing more",
    body: "Bookings are stored as plain JSON files, so there is no database bill and nothing is locked in. The only running costs are a domain, hosting and per-transaction payment fees.",
  },
];

const todo = [
  'The address and city — the site currently says "SET YOUR AREA AND CITY".',
  "Real nightly rates, cleaning fee and the Airbnb price to compare against.",
  "The Airbnb calendar link, pasted into the dashboard, so the two calendars sync.",
  "The real UPI ID for payments, and the WhatsApp number to receive enquiries.",
  "Guest reviews — the reviews band stays hidden until real ones are added.",
];

const tag = "font-display text-[.68rem] font-semibold uppercase tracking-[.16em] text-brand";

export function WhatsBuilt() {
  return (
    <section id="built" className="py-section">
      <Container className="flex flex-col gap-7">
        <SectionHeader title="What's actually running">
          Not a mockup — a working site with a booking database, an admin dashboard and two-way
          Airbnb calendar sync.
        </SectionHeader>

        <ol className="m-0 flex list-none flex-wrap items-center gap-x-2.5 gap-y-2 p-0">
          {flow.map((step, i) => (
            <li key={step} className="flex items-center gap-2.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-ink-3">
                  →
                </span>
              )}
              <span
                className={`rounded-[3px] border px-[11px] py-[7px] font-display text-[.78rem] font-medium uppercase tracking-[.1em] ${
                  step === HOT_STEP
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-surface text-ink-2"
                }`}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-px overflow-hidden rounded-lg border border-line bg-line">
          {features.map((f) => (
            <article key={f.tag} className="flex flex-col gap-2 bg-ground p-[22px]">
              <span className={tag}>{f.tag}</span>
              <h3>{f.title}</h3>
              <p className="text-[.875rem]">{f.body}</p>
            </article>
          ))}
        </div>

        <Panel className="mt-1.5">
          <span className={tag}>Still to fill in</span>
          <h3 className="mt-2 mb-3.5">Before this goes live</h3>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {todo.map((item) => (
              <li
                key={item}
                className="flex items-start gap-[11px] text-[.93rem] text-ink-2 before:mt-1 before:size-[15px] before:flex-none before:rounded-[3px] before:border-2 before:border-brand before:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </Container>
    </section>
  );
}
