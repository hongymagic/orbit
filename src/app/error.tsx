"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[orbit:error]", error);
  }, [error]);

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <Empty className="max-w-md">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon name="bell" size={28} />
          </EmptyMedia>
          <EmptyTitle>Something broke</EmptyTitle>
          <EmptyDescription>
            {error.message || "Unexpected error rendering this page."}
            {error.digest ? (
              <span className="block mt-2 font-mono text-[11px] text-muted-foreground">
                digest: {error.digest}
              </span>
            ) : null}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2 justify-center">
            <Button onClick={reset}>Try again</Button>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </main>
  );
}
