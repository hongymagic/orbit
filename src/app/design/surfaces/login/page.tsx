import Link from "next/link";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Icon } from "@/components/icons";
import { LoginForm } from "@/components/login-form";

export default function GalleryLogin() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Login"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Auth · shadcn block"
          title="Login"
          sub="shadcn login-01 block pulled from the registry. Source: src/components/login-form.tsx. Real route: /login."
          actions={
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-sm bg-fg text-bg font-medium text-[13px]"
            >
              Open /login <Icon name="chev" className="rotate-[-90deg]" />
            </Link>
          }
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
