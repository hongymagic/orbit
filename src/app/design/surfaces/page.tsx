import Link from "next/link";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Icon } from "@/components/icons";

type Surface = {
  title: string;
  description: string;
  gallery: string;
  product?: string;
};

const surfaces: readonly Surface[] = [
  {
    title: "Signup",
    description: "Zod-validated signup form with error toasts.",
    gallery: "/_design/surfaces/signup",
    product: "/signup",
  },
  {
    title: "Login",
    description: "shadcn login-01 block — email + password + brand header.",
    gallery: "/_design/surfaces/login",
    product: "/login",
  },
  {
    title: "Settings",
    description:
      "Tabs for Profile · Appearance · Team · Notifications. Live state wired to providers.",
    gallery: "/_design/surfaces/settings",
    product: "/settings",
  },
  {
    title: "Billing",
    description: "Plan cards, live usage meters, invoice table.",
    gallery: "/_design/surfaces/billing",
    product: "/billing",
  },
  {
    title: "Empty states",
    description: "Three common empty-state flavors (inbox, search, onboarding).",
    gallery: "/_design/surfaces/empty",
  },
  {
    title: "Errors",
    description: "error.tsx + not-found.tsx patterns using shadcn Empty.",
    gallery: "/_design/surfaces/errors",
  },
  {
    title: "Deployment detail",
    description: "Header, pipeline, build output, metadata sidebar.",
    gallery: "/_design/surfaces/detail",
  },
];

export default function SurfacesIndex() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Product-ready"
          title="Surfaces"
          sub="Full pages, wired and ready to clone. Each surface's implementation lives in src/components/surfaces/ and is mounted at BOTH /_design/surfaces/… (reference) AND the real product path (e.g. /signup, /settings, /billing) so you can preview in context or use directly."
        />
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {surfaces.map((s) => (
            <Card key={s.title}>
              <CardHead title={s.title} />
              <CardBody>
                <div className="text-[13px] text-fg-muted leading-[1.55] mb-3">{s.description}</div>
                <div className="flex items-center gap-2">
                  <Link
                    href={s.gallery as never}
                    className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-sm bg-fg text-bg text-[12px] font-medium hover:opacity-90"
                  >
                    Gallery view <Icon name="chev" className="rotate-[-90deg]" />
                  </Link>
                  {s.product ? (
                    <Link
                      href={s.product as never}
                      className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-sm text-[12px] font-medium text-fg-muted hover:text-fg shadow-[inset_0_0_0_1px_var(--color-line)]"
                    >
                      Real route <Icon name="chev" className="rotate-[-90deg]" />
                    </Link>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Page>
    </>
  );
}
