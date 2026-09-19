import { Panel } from "../Panel";
import { PRICING, money, pretty, quote } from "@/lib/booking";

function Line({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between gap-3.5 py-[7px] text-[.91rem] tabular-nums text-ink-2 ${className}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const dateLabel = "font-display text-[.66rem] font-medium uppercase tracking-[.13em] text-ink-3";

export function StaySummary({
  from,
  to,
  guests,
}: {
  from: Date | null;
  to: Date | null;
  guests: number;
}) {
  if (!from || !to) {
    return (
      <Panel as="aside" accent aria-live="polite">
        <h3 className="mb-3">Your stay</h3>
        <p className="text-[.89rem] text-ink-3">
          Pick a check-in and a check-out date. The full price appears here — nothing gets added
          at the end.
        </p>
        <div className="mt-3.5">
          <Line label="Per night from" value={money(PRICING.nightly)} />
          <Line label="Cleaning fee" value={money(PRICING.cleaning)} />
        </div>
      </Panel>
    );
  }

  const q = quote(from, to, guests);
  const extraGuests = q.guests - PRICING.baseGuests;

  return (
    <Panel as="aside" accent aria-live="polite">
      <h3 className="mb-3.5">Your stay</h3>

      <div className="mb-4 grid grid-cols-2 overflow-hidden rounded-[5px] border border-line">
        <div className="px-3 py-2.5">
          <div className={dateLabel}>Check-in</div>
          <div className="text-[.93rem] font-semibold">{pretty(from)}</div>
          <div className={`${dateLabel} tracking-[.04em]`}>from 2:00 PM</div>
        </div>
        <div className="border-l border-line px-3 py-2.5">
          <div className={dateLabel}>Check-out</div>
          <div className="text-[.93rem] font-semibold">{pretty(to)}</div>
          <div className={`${dateLabel} tracking-[.04em]`}>by 11:00 AM</div>
        </div>
      </div>

      <Line
        label={`${money(q.avg)} × ${q.nights} night${q.nights === 1 ? "" : "s"}`}
        value={money(q.subtotal)}
      />
      {q.extras > 0 && (
        <Line
          label={`Extra guest${extraGuests === 1 ? "" : "s"} (${extraGuests})`}
          value={money(q.extras)}
        />
      )}
      {q.discount > 0 && (
        <Line
          className="text-ok"
          label={`${PRICING.longStay.percent}% long-stay discount`}
          value={`− ${money(q.discount)}`}
        />
      )}
      <Line label="Cleaning fee" value={money(PRICING.cleaning)} />

      <div className="mt-2.5 flex justify-between gap-3.5 border-t border-line pt-[13px] font-semibold text-ink">
        <span>Total</span>
        <b className="font-display text-2xl font-bold">{money(q.total)}</b>
      </div>

      {q.saving > 0 && (
        <p className="mt-[13px] rounded-[5px] bg-ok-soft px-3 py-2.5 text-[.82rem] text-ok">
          About {money(q.saving)} less than the same stay on a booking platform.
        </p>
      )}
    </Panel>
  );
}
