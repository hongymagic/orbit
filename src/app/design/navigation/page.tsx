import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";

import { BrandMark } from "@/components/layout/brand-mark";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { DesignSidebar } from "@/components/layout/design-sidebar";

import { NavigationShowcase } from "./showcase";

export default function NavigationPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "Navigation"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Navigation gallery"
          title="Sidebars, switchers, headers"
          sub="Every shell, side-nav, and header surface — Orbit DesignSidebar + shadcn AppSidebar, plus nav-main / nav-projects / nav-documents / nav-user, team + version switchers, search form, and site header."
        />

        <Section
          title="Orbit DesignSidebar"
          path="src/components/layout/design-sidebar.tsx"
          description="The sticky sidebar used by every /_design route. Reads from src/lib/design-nav.ts and composes BrandMark + ProfileMenu."
        >
          <PreviewFrame height={540}>
            <DesignSidebar />
            <div className="flex-1 p-4 text-[12px] text-fg-subtle font-mono">
              main content area →
            </div>
          </PreviewFrame>
        </Section>

        <Section
          title="BrandMark + Avatar"
          path="src/components/layout/brand-mark.tsx"
          description="Monogram tile + circular avatar. Both size-parametric."
        >
          <div className="flex items-end gap-6">
            <div className="flex flex-col items-center gap-2">
              <BrandMark letter="A" size={20} />
              <span className="font-mono text-[10px] text-fg-subtle">20</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BrandMark letter="O" size={28} />
              <span className="font-mono text-[10px] text-fg-subtle">28</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BrandMark letter="O" size={40} />
              <span className="font-mono text-[10px] text-fg-subtle">40</span>
            </div>
          </div>
        </Section>

        <Section
          title="ProfileMenu"
          path="src/components/layout/profile-menu.tsx"
          description="Footer of every sidebar. Exposes theme, accent, variation, and sign-out. Live — try the submenus."
        >
          <div className="max-w-xs">
            <ProfileMenu
              user={{
                initials: "RL",
                name: "Rhea Lin",
                email: "rhea@orbit.app",
                role: "platform · admin",
              }}
            />
          </div>
        </Section>

        <NavigationShowcase />
      </Page>
    </>
  );
}

function Section({
  title,
  path,
  description,
  children,
}: {
  title: string;
  path: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <Card>
        <CardHead
          title={title}
          sub={description}
          actions={<span className="font-mono text-[11px] text-fg-subtle">{path}</span>}
        />
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}

function PreviewFrame({ height = 480, children }: { height?: number; children: React.ReactNode }) {
  return (
    <div
      className="flex overflow-hidden rounded-sm bg-bg shadow-[inset_0_0_0_1px_var(--color-line)]"
      style={{ height }}
    >
      {children}
    </div>
  );
}
