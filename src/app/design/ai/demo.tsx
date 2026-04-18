"use client";

import { useState } from "react";

import { Conversation, ConversationContent } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { CodeBlock } from "@/components/ai-elements/code-block";

type Turn = { id: string; role: "user" | "assistant"; text: string; code?: string };

const initialTurns: Turn[] = [
  {
    id: "t1",
    role: "user",
    text: "Spin up a preview for the billing branch and show me the build config.",
  },
  {
    id: "t2",
    role: "assistant",
    text: "Preview queued for `feat/billing-v2`. Here's the build config it'll use — same as production minus `OPENAI_API_KEY` which is gated to prod.",
    code: `{
  "env": "preview",
  "buildCommand": "bun run build",
  "installCommand": "bun install",
  "framework": "next@16",
  "regions": ["iad1"],
  "secrets": {
    "DATABASE_URL":        "inherit",
    "STRIPE_WEBHOOK_KEY":  "inherit",
    "OPENAI_API_KEY":      "preview-disabled"
  }
}`,
  },
];

export function AiDemo() {
  const [turns, setTurns] = useState<Turn[]>(initialTurns);
  const [draft, setDraft] = useState("");

  function submit() {
    if (!draft.trim()) return;
    setTurns((prev) => [
      ...prev,
      { id: `u${Date.now()}`, role: "user", text: draft },
      {
        id: `a${Date.now()}`,
        role: "assistant",
        text: "Stubbed reply — wire `/api/chat` to a real provider to stream responses here.",
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex flex-col h-[520px] rounded-md shadow-[inset_0_0_0_1px_var(--color-line)] bg-bg-subtle overflow-hidden">
      <Conversation className="flex-1 min-h-0 overflow-y-auto">
        <ConversationContent>
          {turns.map((t) => (
            <Message key={t.id} from={t.role}>
              <MessageContent>
                <div className="text-[13px] leading-[1.6]">{t.text}</div>
                {t.code ? (
                  <div className="mt-3">
                    <CodeBlock code={t.code} language="json" />
                  </div>
                ) : null}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
      </Conversation>

      <PromptInput
        onSubmit={(_msg, event) => {
          event.preventDefault();
          submit();
        }}
      >
        <PromptInputBody>
          <PromptInputTextarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask the platform… (stubbed — press Enter)"
          />
          <PromptInputTools>
            <div className="flex-1" />
            <PromptInputSubmit disabled={!draft.trim()} status="ready" />
          </PromptInputTools>
        </PromptInputBody>
      </PromptInput>
    </div>
  );
}
