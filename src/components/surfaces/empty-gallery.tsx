"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";

export function EmptyGallery() {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Inbox empty</CardTitle>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon name="bell" size={24} />
              </EmptyMedia>
              <EmptyTitle>All caught up</EmptyTitle>
              <EmptyDescription>You have no notifications in the last 24 hours.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                View archive
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>No results</CardTitle>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon name="search" size={24} />
              </EmptyMedia>
              <EmptyTitle>No deployments found</EmptyTitle>
              <EmptyDescription>
                Try a different branch filter or clear the date range.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Icon name="plus" size={24} />
              </EmptyMedia>
              <EmptyTitle>Link your first repo</EmptyTitle>
              <EmptyDescription>
                Orbit will start deploying previews on every push.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">
                <Icon name="git" /> Connect GitHub
              </Button>
              <Button variant="ghost" size="sm">
                Paste a repo URL
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </div>
  );
}
