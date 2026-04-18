"use client";

import { useState } from "react";

import { NotificationsPanel } from "@/components/layout/notifications-panel";
import { Button } from "@/components/orbit/button";
import { Icon } from "@/components/icons";

export function NotificationsTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icon name="bell" /> Open notifications
      </Button>
      <NotificationsPanel open={open} onOpenChange={setOpen} />
    </>
  );
}
