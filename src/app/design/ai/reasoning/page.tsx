"use client";

import { useState } from "react";

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from "@/components/ai-elements/task";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Badge } from "@/components/orbit/badge";

export default function AiReasoning() {
  const [isStreaming] = useState(false);

  return (
    <>
      <Topbar crumbs={["Design System", "AI", "Reasoning"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Multi-step agents"
          title="Reasoning UI"
          sub="ai-elements surfaces for chain-of-thought, collapsible reasoning, and task breakdowns. All static here — wire to tool-calling models to stream real traces."
          actions={
            <Badge tone="info" dot>
              static demo
            </Badge>
          }
        />

        <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <Card>
            <CardHead title="ChainOfThought" sub="ai-elements/chain-of-thought" />
            <CardBody>
              <ChainOfThought defaultOpen>
                <ChainOfThoughtHeader>Analysing failed deployment</ChainOfThoughtHeader>
                <ChainOfThoughtContent>
                  <ChainOfThoughtStep
                    label="Read build logs"
                    description="Pulled 412 log lines from dpl_mN04"
                    status="complete"
                  />
                  <ChainOfThoughtStep
                    label="Identify error"
                    description="StripeSignatureVerificationError at /api/webhook/stripe:38"
                    status="complete"
                  />
                  <ChainOfThoughtStep
                    label="Check recent secret rotations"
                    description="STRIPE_WEBHOOK_KEY rotated 3 days ago by Rhea Lin"
                    status="complete"
                  />
                  <ChainOfThoughtStep
                    label="Propose fix"
                    description="Redeploy with the new secret surfaced to the webhook route"
                    status="active"
                  />
                </ChainOfThoughtContent>
              </ChainOfThought>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="Reasoning (collapsible)" sub="ai-elements/reasoning" />
            <CardBody>
              <Reasoning isStreaming={isStreaming}>
                <ReasoningTrigger />
                <ReasoningContent>
                  {`The user asked for a preview of the billing branch.\n\n1. Check if feat/billing-v2 has an open deployment: yes, dpl_pK3m (building).\n2. ETA is 22s — wait or surface current progress?\n3. Surface live progress via the PromptInput status indicator.\n4. Plan next tool call: fetch build logs when complete.`}
                </ReasoningContent>
              </Reasoning>
            </CardBody>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <CardHead title="Task" sub="ai-elements/task — expandable task tree" />
            <CardBody>
              <Task defaultOpen>
                <TaskTrigger title="Roll out v1.42 to production" />
                <TaskContent>
                  <TaskItem>Open changelog draft</TaskItem>
                  <TaskItem>
                    Review diff against main
                    <TaskItemFile>src/lib/billing/stripe.ts</TaskItemFile>
                    <TaskItemFile>src/app/api/webhook/stripe/route.ts</TaskItemFile>
                  </TaskItem>
                  <TaskItem>Smoke-test preview</TaskItem>
                  <TaskItem>Promote to production</TaskItem>
                  <TaskItem>Monitor error rate for 10 minutes</TaskItem>
                </TaskContent>
              </Task>
            </CardBody>
          </Card>
        </div>
      </Page>
    </>
  );
}
