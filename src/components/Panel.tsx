import type { ElementType, HTMLAttributes } from "react";

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** Red top border. */
  accent?: boolean;
};

export function Panel({ as: Tag = "div", accent, className = "", ...props }: PanelProps) {
  return (
    <Tag
      className={`rounded-lg border border-line bg-ground p-[22px] ${
        accent ? "border-t-[3px] border-t-brand" : ""
      } ${className}`}
      {...props}
    />
  );
}
