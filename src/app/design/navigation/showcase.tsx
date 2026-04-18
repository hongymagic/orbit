"use client";

import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";
import {
  AudioWaveform,
  Command as CommandIcon,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { VersionSwitcher } from "@/components/version-switcher";
import { SearchForm } from "@/components/search-form";
import { SiteHeader } from "@/components/site-header";

import { Card, CardBody, CardHead } from "@/components/orbit/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

const navMain = [
  { title: "Dashboard", url: "#", icon: IconDashboard },
  { title: "Lifecycle", url: "#", icon: IconListDetails },
  { title: "Analytics", url: "#", icon: IconChartBar },
  { title: "Projects", url: "#", icon: IconFolder },
  { title: "Team", url: "#", icon: IconUsers },
];

const navSecondary = [
  { title: "Settings", url: "#", icon: IconSettings },
  { title: "Get Help", url: "#", icon: IconHelp },
  { title: "Search", url: "#", icon: IconSearch },
];

const documents = [
  { name: "Data Library", url: "#", icon: IconDatabase },
  { name: "Reports", url: "#", icon: IconReport },
  { name: "Word Assistant", url: "#", icon: IconFileWord },
];

const projects = [
  { name: "Atlas Platform", url: "#", icon: Map },
  { name: "Edge Analytics", url: "#", icon: PieChart },
  { name: "Growth Experiments", url: "#", icon: IconChartBar },
];

const teams = [
  { name: "Acme Inc.", logo: GalleryVerticalEnd, plan: "Enterprise" },
  { name: "Atlas Labs", logo: AudioWaveform, plan: "Pro" },
  { name: "Evil Corp.", logo: CommandIcon, plan: "Hobby" },
];

const user = {
  name: "Rhea Lin",
  email: "rhea@orbit.app",
  avatar: "/avatars/shadcn.jpg",
};

export function NavigationShowcase() {
  return (
    <>
      <div className="mb-4">
        <Card>
          <CardHead
            title="shadcn AppSidebar"
            sub="Full sidebar block — collapsible=offcanvas · team header · nav-main · documents · secondary · user."
            actions={
              <span className="font-mono text-[11px] text-fg-subtle">
                src/components/app-sidebar.tsx
              </span>
            }
          />
          <CardBody>
            <div
              className="relative overflow-hidden rounded-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
              style={{ height: 540 }}
            >
              <SidebarProvider
                style={
                  {
                    "--sidebar-width": "16rem",
                    "--header-height": "3rem",
                  } as React.CSSProperties
                }
              >
                <AppSidebar />
                <SidebarInset>
                  <SiteHeader />
                  <div className="p-6 text-sm text-muted-foreground">
                    Main content area — the AppSidebar mounts inside a SidebarProvider and pairs
                    with SiteHeader at the top.
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </div>
          </CardBody>
        </Card>
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        <PanelCard
          title="nav-main"
          path="src/components/nav-main.tsx"
          description="Quick-create + icon list. Used as the primary section in AppSidebar."
        >
          <NavMain items={navMain} />
        </PanelCard>

        <PanelCard
          title="nav-projects"
          path="src/components/nav-projects.tsx"
          description="Grouped links with per-row dropdown menu."
        >
          <NavProjects projects={projects} />
        </PanelCard>

        <PanelCard
          title="nav-documents"
          path="src/components/nav-documents.tsx"
          description="Documents grouping with show-on-hover actions."
        >
          <NavDocuments items={documents} />
        </PanelCard>

        <PanelCard
          title="nav-secondary"
          path="src/components/nav-secondary.tsx"
          description="Lower-priority section (settings / help / search)."
        >
          <NavSecondary items={navSecondary} />
        </PanelCard>

        <PanelCard
          title="nav-user"
          path="src/components/nav-user.tsx"
          description="Avatar + name + menu. Usually lives in SidebarFooter."
        >
          <NavUser user={user} />
        </PanelCard>

        <PanelCard
          title="team-switcher"
          path="src/components/team-switcher.tsx"
          description="Multi-team dropdown with per-item shortcuts."
        >
          <TeamSwitcher teams={teams} />
        </PanelCard>

        <PanelCard
          title="version-switcher"
          path="src/components/version-switcher.tsx"
          description="Documentation version picker."
        >
          <VersionSwitcher
            versions={["1.0.1", "1.1.0-alpha", "2.0.0-beta"]}
            defaultVersion="1.0.1"
          />
        </PanelCard>

        <PanelCard
          title="search-form"
          path="src/components/search-form.tsx"
          description="Sidebar-aware search input."
        >
          <SearchForm />
        </PanelCard>
      </div>

      <div className="mt-4">
        <Card>
          <CardHead
            title="site-header"
            sub="Top bar with collapse trigger and utility actions."
            actions={
              <span className="font-mono text-[11px] text-fg-subtle">
                src/components/site-header.tsx
              </span>
            }
          />
          <CardBody>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "16rem",
                  "--header-height": "3rem",
                } as React.CSSProperties
              }
              defaultOpen={false}
            >
              <div className="w-full rounded-sm overflow-hidden shadow-[inset_0_0_0_1px_var(--color-line)]">
                <SiteHeader />
              </div>
            </SidebarProvider>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

function PanelCard({
  title,
  path,
  description,
  children,
}: {
  title: string;
  path: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHead
        title={title}
        sub={description}
        actions={<span className="font-mono text-[11px] text-fg-subtle">{path}</span>}
      />
      <CardBody>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "16rem",
            } as React.CSSProperties
          }
        >
          <div className="w-full rounded-sm overflow-hidden bg-sidebar shadow-[inset_0_0_0_1px_var(--color-line)]">
            <Sidebar collapsible="none" className="w-full">
              <SidebarHeader />
              <SidebarContent>{children}</SidebarContent>
              <SidebarFooter />
            </Sidebar>
          </div>
        </SidebarProvider>
      </CardBody>
    </Card>
  );
}
