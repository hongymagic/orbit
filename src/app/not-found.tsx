import Link from "next/link";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon name="search" size={28} />
          </EmptyMedia>
          <EmptyTitle>404 — Not found</EmptyTitle>
          <EmptyDescription>
            The page you requested doesn&apos;t exist or has moved. Try the design reference, or
            head to the dashboard.
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
    </main>
  );
}
