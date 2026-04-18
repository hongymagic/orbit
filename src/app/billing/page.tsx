import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

import { BillingView } from "@/components/surfaces/billing-view";

export default function BillingPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <header className="flex flex-col gap-1">
                <h1 className="text-[22px] font-semibold tracking-[-0.02em]">Billing</h1>
                <p className="text-[14px] text-muted-foreground">
                  Plans, usage, and invoice history for this workspace.
                </p>
              </header>
              <BillingView />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
