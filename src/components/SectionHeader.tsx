import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  /** Small red label above the heading. Without it, a short red rule is drawn instead. */
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

export function SectionHeader({ eyebrow, title, children }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : <hr className="m-0 h-[3px] w-[60px] border-0 bg-brand" />}
      <h2>{title}</h2>
      {children && <p className="text-[.875rem] text-ink-3">{children}</p>}
    </div>
  );
}
