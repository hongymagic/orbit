import Link from "next/link";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";

export default function GalleryErrors() {
  return (
    <>
      <Topbar crumbs={["Design System", "Surfaces", "Errors"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Error boundaries"
          title="Errors"
          sub="404 and unhandled-error patterns, both using shadcn Empty. These previews match src/app/not-found.tsx and src/app/error.tsx."
        />
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))" }}
        >
          <Card>
            <CardHead title="404" sub="src/app/not-found.tsx" />
            <CardBody>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Icon name="search" size={28} />
                  </EmptyMedia>
                  <EmptyTitle>404 — Not found</EmptyTitle>
                  <EmptyDescription>
                    The page you requested doesn&apos;t exist or has moved.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex gap-2 justify-center">
                    <Button asChild>
                      <Link href="/">Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/_design">/_design</Link>
                    </Button>
                  </div>
                </EmptyContent>
              </Empty>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Unhandled error" sub="src/app/error.tsx" />
            <CardBody>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Icon name="bell" size={28} />
                  </EmptyMedia>
                  <EmptyTitle>Something broke</EmptyTitle>
                  <EmptyDescription>
                    Unexpected error rendering this page.
                    <span className="block mt-2 font-mono text-[11px] text-muted-foreground">
                      digest: a8f3e2
                    </span>
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <div className="flex gap-2 justify-center">
                    <Button>Try again</Button>
                    <Button asChild variant="outline">
                      <Link href="/">Home</Link>
                    </Button>
                  </div>
                </EmptyContent>
              </Empty>
            </CardBody>
          </Card>
        </div>
      </Page>
    </>
  );
}
