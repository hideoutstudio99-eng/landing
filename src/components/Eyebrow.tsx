import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-[.8rem] font-medium uppercase tracking-[.3em] text-brand">
      {children}
    </p>
  );
}
