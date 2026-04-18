import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { LoginForm } from "@/components/login-form";

export default function GalleryLogin() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Login"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Auth · shadcn block"
          title="Login"
          sub="shadcn login-01 block pulled from the registry. Source: src/components/login-form.tsx — mount under src/app/ when you wire the real auth route."
        />
        <Card>
          <CardHead title="Live" sub="Try typing anything — form is state-only in the gallery" />
          <CardBody>
            <div className="grid place-items-center py-6">
              <LoginForm />
            </div>
          </CardBody>
        </Card>
      </Page>
    </>
  );
}
