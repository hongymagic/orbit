import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { SettingsView } from "@/components/surfaces/settings-view";

export default function GallerySettings() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Settings"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Tabs + forms"
          title="Settings"
          sub="Multi-tab settings with live state. Appearance tab mutates the live Theme/Accent/Variation providers. Real route: /settings."
        />
        <Card>
          <CardHead title="Live surface" sub="Changes persist — try swapping accents on the Appearance tab" />
          <CardBody>
            <SettingsView />
          </CardBody>
        </Card>
      </Page>
    </>
  );
}
