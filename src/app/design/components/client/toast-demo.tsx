"use client";

import { toast } from "sonner";

import { Button } from "@/components/orbit/button";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        onClick={() => toast("Event created", { description: "Sunday, Dec 03, 2026 at 9:00 AM" })}
      >
        Default
      </Button>
      <Button
        variant="primary"
        onClick={() =>
          toast.success("Deployed to production", { description: "atlas-web · dpl_x8Ra · 1m 24s" })
        }
      >
        Success
      </Button>
      <Button onClick={() => toast.info("Build queued", { description: "2 jobs ahead in queue" })}>
        Info
      </Button>
      <Button
        onClick={() =>
          toast.warning("Secret rotates in 3 days", {
            description: "STRIPE_WEBHOOK_KEY · atlas-api · production",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="accent"
        onClick={() =>
          toast.error("Deploy failed", {
            description: "Build exited with code 1. See logs for details.",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          const id = toast.loading("Shipping to production…");
          setTimeout(() => toast.success("Shipped", { id, description: "atlas-web @ main" }), 1600);
        }}
      >
        Loading → success
      </Button>
      <Button
        onClick={() =>
          toast("Session expired", {
            description: "Sign back in to continue.",
            action: { label: "Sign in", onClick: () => toast.success("Signed in") },
            cancel: { label: "Dismiss", onClick: () => {} },
          })
        }
      >
        Action + cancel
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast.promise(new Promise((res) => setTimeout(res, 1800)), {
            loading: "Promoting dpl_pK3m…",
            success: "Promoted to production",
            error: "Promotion rejected",
          })
        }
      >
        Promise
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          toast("Custom content", {
            description: "Any ReactNode works as description.",
            icon: "✦",
            duration: 3000,
          })
        }
      >
        Custom
      </Button>
    </div>
  );
}
