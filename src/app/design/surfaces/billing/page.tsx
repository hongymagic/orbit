import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { BillingView } from "@/components/surfaces/billing-view";

export default function GalleryBilling() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Billing"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Plans + usage + invoices"
          title="Billing"
          sub="Tier cards (recommended tier uses accent ring), usage bars that warn past 75%, invoice table. Source: src/components/surfaces/billing-view.tsx."
        />
        <BillingView />
      </Page>
    </>
  );
}
