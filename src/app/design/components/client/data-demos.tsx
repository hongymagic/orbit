"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {["atlas-web", "atlas-api", "atlas-edge", "atlas-admin"].map((label) => (
          <CarouselItem key={label} className="basis-full">
            <div className="h-24 flex items-center justify-center rounded-md bg-muted font-mono text-sm text-muted-foreground">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export function CollapsibleDemo() {
  return (
    <Collapsible className="max-w-sm">
      <CollapsibleTrigger asChild>
        <Button variant="outline" size="sm">
          Toggle details
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
        Revealed content — mount long log output, changelogs, or secondary fields here.
      </CollapsibleContent>
    </Collapsible>
  );
}
