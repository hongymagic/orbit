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
  | "fn"
  | "info"
  | "alert"
  | "clock"
  | "rocket"
  | "code"
  | "terminal"
  | "trash"
  | "edit"
  | "copy"
  | "refresh"
  | "ext"
  | "arrow-up"
  | "arrow-down";

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
  info: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7.5v4M8 5v.5" />
    </>
  ),
  alert: (
    <>
      <path d="M8 2l6.5 11h-13z" />
      <path d="M8 6.5v3.5M8 12v.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M10.5 2.5c-2.5 0-4.5 2-6 4L3 7l2 2 2 2 .5-1.5c2-1.5 4-3.5 4-6L10.5 2.5z" />
      <path d="M6 10l-2 2 .5 1.5L6 13M9 7a1 1 0 100-2 1 1 0 000 2z" />
    </>
  ),
  code: <path d="M5 4l-3 4 3 4M11 4l3 4-3 4M9.5 3l-3 10" />,
  terminal: (
    <>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <path d="M5 7l2 1.5L5 10M8.5 10h3" />
    </>
  ),
  trash: (
    <>
      <path d="M3 5h10M5.5 5V3h5v2M5 5l.5 9h5L11 5M7 8v3M9 8v3" />
    </>
  ),
  edit: <path d="M2.5 13.5L3 11l7-7 2.5 2.5-7 7-2.5.5zM9 5l2 2" />,
  copy: (
    <>
      <rect x="5" y="5" width="9" height="9" rx="1" />
      <path d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2" />
    </>
  ),
  refresh: (
    <>
      <path d="M13.5 8a5.5 5.5 0 11-1.6-3.9M13.5 2.5V5h-2.5" />
    </>
  ),
  ext: (
    <>
      <path d="M6 3H3v10h10v-3M9 3h4v4M8 8l5-5" />
    </>
  ),
  "arrow-up": <path d="M8 13V3M4 7l4-4 4 4" />,
  "arrow-down": <path d="M8 3v10M4 9l4 4 4-4" />,
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
