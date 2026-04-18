export type NotificationSeverity = "ok" | "info" | "warn" | "err";
export type NotificationBucket = "today" | "earlier";

export type Notification = {
  id: string;
  initials: string;
  actor: string;
  title: string;
  subtitle: string;
  time: string;
  bucket: NotificationBucket;
  severity: NotificationSeverity;
  unread: boolean;
  mention?: boolean;
  href?: string;
};

export const notifications: readonly Notification[] = [
  {
    id: "ntf_01",
    initials: "KP",
    actor: "Kian Park",
    title: "requested your review on #482",
    subtitle: "feat/billing-v2 · atlas-web",
    time: "4m",
    bucket: "today",
    severity: "info",
    unread: true,
    mention: true,
    href: "#",
  },
  {
    id: "ntf_02",
    initials: "··",
    actor: "Preview",
    title: "dpl_pK3m finished building",
    subtitle: "atlas-web-pk3m.orbit.app · 54s",
    time: "14m",
    bucket: "today",
    severity: "ok",
    unread: true,
  },
  {
    id: "ntf_03",
    initials: "··",
    actor: "Production",
    title: "Deploy failed on main",
    subtitle: "c45ff91 · build exited with code 1",
    time: "1h",
    bucket: "today",
    severity: "err",
    unread: true,
    href: "#",
  },
  {
    id: "ntf_04",
    initials: "RL",
    actor: "Rhea Lin",
    title: "promoted dpl_x8Ra to production",
    subtitle: "atlas-web · rolling restart",
    time: "2h",
    bucket: "today",
    severity: "ok",
    unread: false,
  },
  {
    id: "ntf_05",
    initials: "··",
    actor: "Scheduler",
    title: "Secret STRIPE_WEBHOOK_KEY rotates in 3 days",
    subtitle: "atlas-api · production",
    time: "3h",
    bucket: "today",
    severity: "warn",
    unread: true,
  },
  {
    id: "ntf_06",
    initials: "DS",
    actor: "Dana Soto",
    title: "rolled back atlas-api to c45ff91",
    subtitle: "incident.atlas.orbit.app/I-2104",
    time: "3h",
    bucket: "today",
    severity: "info",
    unread: false,
  },
  {
    id: "ntf_07",
    initials: "··",
    actor: "Edge",
    title: "atlas-edge latency degraded in sfo1",
    subtitle: "p50 88ms · 2× baseline",
    time: "5h",
    bucket: "today",
    severity: "warn",
    unread: false,
  },
  {
    id: "ntf_08",
    initials: "JM",
    actor: "Jules Morel",
    title: "accepted your invite",
    subtitle: "team · billing",
    time: "Yesterday",
    bucket: "earlier",
    severity: "ok",
    unread: false,
  },
  {
    id: "ntf_09",
    initials: "KP",
    actor: "Kian Park",
    title: "mentioned you in a comment",
    subtitle: "PR #478 · atlas-api",
    time: "Yesterday",
    bucket: "earlier",
    severity: "info",
    unread: false,
    mention: true,
  },
  {
    id: "ntf_10",
    initials: "··",
    actor: "Usage",
    title: "You used 62% of April build minutes",
    subtitle: "1,240 / 2,000 min",
    time: "Tue",
    bucket: "earlier",
    severity: "info",
    unread: false,
  },
  {
    id: "ntf_11",
    initials: "··",
    actor: "Domain",
    title: "Certificate renewed for atlas.orbit.app",
    subtitle: "Let's Encrypt · 90 days",
    time: "Mon",
    bucket: "earlier",
    severity: "ok",
    unread: false,
  },
  {
    id: "ntf_12",
    initials: "RL",
    actor: "Rhea Lin",
    title: "requested access to logs",
    subtitle: "atlas-api · production",
    time: "Mon",
    bucket: "earlier",
    severity: "info",
    unread: false,
  },
];
