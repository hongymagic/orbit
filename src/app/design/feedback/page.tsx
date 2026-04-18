import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icon } from "@/components/icons";

import { ToastDemo } from "../components/client/toast-demo";
import { NotificationsTrigger } from "./notifications-trigger";

export default function FeedbackPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "Feedback"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Feedback surfaces"
          title="Toasts, alerts, notifications"
          sub="Every surface that talks back — ephemeral toasts via sonner, durable alerts, and the NotificationsPanel sheet. All wired to /api/mocks/* so the template has something real to render."
        />

        <div
          className="grid gap-4 mb-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))" }}
        >
          <Card>
            <CardHead
              title="Toasts"
              sub="sonner + src/components/ui/sonner.tsx"
              actions={<span className="font-mono text-[10px] text-fg-subtle">toast(…)</span>}
            />
            <CardBody>
              <p className="text-[13px] text-fg-muted mb-3">
                Every sonner variant. Toaster is mounted in{" "}
                <code className="font-mono text-[12px]">src/providers/index.tsx</code> so these
                calls work from anywhere.
              </p>
              <ToastDemo />
            </CardBody>
          </Card>

          <Card>
            <CardHead
              title="Notifications panel"
              sub="src/components/layout/notifications-panel.tsx"
              actions={
                <span className="font-mono text-[10px] text-fg-subtle">
                  Sheet · /api/mocks/notifications
                </span>
              }
            />
            <CardBody>
              <p className="text-[13px] text-fg-muted mb-3">
                Client-side Sheet that fetches{" "}
                <code className="font-mono text-[12px]">/api/mocks/notifications</code>. Filters by
                All / Unread / Mentions, grouped into Today / Earlier. The bell icon in every Topbar
                opens this panel by default.
              </p>
              <NotificationsTrigger />
            </CardBody>
          </Card>
        </div>

        <Card className="mb-4">
          <CardHead
            title="Alerts"
            sub="src/components/ui/alert.tsx"
            actions={<span className="font-mono text-[10px] text-fg-subtle">durable · inline</span>}
          />
          <CardBody className="space-y-3">
            <Alert>
              <Icon name="info" />
              <AlertTitle>Preview ready</AlertTitle>
              <AlertDescription>atlas-web-pk3m.orbit.app · built in 54s.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Icon name="alert" />
              <AlertTitle>Deploy failed</AlertTitle>
              <AlertDescription>
                Build exited with code 1. Check the build logs for details.
              </AlertDescription>
            </Alert>
            <Alert>
              <Icon name="clock" />
              <AlertTitle>Secret rotates in 3 days</AlertTitle>
              <AlertDescription>STRIPE_WEBHOOK_KEY · atlas-api · production.</AlertDescription>
            </Alert>
          </CardBody>
        </Card>
      </Page>
    </>
  );
}
