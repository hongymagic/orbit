import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { SignupForm } from "@/components/surfaces/signup-form";

export default function GallerySignup() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Signup"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Auth"
          title="Signup"
          sub="Zod-validated form with inline errors and success toast. Source: src/components/surfaces/signup-form.tsx. Real route: /signup."
        />
        <Card>
          <CardHead title="Live form" sub="Submit to trigger the success toast (no backend call)" />
          <CardBody>
            <div className="grid place-items-center">
              <SignupForm />
            </div>
          </CardBody>
        </Card>
      </Page>
    </>
  );
}
