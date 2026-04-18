"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export function InputDemo() {
  return (
    <div className="grid gap-3 max-w-sm">
      <Input placeholder="Default input" />
      <Input disabled placeholder="Disabled" />
      <Input aria-invalid="true" defaultValue="invalid@" />
    </div>
  );
}

export function InputGroupDemo() {
  return (
    <div className="grid gap-3 max-w-sm">
      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputGroupInput placeholder="username" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">USD</InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function TextareaDemo() {
  return <Textarea placeholder="Tell us what you shipped today…" className="max-w-sm" rows={3} />;
}

export function SelectDemo() {
  return (
    <Select defaultValue="iad1">
      <SelectTrigger className="w-[220px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="iad1">Washington · iad1</SelectItem>
        <SelectItem value="sfo1">San Francisco · sfo1</SelectItem>
        <SelectItem value="cdg1">Paris · cdg1</SelectItem>
        <SelectItem value="syd1">Sydney · syd1</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function NativeSelectDemo() {
  return (
    <NativeSelect defaultValue="main">
      <NativeSelectOption value="main">main</NativeSelectOption>
      <NativeSelectOption value="feat/billing-v2">feat/billing-v2</NativeSelectOption>
      <NativeSelectOption value="fix/rate-limit">fix/rate-limit</NativeSelectOption>
    </NativeSelect>
  );
}

export function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="nb" defaultChecked />
      <Label htmlFor="nb">Notify me on build completion</Label>
    </div>
  );
}

export function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center gap-3">
      <Switch id="s-prod" checked={on} onCheckedChange={setOn} />
      <Label htmlFor="s-prod">Production guard</Label>
      <Switch size="sm" defaultChecked />
    </div>
  );
}

export function ToggleDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle>B</Toggle>
      <Toggle variant="outline">I</Toggle>
      <ToggleGroup type="single" defaultValue="preview" variant="outline">
        <ToggleGroupItem value="develop">Develop</ToggleGroupItem>
        <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
        <ToggleGroupItem value="ship">Ship</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export function FieldComposedDemo() {
  return (
    <FieldSet className="max-w-sm">
      <FieldLegend>New deployment</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="project">Project name</FieldLabel>
          <Input id="project" placeholder="atlas-web" />
          <FieldDescription>Used as the subdomain.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="branch">Branch</FieldLabel>
          <Input id="branch" aria-invalid="true" defaultValue="" />
          <FieldError>Branch is required.</FieldError>
        </Field>
        <Field>
          <Button type="submit">Deploy</Button>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
