import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { DeploymentDetail } from "@/components/surfaces/deployment-detail";
import { deployments } from "@/data/deployments";

export default function GalleryDetail() {
  const deployment = deployments[0];
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Detail"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Split view"
          title="Deployment detail"
          sub={`Header + pipeline + build output + metadata sidebar. Source: src/components/surfaces/deployment-detail.tsx. Rendering dpl_${deployment.id}.`}
        />
        <DeploymentDetail deployment={deployment} />
      </Page>
    </>
  );
}
