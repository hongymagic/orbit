"use client";

import * as React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { LoginForm } from "@/components/login-form";
import { SearchForm } from "@/components/search-form";
import { SectionCards } from "@/components/section-cards";
import { SettingsDialog } from "@/components/settings-dialog";
import { SiteHeader } from "@/components/site-header";
import { TeamSwitcher } from "@/components/team-switcher";
import { VersionSwitcher } from "@/components/version-switcher";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AudioWaveform, Command as CommandIcon, GalleryVerticalEnd } from "lucide-react";

export function AppSidebarDemo() {
  return (
    <div
      className="relative overflow-hidden rounded-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
      style={{ height: 580 }}
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
          <div className="p-6 text-sm text-muted-foreground">Main content area.</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export function SiteHeaderDemo() {
  return (
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
  );
}

export function SectionCardsDemo() {
  return (
    <div className="w-full @container/main">
      <SectionCards />
    </div>
  );
}

export function SettingsDialogDemo() {
  return (
    <div className="flex items-center justify-center py-8">
      <SettingsDialog />
    </div>
  );
}

export function SearchFormDemo() {
  return (
    <SidebarProvider>
      <div className="w-full max-w-sm rounded-sm overflow-hidden bg-sidebar shadow-[inset_0_0_0_1px_var(--color-line)] p-2">
        <SearchForm />
      </div>
    </SidebarProvider>
  );
}

export function TeamSwitcherDemo() {
  return (
    <SidebarProvider>
      <div className="w-full max-w-sm rounded-sm overflow-hidden bg-sidebar shadow-[inset_0_0_0_1px_var(--color-line)] p-2">
        <Sidebar collapsible="none" className="w-full">
          <SidebarHeader>
            <TeamSwitcher
              teams={[
                { name: "Acme Inc.", logo: GalleryVerticalEnd, plan: "Enterprise" },
                { name: "Atlas Labs", logo: AudioWaveform, plan: "Pro" },
                { name: "Evil Corp.", logo: CommandIcon, plan: "Hobby" },
              ]}
            />
          </SidebarHeader>
          <SidebarContent />
          <SidebarFooter />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}

export function VersionSwitcherDemo() {
  return (
    <SidebarProvider>
      <div className="w-full max-w-sm rounded-sm overflow-hidden bg-sidebar shadow-[inset_0_0_0_1px_var(--color-line)] p-2">
        <Sidebar collapsible="none" className="w-full">
          <SidebarHeader>
            <VersionSwitcher
              versions={["1.0.1", "1.1.0-alpha", "2.0.0-beta"]}
              defaultVersion="1.0.1"
            />
          </SidebarHeader>
          <SidebarContent />
          <SidebarFooter />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}

export function LoginFormDemo() {
  return (
    <div className="w-full max-w-md">
      <LoginForm />
    </div>
  );
}

export function ChartAreaInteractiveDemo() {
  return (
    <div className="w-full @container/main">
      <ChartAreaInteractive />
    </div>
  );
}

const tableData = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover Page",
    status: "In Progress",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of Contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive summary",
    type: "Narrative",
    status: "Done",
    target: "10",
    limit: "13",
    reviewer: "Eddie Lake",
  },
  {
    id: 4,
    header: "Technical approach",
    type: "Narrative",
    status: "Done",
    target: "27",
    limit: "23",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 5,
    header: "Design",
    type: "Narrative",
    status: "In Progress",
    target: "2",
    limit: "16",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 6,
    header: "Capabilities",
    type: "Narrative",
    status: "In Progress",
    target: "20",
    limit: "8",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 7,
    header: "Integration with existing systems",
    type: "Narrative",
    status: "In Progress",
    target: "19",
    limit: "21",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 8,
    header: "Innovation and Advantages",
    type: "Narrative",
    status: "Done",
    target: "25",
    limit: "26",
    reviewer: "Assign reviewer",
  },
];

export function DataTableDemo() {
  return (
    <div className="w-full @container/main">
      <DataTable data={tableData} />
    </div>
  );
}
