import { DesignSidebar } from "@/components/layout/design-sidebar";
import { AppShell } from "@/components/layout/page-shell";
import { TweaksPanel } from "@/components/tweaks/tweaks-panel";

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppShell sidebar={<DesignSidebar />}>{children}</AppShell>
      <TweaksPanel />
    </>
  );
}
