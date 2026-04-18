"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { ACCENTS, VARIATIONS, useAccent, useTheme, useVariation } from "@/providers";

const teamMembers = [
  { initials: "RL", name: "Rhea Lin", email: "rhea@orbit.app", role: "Admin" },
  { initials: "KP", name: "Kian Park", email: "kian@orbit.app", role: "Member" },
  { initials: "DS", name: "Dana Soto", email: "dana@orbit.app", role: "Member" },
  { initials: "AT", name: "Alex Tran", email: "alex@orbit.app", role: "Billing" },
];

export function SettingsView() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileTab />
      </TabsContent>
      <TabsContent value="appearance" className="mt-6">
        <AppearanceTab />
      </TabsContent>
      <TabsContent value="team" className="mt-6">
        <TeamTab />
      </TabsContent>
      <TabsContent value="notifications" className="mt-6">
        <NotificationsTab />
      </TabsContent>
    </Tabs>
  );
}

function ProfileTab() {
  const [name, setName] = useState("Rhea Lin");
  const [email] = useState("rhea@orbit.app");
  const [bio, setBio] = useState("Platform lead. Likes fast builds and slow coffees.");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Profile saved");
      }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Public information visible to teammates.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={name} />
                  <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <Button type="button" variant="outline" size="sm">
                    Upload new
                  </Button>
                  <FieldDescription className="mt-2">PNG or JPG, max 2 MB.</FieldDescription>
                </div>
              </div>
              <Field>
                <FieldLabel htmlFor="settings-name">Name</FieldLabel>
                <Input id="settings-name" value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field>
                <FieldLabel htmlFor="settings-email">Email</FieldLabel>
                <Input id="settings-email" type="email" value={email} readOnly />
                <FieldDescription>Contact support to change your primary email.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="settings-bio">Bio</FieldLabel>
                <Textarea
                  id="settings-bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Save profile</Button>
      </div>
    </form>
  );
}

function AppearanceTab() {
  const { theme, setTheme } = useTheme();
  const { accent, setAccent } = useAccent();
  const { variation, setVariation } = useVariation();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Changes apply across the entire app. Wired to the ThemeProvider.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={theme} onValueChange={(v) => setTheme(v as "light" | "dark")}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accent color</CardTitle>
          <CardDescription>
            Interactive surfaces inherit this at runtime via --color-accent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 flex-wrap">
            {ACCENTS.map((a) => {
              const selected = a.color.toLowerCase() === accent.toLowerCase();
              return (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setAccent(a.color)}
                  title={a.label}
                  aria-pressed={selected}
                  className="relative h-9 w-9 rounded-pill cursor-pointer transition-transform hover:scale-110 shadow-[inset_0_0_0_1px_var(--color-line)]"
                  style={{ background: a.color }}
                >
                  {selected ? (
                    <span className="absolute inset-0 grid place-items-center text-white">
                      <Icon name="check" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout variation</CardTitle>
          <CardDescription>
            Pick a default variation applied globally. Routes can still opt-in to their own.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={variation} onValueChange={(v) => setVariation(v as typeof variation)}>
            <SelectTrigger className="w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {VARIATIONS.map((v) => (
                <SelectItem key={v.value} value={v.value}>
                  {v.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}

function TeamTab() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Team members</CardTitle>
          <CardDescription>Manage who can access this workspace.</CardDescription>
        </div>
        <Button size="sm">
          <Icon name="plus" /> Invite
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y">
          {teamMembers.map((m) => (
            <li key={m.email} className="flex items-center gap-3 px-6 py-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{m.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="text-[14px] font-medium">{m.name}</div>
                <div className="text-[12px] text-muted-foreground font-mono">{m.email}</div>
              </div>
              <Badge variant="outline" className="ml-auto">
                {m.role}
              </Badge>
              <Button variant="ghost" size="icon-sm" aria-label="More">
                <Icon name="dots" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    deployments: true,
    rollbacks: true,
    secrets: true,
    weekly: false,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email notifications</CardTitle>
        <CardDescription>Choose what lands in your inbox.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(
            [
              {
                key: "deployments",
                label: "Deployment status",
                sub: "Every production deploy result.",
              },
              {
                key: "rollbacks",
                label: "Rollbacks",
                sub: "When a production deploy is reverted.",
              },
              { key: "secrets", label: "Secret rotations", sub: "7 days before a secret is due." },
              {
                key: "weekly",
                label: "Weekly digest",
                sub: "Platform activity summary every Monday.",
              },
            ] as const
          ).map((p) => (
            <div key={p.key} className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[14px] font-medium">{p.label}</div>
                <div className="text-[12px] text-muted-foreground">{p.sub}</div>
              </div>
              <Switch
                checked={prefs[p.key]}
                onCheckedChange={(checked) => setPrefs((prev) => ({ ...prev, [p.key]: checked }))}
              />
            </div>
          ))}
          <Separator />
          <div className="flex justify-end">
            <Button onClick={() => toast.success("Notification preferences saved")}>Save</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
