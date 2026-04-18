import { Topbar } from "@/components/layout/topbar";
import { VariationScope } from "@/components/layout/page-shell";
import { ConservativeView } from "@/components/views/conservative-view";

export default function ConservativePage() {
  return (
    <VariationScope variation="conservative">
      <Topbar crumbs={["atlas-web", "Deployments"]} />
      <ConservativeView />
    </VariationScope>
  );
}
