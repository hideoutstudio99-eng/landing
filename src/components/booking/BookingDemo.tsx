"use client";

import { useState } from "react";
import { Button } from "../Button";
import { Container } from "../Container";
import { Panel } from "../Panel";
import { SectionHeader } from "../SectionHeader";
import { MonthGrid } from "./MonthGrid";
import { StaySummary } from "./StaySummary";
import { DEMO_MONTHS } from "@/lib/booking";

const legend = [
  { label: "Selected", swatch: "bg-brand" },
  { label: "Your stay", swatch: "bg-brand-soft" },
  { label: "Already booked", swatch: "bg-surface-2" },
];

export function BookingDemo() {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [hover, setHover] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);

  const pick = (d: Date) => {
    if (!from || to || d <= from) {
      setFrom(d);
      setTo(null);
    } else {
      setTo(d);
    }
    setHover(null);
  };

  const reset = () => {
    setFrom(null);
    setTo(null);
    setHover(null);
  };

  return (
    <section id="booking" className="border-y border-line bg-surface py-section">
      <Container className="flex flex-col gap-[26px]">
        <SectionHeader eyebrow="Live demo" title="Pick dates. See the real price.">
          This is the actual booking calculator from the site. The blocked dates here are sample
          data — on the real site they come from the live calendar, including anything booked
          through Airbnb.
        </SectionHeader>

        <div className="grid grid-cols-[1.25fr_.75fr] items-start gap-[26px] max-[860px]:grid-cols-1">
          <Panel>
            <div className="mb-3.5 flex items-baseline justify-between gap-3">
              <h3 className="text-[.95rem] font-semibold tracking-[.16em]">Choose your dates</h3>
              <Button variant="ghost" size="sm" onClick={reset}>
                Reset
              </Button>
            </div>

            <div
              className="grid grid-cols-2 gap-[26px] max-[620px]:grid-cols-1"
              onMouseLeave={() => setHover(null)}
            >
              {DEMO_MONTHS.map(([year, month]) => (
                <MonthGrid
                  key={`${year}-${month}`}
                  year={year}
                  month={month}
                  from={from}
                  to={to}
                  hover={hover}
                  onPick={pick}
                  onHover={(d) => from && !to && setHover(d)}
                />
              ))}
            </div>

            <ul className="mt-3.5 flex list-none flex-wrap gap-x-[18px] gap-y-1.5 p-0 text-[.78rem] text-ink-3">
              {legend.map(({ label, swatch }) => (
                <li key={label}>
                  <i className={`mr-1.5 inline-block size-2.5 rounded-[2px] align-[-1px] ${swatch}`} />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex max-w-[200px] flex-col gap-1.5">
              <label
                htmlFor="guests"
                className="font-display text-[.74rem] font-medium uppercase tracking-[.14em] text-ink-3"
              >
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="rounded-[5px] border border-line bg-ground px-[11px] py-2.5 text-[.92rem] text-ink"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} guest{n === 1 ? "" : "s"}
                  </option>
                ))}
              </select>
            </div>
          </Panel>

          <StaySummary from={from} to={to} guests={guests} />
        </div>
      </Container>
    </section>
  );
}
