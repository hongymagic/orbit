"use client";

import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap",
    "rounded-sm font-medium tracking-[-0.01em]",
    "transition-[background,box-shadow,transform] duration-100 ease-out",
    "active:translate-y-[0.5px]",
    "outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-transparent text-fg",
          "shadow-[inset_0_0_0_1px_var(--color-line)]",
          "hover:bg-bg-muted",
        ],
        primary: [
          "bg-fg text-bg",
          "hover:bg-[color-mix(in_oklab,var(--color-fg)_88%,var(--color-accent)_12%)]",
        ],
        accent: [
          "bg-accent text-accent-fg",
          "hover:bg-[color-mix(in_oklab,var(--color-accent)_88%,black)]",
        ],
        ghost: ["bg-transparent text-fg hover:bg-bg-muted"],
      },
      size: {
        sm: "h-6 px-2 text-[12px]",
        md: "h-7 px-2.5 text-[13px]",
        lg: "h-[34px] px-3.5 text-[14px]",
      },
      iconOnly: {
        true: "px-0",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-6" },
      { iconOnly: true, size: "md", class: "w-7" },
      { iconOnly: true, size: "lg", class: "w-[34px]" },
    ],
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
    iconOnly?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, iconOnly, asChild, ...props },
  ref,
) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonStyles({ variant, size, iconOnly }), className)}
      {...props}
    />
  );
});

export { buttonStyles };
