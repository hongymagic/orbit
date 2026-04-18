import { cn } from "@/lib/utils";

export function Sparkline({
  data,
  color = "var(--color-accent)",
  width = 72,
  height = 24,
  className,
  strokeWidth = 1.25,
  area = false,
}: {
  data: readonly number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
  area?: boolean;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return { x, y };
  });
  const line = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaD = area ? `M 0,${height} L ${line.replace(/ /g, " L ")} L ${width},${height} Z` : null;
  return (
    <svg
      className={cn("opacity-60", className)}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {areaD ? <path d={areaD} fill={color} fillOpacity={0.12} /> : null}
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
