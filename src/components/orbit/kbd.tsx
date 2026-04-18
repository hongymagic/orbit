import { cn } from "@/lib/utils";

/**
 * Keyboard shortcut hint. Matches the reference `<kbd>` recipe:
 * 10px mono, fg-subtle, 2px/5px padding, 3px radius, 1px inset line ring.
 *
 * Use for ⌘K / ⌘. hints in search chips, command palette items, menu
 * accelerators. Always horizontal, always inline.
 */
export function Kbd({ children, className, ...rest }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center font-mono text-[10px] leading-none",
        "text-fg-subtle",
        "px-[5px] py-[2px] rounded-[3px]",
        "shadow-[inset_0_0_0_1px_var(--color-line)]",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
}
