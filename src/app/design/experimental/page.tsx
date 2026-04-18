import { Topbar } from "@/components/layout/topbar";
import { VariationScope } from "@/components/layout/page-shell";
import { ExperimentalView } from "@/components/views/experimental-view";

export default function ExperimentalPage() {
  return (
    <VariationScope variation="experimental">
      <Topbar crumbs={["atlas-web", "Operations"]} />
      <ExperimentalView />
    </VariationScope>
  );
}
