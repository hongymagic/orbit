import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { EmptyGallery } from "@/components/surfaces/empty-gallery";

export default function GalleryEmpty() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Empty states"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Empty states"
          title="Empty states"
          sub="Three common flavors using shadcn Empty — inbox / no-results / onboarding. Source: src/components/surfaces/empty-gallery.tsx."
        />
        <EmptyGallery />
      </Page>
    </>
  );
}
