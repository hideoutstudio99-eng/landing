/* Booking demo logic. On the real site the blocked dates come from the live calendar
   (including Airbnb); here they are sample data. */

export const PRICING = {
  nightly: 2500,
  weekend: 3000,
  cleaning: 500,
  extraGuest: 500,
  baseGuests: 2,
  platformNightly: 3100,
  longStay: { nights: 7, percent: 10 },
} as const;

export const TAKEN = new Set([
  "2026-09-11", "2026-09-12", "2026-09-13",
  "2026-09-19", "2026-09-20",
  "2026-09-26", "2026-09-27", "2026-09-28",
  "2026-10-05", "2026-10-06", "2026-10-07", "2026-10-08",
]);

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

/** Fixed so server and client render the same demo. */
export const TODAY = new Date(2026, 8, 3);

/** The two months the demo calendar shows: [year, zero-based month]. */
export const DEMO_MONTHS: [number, number][] = [
  [2026, 8],
  [2026, 9],
];

export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const pretty = (d: Date) => `${d.getDate()} ${SHORT[d.getMonth()]} ${d.getFullYear()}`;

export const money = (n: number) => "₹" + Number(n).toLocaleString("en-IN");

export const isTaken = (d: Date) => TAKEN.has(iso(d));

/** Latest check-out for a stay starting at `start`: the next blocked date (or 60 days). */
const maxOut = (start: Date) => {
  const d = new Date(start);
  for (let i = 0; i < 60; i++) {
    d.setDate(d.getDate() + 1);
    if (isTaken(d)) return new Date(d);
  }
  return d;
};

export const isSelectable = (d: Date, from: Date | null, to: Date | null) => {
  if (d < TODAY) return false;
  if (!from || to) return !isTaken(d);
  if (d <= from) return !isTaken(d);
  return d <= maxOut(from);
};

export type Quote = {
  nights: number;
  guests: number;
  subtotal: number;
  extras: number;
  discount: number;
  total: number;
  avg: number;
  saving: number;
};

export const quote = (from: Date, to: Date, guests: number): Quote => {
  let subtotal = 0;
  let nights = 0;
  for (const d = new Date(from); d < to; d.setDate(d.getDate() + 1)) {
    const weekend = d.getDay() === 5 || d.getDay() === 6;
    subtotal += weekend ? PRICING.weekend : PRICING.nightly;
    nights++;
  }
  const extras = Math.max(0, guests - PRICING.baseGuests) * PRICING.extraGuest * nights;
  const discount =
    nights >= PRICING.longStay.nights
      ? Math.round((subtotal * PRICING.longStay.percent) / 100)
      : 0;
  const total = subtotal - discount + extras + PRICING.cleaning;
  const platform = PRICING.platformNightly * nights + PRICING.cleaning;
  return {
    nights,
    guests,
    subtotal,
    extras,
    discount,
    total,
    avg: Math.round(subtotal / nights),
    saving: Math.max(0, platform - total),
  };
};
