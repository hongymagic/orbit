import { cn } from "@/lib/utils";

export type IconName =
  | "dash"
  | "deploy"
  | "git"
  | "logs"
  | "db"
  | "key"
  | "team"
  | "settings"
  | "plus"
  | "search"
  | "bell"
  | "cmd"
  | "chev"
  | "dots"
  | "check"
  | "x"
  | "play"
  | "globe"
  | "fn";

const paths: Record<IconName, React.ReactNode> = {
  dash: (
    <>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </>
  ),
  deploy: <path d="M2 11l6 3 6-3M2 8l6 3 6-3M8 2L2 5l6 3 6-3-6-3z" />,
  git: (
    <>
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="12" cy="8" r="1.5" />
      <path d="M4 5.5v5M5.5 4h3a2 2 0 012 2v.5" />
    </>
  ),
  logs: <path d="M2 3h12M2 6h12M2 9h8M2 12h10" />,
  db: (
    <>
      <ellipse cx="8" cy="3" rx="5" ry="1.5" />
      <path d="M3 3v10c0 .8 2.2 1.5 5 1.5s5-.7 5-1.5V3M3 8c0 .8 2.2 1.5 5 1.5s5-.7 5-1.5" />
    </>
  ),
  key: (
    <>
      <circle cx="5" cy="11" r="2.5" />
      <path d="M7 9.5l5-5M10 4l2 2M8.5 5.5l2 2" />
    </>
  ),
  team: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="11.5" cy="7" r="1.5" />
      <path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4M10 13c0-1.5 1-2.5 2.5-2.5S15 11.5 15 13" />
    </>
  ),
  settings: (
    <>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1v2M8 13v2M15 8h-2M3 8H1M13 3l-1.5 1.5M4.5 11.5L3 13M13 13l-1.5-1.5M4.5 4.5L3 3" />
    </>
  ),
  plus: <path d="M8 3v10M3 8h10" />,
  search: (
    <>
      <circle cx="7" cy="7" r="4" />
      <path d="M10 10l3 3" />
    </>
  ),
  bell: <path d="M4 6a4 4 0 018 0v3l1.5 2h-11L4 9V6zM6.5 13a1.5 1.5 0 003 0" />,
  cmd: (
    <>
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M5 7h6M5 10h4" />
    </>
  ),
  chev: <path d="M4 6l4 4 4-4" />,
  dots: (
    <>
      <circle cx="4" cy="8" r="1" />
      <circle cx="8" cy="8" r="1" />
      <circle cx="12" cy="8" r="1" />
    </>
  ),
  check: <path d="M3 8l3.5 3.5L13 5" />,
  x: <path d="M4 4l8 8M12 4l-8 8" />,
  play: <path d="M5 3l8 5-8 5z" />,
  globe: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M2 8h12M8 2c2 2 3 4 3 6s-1 4-3 6c-2-2-3-4-3-6s1-4 3-6z" />
    </>
  ),
  fn: <path d="M3 3l2 10 3-8 3 5 2-4" />,
};

const filled: Set<IconName> = new Set(["play"]);

export function Icon({
  name,
  className,
  size = 14,
  strokeWidth = 1.5,
  ...rest
}: {
  name: IconName;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
} & React.SVGAttributes<SVGSVGElement>) {
  const isFilled = filled.has(name);
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      stroke={isFilled ? undefined : "currentColor"}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isFilled ? "currentColor" : "none"}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export const iconNames: readonly IconName[] = Object.keys(paths) as IconName[];
