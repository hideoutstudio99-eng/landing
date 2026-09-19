import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex cursor-pointer items-center justify-center rounded-[3px] border-2 font-display font-semibold uppercase no-underline transition-colors";

const variants: Record<Variant, string> = {
  solid: "border-brand bg-brand text-white hover:border-brand-dk hover:bg-brand-dk",
  ghost: "border-line bg-transparent text-ink hover:border-ink",
};

const sizes: Record<Size, string> = {
  md: "px-[26px] py-[15px] text-[.92rem] tracking-[.12em]",
  sm: "px-[13px] py-[7px] text-[.74rem] tracking-[.12em]",
};

export const buttonStyles = (variant: Variant = "solid", size: Size = "md") =>
  `${base} ${variants[variant]} ${sizes[size]}`;

type Options = { variant?: Variant; size?: Size };

export function ButtonLink({
  href,
  variant,
  size,
  children,
}: Options & { href: string; children: ReactNode }) {
  return (
    <a href={href} className={buttonStyles(variant, size)}>
      {children}
    </a>
  );
}

export function Button({
  variant,
  size,
  type = "button",
  ...props
}: Options & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonStyles(variant, size)} {...props} />;
}
