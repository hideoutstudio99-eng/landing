import { MONTHS, isSelectable, iso, pretty } from "@/lib/booking";

type MonthGridProps = {
  year: number;
  /** Zero-based month. */
  month: number;
  from: Date | null;
  to: Date | null;
  /** Date under the pointer while choosing a check-out. */
  hover: Date | null;
  onPick: (d: Date) => void;
  onHover: (d: Date) => void;
};

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export function MonthGrid({ year, month, from, to, hover, onPick, onHover }: MonthGridProps) {
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const end = to ?? (from && hover && hover > from ? hover : null);

  return (
    <div>
      <div className="mb-2.5 text-center font-display text-[.95rem] font-semibold uppercase tracking-[.16em]">
        {MONTHS[month]} {year}
      </div>
      <div className="cal-grid">
        {DOW.map((d, i) => (
          <div key={i} className="cal-dow" aria-hidden="true">
            {d}
          </div>
        ))}

        {Array.from({ length: lead }, (_, i) => (
          <span key={`blank-${i}`} className="cal-day cal-day--blank" aria-hidden="true" />
        ))}

        {Array.from({ length: days }, (_, i) => {
          const d = new Date(year, month, i + 1);
          const isStart = !!from && +d === +from;
          const isEnd = !!end && +d === +end;
          const inRange = !!from && !!end && d > from && d < end;
          const disabled = !isSelectable(d, from, to);

          const cls = ["cal-day"];
          if (inRange) cls.push("cal-day--mid");
          if (isStart) cls.push("cal-day--pick", "cal-day--start");
          if (isEnd) cls.push("cal-day--pick", "cal-day--end");

          return (
            <button
              key={iso(d)}
              type="button"
              className={cls.join(" ")}
              disabled={disabled}
              aria-pressed={isStart || isEnd}
              aria-label={pretty(d)}
              onClick={() => onPick(d)}
              onMouseEnter={() => !disabled && onHover(d)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
