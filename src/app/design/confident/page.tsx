import { Topbar } from "@/components/layout/topbar";
import { VariationScope } from "@/components/layout/page-shell";
import { ConfidentView } from "@/components/views/confident-view";

export default function ConfidentPage() {
  return (
    <VariationScope variation="confident">
      <Topbar crumbs={["atlas-web", "Overview"]} />
      <ConfidentView />
    </VariationScope>
  );
}
