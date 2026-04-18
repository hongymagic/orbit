import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Badge } from "@/components/orbit/badge";
import { AiDemo } from "./demo";

export default function AiDemoPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "AI elements"]} hideDeploy />
      <Page>
        <PageHead
          kicker="AI surfaces"
          title="ai-elements under Orbit tokens"
          sub="Vercel's ai-elements re-skinned through the Orbit token bridge. Every AI UI component inherits shadow-as-border, Geist type, and variation-aware theming — drop them into any surface and they already belong."
          actions={
            <Badge tone="info" dot>
              stubbed
            </Badge>
          }
        />

        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr" }}>
          <Card>
            <CardHead
              title="Conversation + Message"
              sub="src/components/ai-elements/{conversation,message}.tsx"
            />
            <CardBody>
              <AiDemo />
            </CardBody>
          </Card>
        </div>
      </Page>
    </>
  );
}
