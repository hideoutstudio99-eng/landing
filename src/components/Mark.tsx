/* The Hideout Studios mark: a door-hanger with a bed and lamp inside. Colours come from theme tokens. */

function BedShapes() {
  return (
    <>
      <rect className="fill-ink" x="146" y="284" width="5" height="110" rx="2" />
      <path className="fill-ink" d="M120 430l14-38h32l14 38z" />
      <circle className="fill-sun" cx="148" cy="442" r="11" />
      <rect className="fill-ink" x="98" y="476" width="34" height="30" rx="8" />
      <rect className="fill-ink" x="136" y="476" width="34" height="30" rx="8" />
      <rect className="fill-ink" x="88" y="504" width="124" height="54" rx="13" />
      <path className="fill-current" d="M102 510c9-7 22-7 31 0l-7 46c-6 4-12 4-18 0z" />
      <rect className="fill-ink" x="78" y="556" width="144" height="12" rx="3" />
      <rect className="fill-ink" x="88" y="568" width="10" height="16" rx="2" />
      <rect className="fill-ink" x="202" y="568" width="10" height="16" rx="2" />
    </>
  );
}

export function DoorHangerMark({ className }: { className?: string }) {
  return (
    <svg
      className={`block text-brand ${className ?? ""}`}
      viewBox="0 0 300 660"
      role="img"
      aria-label="Hideout Studios door-hanger logo"
    >
      <path
        className="fill-current"
        d="M150 22C80 22 22 80 22 150v456c0 30 18 48 48 48h160c30 0 48-18 48-48V150C278 80 220 22 150 22z"
      />
      <circle className="fill-ground" cx="150" cy="150" r="64" />
      <path className="fill-ground" d="M62 600V372c0-49 39-88 88-88s88 39 88 88v228z" />
      <BedShapes />
    </svg>
  );
}

/** Just the bed and lamp, cropped tight. */
export function BedMark({ className }: { className?: string }) {
  return (
    <svg
      className={`block text-brand ${className ?? ""}`}
      viewBox="60 270 180 330"
      aria-hidden="true"
    >
      <BedShapes />
    </svg>
  );
}
