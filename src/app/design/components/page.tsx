import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Button } from "@/components/orbit/button";
import { Badge } from "@/components/orbit/badge";
import { Metric, MetricGrid } from "@/components/orbit/metric";
import { Sparkline } from "@/components/orbit/sparkline";
import { Kbd as OrbitKbd } from "@/components/orbit/kbd";
import { Icon, iconNames } from "@/components/icons";
import { Pipeline, PipelineArrow, PipelineStep } from "@/components/data/pipeline";
import { Activity } from "@/components/data/activity";
import { Console } from "@/components/data/console";
import { activityToday } from "@/data/activity";
import { buildLogs } from "@/data/logs";
import { sparkDeployments } from "@/data/sparks";

// shadcn primitives
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge as ShadcnBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Kbd as ShadcnKbd, KbdGroup } from "@/components/ui/kbd";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Label } from "@/components/ui/label";

// client islands
import { ToastDemo } from "./client/toast-demo";
import {
  CheckboxDemo,
  FieldComposedDemo,
  InputDemo,
  InputGroupDemo,
  NativeSelectDemo,
  SelectDemo,
  SwitchDemo,
  TextareaDemo,
  ToggleDemo,
} from "./client/form-demo";
import {
  CommandDemo,
  ComboboxDemo,
  DialogDemo,
  DrawerDemo,
  DropdownMenuDemo,
  HoverCardDemo,
  PopoverDemo,
  SheetDemo,
  TooltipDemo,
} from "./client/overlay-demos";
import { CarouselDemo, CollapsibleDemo } from "./client/data-demos";

export default function ComponentsPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "Components"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Gallery"
          title="Components"
          sub="Every atom and composite, every variant, rendered in-place. Source paths listed on each card — copy the patterns into product surfaces."
        />

        <Group label="Orbit atoms" />

        <Section
          title="Button"
          path="src/components/orbit/button.tsx"
          description="4 variants × 3 sizes + icon-only. Uses radix Slot for asChild."
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button iconOnly aria-label="Settings">
              <Icon name="settings" />
            </Button>
            <Button iconOnly size="sm" aria-label="More">
              <Icon name="dots" />
            </Button>
            <Button>
              <Icon name="plus" /> New deployment
            </Button>
          </div>
        </Section>

        <Section
          title="Badge"
          path="src/components/orbit/badge.tsx"
          description="5 tones × shadow-bordered or solid · optional dot indicator."
        >
          <div className="flex items-center gap-3 flex-wrap">
            <Badge>Neutral</Badge>
            <Badge tone="ok" dot>
              Ready
            </Badge>
            <Badge tone="info" dot>
              Building
            </Badge>
            <Badge tone="warn" dot>
              Queued
            </Badge>
            <Badge tone="err" dot>
              Failed
            </Badge>
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <Badge tone="neutral" solid>
              v0.1
            </Badge>
            <Badge tone="info" solid>
              Preview
            </Badge>
            <Badge tone="ok" solid>
              Deployed
            </Badge>
          </div>
        </Section>

        <Section
          title="Metric grid"
          path="src/components/orbit/metric.tsx"
          description="4 equal cells, inline sparkline, shared outer shadow."
        >
          <MetricGrid>
            <Metric
              label="Deployments · 7d"
              value="247"
              delta="+18"
              deltaDir="up"
              data={sparkDeployments}
            />
            <Metric label="Avg build time" value="1m 12s" delta="−9s" deltaDir="up" />
            <Metric label="Success rate" value="99.8%" delta="+0.2 pp" deltaDir="up" />
            <Metric label="Active branches" value="18" delta="+2" deltaDir="up" />
          </MetricGrid>
        </Section>

        <Section
          title="Sparkline"
          path="src/components/orbit/sparkline.tsx"
          description="Line-only by default. Pass `area` for filled variant."
        >
          <div className="flex items-center gap-6">
            <Sparkline data={sparkDeployments} />
            <Sparkline data={sparkDeployments} area />
            <Sparkline data={sparkDeployments} color="var(--color-success)" />
            <Sparkline data={sparkDeployments} color="var(--color-error)" />
          </div>
        </Section>

        <Section
          title="Pipeline"
          path="src/components/data/pipeline.tsx"
          description="Develop · Preview · Ship accents typed into the stage prop."
        >
          <Pipeline>
            <PipelineStep
              stage="develop"
              label="Develop"
              title="feat/billing-v2"
              sub="3 commits ahead"
            />
            <PipelineArrow />
            <PipelineStep
              stage="preview"
              label="Preview"
              title="dpl_pK3m"
              sub="building · 22s ETA"
            />
            <PipelineArrow />
            <PipelineStep stage="ship" label="Ship" title="Requires approval" sub="2 reviewers" />
          </Pipeline>
        </Section>

        <Section
          title="Activity"
          path="src/components/data/activity.tsx"
          description="Avatar + actor + verb + object + time."
        >
          <Activity events={activityToday} />
        </Section>

        <Section
          title="Console / LogRow"
          path="src/components/data/console.tsx"
          description="Monospace log stream with level coloring. Fixed grid columns."
        >
          <Console entries={buildLogs.slice(0, 6)} maxHeight={220} />
        </Section>

        <Section
          title="Kbd"
          path="src/components/orbit/kbd.tsx"
          description="Keyboard-shortcut hint. 10px mono, fg-subtle, inset line ring."
        >
          <div className="flex items-center gap-3 flex-wrap">
            <OrbitKbd>⌘K</OrbitKbd>
            <OrbitKbd>⌘.</OrbitKbd>
            <OrbitKbd>⇧⌘Q</OrbitKbd>
            <OrbitKbd>Enter</OrbitKbd>
            <OrbitKbd>Esc</OrbitKbd>
            <OrbitKbd>j</OrbitKbd>
            <OrbitKbd>k</OrbitKbd>
          </div>
        </Section>

        <Section
          title="Icons"
          path="src/components/icons.tsx"
          description={`${iconNames.length} bespoke 16×16 stroke icons. Import <Icon name="…" />.`}
        >
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(88px, 1fr))" }}
          >
            {iconNames.map((name) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 py-3 px-2 rounded-sm shadow-[inset_0_0_0_1px_var(--color-line)]"
              >
                <Icon name={name} size={16} />
                <span className="font-mono text-[11px] text-fg-subtle">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Group label="Feedback" />

        <Section
          title="Toast"
          path="src/components/ui/sonner.tsx"
          description="Every sonner variant — success · info · warning · error · loading · promise · action."
        >
          <ToastDemo />
        </Section>

        <Section
          title="Alert"
          path="src/components/ui/alert.tsx"
          description="Inline, durable alerts. Default + destructive variants."
        >
          <div className="space-y-3">
            <Alert>
              <Icon name="info" />
              <AlertTitle>Preview ready</AlertTitle>
              <AlertDescription>atlas-web-pk3m.orbit.app · 54s build.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Icon name="alert" />
              <AlertTitle>Deploy failed</AlertTitle>
              <AlertDescription>Build exited with code 1. Check the build logs.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section
          title="Badge (shadcn)"
          path="src/components/ui/badge.tsx"
          description="shadcn variants — default · secondary · outline · destructive. Different from Orbit Badge."
        >
          <div className="flex items-center gap-3 flex-wrap">
            <ShadcnBadge>Default</ShadcnBadge>
            <ShadcnBadge variant="secondary">Secondary</ShadcnBadge>
            <ShadcnBadge variant="outline">Outline</ShadcnBadge>
            <ShadcnBadge variant="destructive">Destructive</ShadcnBadge>
          </div>
        </Section>

        <Section
          title="Progress"
          path="src/components/ui/progress.tsx"
          description="Radix Progress primitive. Animated width transition."
        >
          <div className="max-w-md space-y-3">
            <Progress value={8} />
            <Progress value={42} />
            <Progress value={84} />
          </div>
        </Section>

        <Section
          title="Skeleton"
          path="src/components/ui/skeleton.tsx"
          description="Pulsing placeholder for async content."
        >
          <div className="max-w-md space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </Section>

        <Section
          title="Spinner"
          path="src/components/ui/spinner.tsx"
          description="Indeterminate loader."
        >
          <div className="flex items-center gap-6">
            <Spinner />
            <Spinner className="size-6 text-accent" />
            <Spinner className="size-8 text-success" />
          </div>
        </Section>

        <Section
          title="Empty"
          path="src/components/ui/empty.tsx"
          description="Zero-state pattern — icon, title, description, optional CTA."
        >
          <Empty className="border shadow-[inset_0_0_0_1px_var(--color-line)] p-8">
            <EmptyHeader>
              <div className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-bg-muted text-fg-muted shadow-[inset_0_0_0_1px_var(--color-line)]">
                <Icon name="deploy" />
              </div>
              <EmptyTitle>No deployments yet</EmptyTitle>
              <EmptyDescription>
                Push to any branch or import a project to see deployments here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Section>

        <Group label="Forms" />

        <Section
          title="Input"
          path="src/components/ui/input.tsx"
          description="Base text input with focus + invalid states."
        >
          <InputDemo />
        </Section>

        <Section
          title="InputGroup"
          path="src/components/ui/input-group.tsx"
          description="Compose prefix / suffix addons around an input."
        >
          <InputGroupDemo />
        </Section>

        <Section
          title="Textarea"
          path="src/components/ui/textarea.tsx"
          description="Auto-growing textarea."
        >
          <TextareaDemo />
        </Section>

        <Section
          title="Select"
          path="src/components/ui/select.tsx"
          description="Radix Select — styled dropdown."
        >
          <SelectDemo />
        </Section>

        <Section
          title="Combobox"
          path="src/components/ui/combobox.tsx"
          description="@base-ui/react combobox — typeahead with filter."
        >
          <ComboboxDemo />
        </Section>

        <Section
          title="Native Select"
          path="src/components/ui/native-select.tsx"
          description="Styled wrapper around the native <select> — full a11y, no portal."
        >
          <NativeSelectDemo />
        </Section>

        <Section
          title="Checkbox"
          path="src/components/ui/checkbox.tsx"
          description="Radix Checkbox."
        >
          <CheckboxDemo />
        </Section>

        <Section
          title="Switch"
          path="src/components/ui/switch.tsx"
          description="Radix Switch — two sizes."
        >
          <SwitchDemo />
        </Section>

        <Section
          title="Toggle / ToggleGroup"
          path="src/components/ui/toggle-group.tsx"
          description="Segmented button group."
        >
          <ToggleDemo />
        </Section>

        <Section
          title="Label"
          path="src/components/ui/label.tsx"
          description="Radix Label primitive — wires to focusable peer."
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="example-label">Email</Label>
            <span id="example-label" className="text-sm text-fg-muted">
              m@example.com
            </span>
          </div>
        </Section>

        <Section
          title="Field (composed)"
          path="src/components/ui/field.tsx"
          description="FieldSet + FieldGroup + Field + FieldLabel + FieldDescription + FieldError."
        >
          <FieldComposedDemo />
        </Section>

        <Group label="Overlays" />

        <Section
          title="Dialog"
          path="src/components/ui/dialog.tsx"
          description="Modal confirmation with Radix."
        >
          <DialogDemo />
        </Section>

        <Section
          title="Sheet"
          path="src/components/ui/sheet.tsx"
          description="Side-anchored panel."
        >
          <SheetDemo />
        </Section>

        <Section
          title="Drawer"
          path="src/components/ui/drawer.tsx"
          description="Vaul-powered bottom/right drawer."
        >
          <DrawerDemo />
        </Section>

        <Section title="Popover" path="src/components/ui/popover.tsx" description="Radix Popover.">
          <PopoverDemo />
        </Section>

        <Section
          title="HoverCard"
          path="src/components/ui/hover-card.tsx"
          description="Non-modal hover-triggered card."
        >
          <HoverCardDemo />
        </Section>

        <Section
          title="Tooltip"
          path="src/components/ui/tooltip.tsx"
          description="Deferred hover tooltip."
        >
          <TooltipDemo />
        </Section>

        <Section
          title="DropdownMenu"
          path="src/components/ui/dropdown-menu.tsx"
          description="Radix DropdownMenu — items, checkbox items, submenus."
        >
          <DropdownMenuDemo />
        </Section>

        <Section
          title="Command"
          path="src/components/ui/command.tsx"
          description="cmdk menu — inline here, wrap in Dialog for ⌘K palette."
        >
          <CommandDemo />
        </Section>

        <Group label="Navigation" />

        <Section
          title="Tabs"
          path="src/components/ui/tabs.tsx"
          description="Keyboard-navigable segmented tabs."
        >
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="text-sm text-fg-muted py-3">
              Deployment overview. Tab-switch with ← / →.
            </TabsContent>
            <TabsContent value="logs" className="text-sm text-fg-muted py-3">
              Log tail with level filtering.
            </TabsContent>
            <TabsContent value="settings" className="text-sm text-fg-muted py-3">
              Project settings. Branch rules, env vars.
            </TabsContent>
          </Tabs>
        </Section>

        <Section
          title="Accordion"
          path="src/components/ui/accordion.tsx"
          description="Radix Accordion — single / multiple."
        >
          <Accordion type="single" collapsible className="max-w-md">
            <AccordionItem value="one">
              <AccordionTrigger>Why am I seeing this?</AccordionTrigger>
              <AccordionContent>
                Accordions are great for FAQ-style surfaces and long-form disclosure.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="two">
              <AccordionTrigger>What about nested items?</AccordionTrigger>
              <AccordionContent>
                Use plain markup or a second accordion inside the content.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section
          title="Breadcrumb"
          path="src/components/ui/breadcrumb.tsx"
          description="Composable breadcrumb trail."
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">atlas-web</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">deployments</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>dpl_x8Ra</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Section
          title="ScrollArea"
          path="src/components/ui/scroll-area.tsx"
          description="Cross-browser styled scroll container."
        >
          <ScrollArea className="h-40 max-w-sm rounded-md shadow-[inset_0_0_0_1px_var(--color-line)] p-3 text-sm">
            {Array.from({ length: 30 }, (_, i) => `row-${i + 1}`).map((key, i) => (
              <div key={key} className="py-1 text-fg-muted">
                Row {i + 1} · regional edge node
              </div>
            ))}
          </ScrollArea>
        </Section>

        <Group label="Data" />

        <Section
          title="Table (shadcn)"
          path="src/components/ui/table.tsx"
          description="Unstyled, composable table primitive. Pair with tanstack/react-table for sort/filter."
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono">INV-104</TableCell>
                <TableCell>Apr 2026</TableCell>
                <TableCell className="text-right font-mono">$240.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-mono">INV-103</TableCell>
                <TableCell>Mar 2026</TableCell>
                <TableCell className="text-right font-mono">$240.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Section>

        <Section
          title="Avatar"
          path="src/components/ui/avatar.tsx"
          description="Radix Avatar with image + fallback."
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatars/shadcn.jpg" alt="@shadcn" />
              <AvatarFallback>RL</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>KP</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>··</AvatarFallback>
            </Avatar>
          </div>
        </Section>

        <Section
          title="Separator"
          path="src/components/ui/separator.tsx"
          description="Radix Separator — horizontal / vertical."
        >
          <div className="flex items-center gap-3 text-sm text-fg-muted">
            atlas-web
            <Separator orientation="vertical" className="h-4" />
            iad1
            <Separator orientation="vertical" className="h-4" />
            main
          </div>
        </Section>

        <Section
          title="Kbd (shadcn)"
          path="src/components/ui/kbd.tsx"
          description="Shadcn Kbd + KbdGroup. Larger and more declarative than Orbit Kbd."
        >
          <div className="flex items-center gap-3">
            <ShadcnKbd>Enter</ShadcnKbd>
            <KbdGroup>
              <ShadcnKbd>⌘</ShadcnKbd>
              <ShadcnKbd>K</ShadcnKbd>
            </KbdGroup>
          </div>
        </Section>

        <Section
          title="Carousel"
          path="src/components/ui/carousel.tsx"
          description="Embla carousel with prev/next buttons."
        >
          <CarouselDemo />
        </Section>

        <Section
          title="Collapsible"
          path="src/components/ui/collapsible.tsx"
          description="Radix Collapsible — show/hide a section."
        >
          <CollapsibleDemo />
        </Section>

        <Section
          title="Item"
          path="src/components/ui/item.tsx"
          description="List-row composition: media / title / description / actions."
        >
          <div className="max-w-md rounded-md shadow-[inset_0_0_0_1px_var(--color-line)] divide-y divide-[var(--color-line)]">
            <Item>
              <ItemMedia>
                <Icon name="deploy" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>atlas-web</ItemTitle>
                <ItemDescription>Ready · 42ms · iad1</ItemDescription>
              </ItemContent>
            </Item>
            <Item>
              <ItemMedia>
                <Icon name="deploy" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>atlas-api</ItemTitle>
                <ItemDescription>Ready · 18ms · sfo1</ItemDescription>
              </ItemContent>
            </Item>
          </div>
        </Section>

        <Group label="Groups" />

        <Section
          title="ButtonGroup"
          path="src/components/ui/button-group.tsx"
          description="Segmented action bar with separators."
        >
          <ButtonGroup>
            <ShadcnButton variant="outline">
              <Icon name="deploy" /> Deploy
            </ShadcnButton>
            <ButtonGroupSeparator />
            <ShadcnButton variant="outline">
              <Icon name="logs" /> Logs
            </ShadcnButton>
            <ButtonGroupSeparator />
            <ShadcnButton variant="outline">
              <Icon name="settings" /> Settings
            </ShadcnButton>
          </ButtonGroup>
        </Section>
      </Page>
    </>
  );
}

function Group({ label }: { label: string }) {
  return (
    <div className="mt-8 mb-3">
      <div className="text-kicker">{label}</div>
    </div>
  );
}

function Section({
  title,
  path,
  description,
  children,
}: {
  title: string;
  path: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <Card>
        <CardHead
          title={title}
          sub={description}
          actions={<span className="font-mono text-[11px] text-fg-subtle">{path}</span>}
        />
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
}
