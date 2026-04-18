import type { ActivityEvent } from "@/components/data/activity";

export const activityToday: readonly ActivityEvent[] = [
  {
    initials: "KP",
    actor: "Kian Park",
    verb: "opened PR",
    object: "#482 feat/billing-v2",
    time: "14m",
  },
  {
    initials: "RL",
    actor: "Rhea Lin",
    verb: "promoted",
    object: "dpl_x8Ra → production",
    time: "2h",
  },
  {
    initials: "DS",
    actor: "Dana Soto",
    verb: "rolled back",
    object: "atlas-api to c45ff91",
    time: "3h",
  },
  { initials: "··", actor: "scheduler", verb: "deployed", object: "atlas-edge cron", time: "3h" },
  {
    initials: "RL",
    actor: "Rhea Lin",
    verb: "updated secret",
    object: "STRIPE_WEBHOOK_KEY",
    time: "5h",
  },
];
