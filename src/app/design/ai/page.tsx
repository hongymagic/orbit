import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Badge } from "@/components/orbit/badge";
import { Kbd } from "@/components/orbit/kbd";
import { AiDemo } from "./demo";

type AiElement = { name: string; file: string; description: string };

const catalog: { label: string; items: readonly AiElement[] }[] = [
  {
    label: "Chat",
    items: [
      {
        name: "Conversation",
        file: "conversation.tsx",
        description: "Scroll container with auto-stick-to-bottom.",
      },
      {
        name: "Message",
        file: "message.tsx",
        description: "Role-aware message row (user/assistant).",
      },
      {
        name: "PromptInput",
        file: "prompt-input.tsx",
        description: "Textarea + tools + submit compound.",
      },
      {
        name: "Suggestion",
        file: "suggestion.tsx",
        description: "Prompt chip suggestions above the input.",
      },
      { name: "Persona", file: "persona.tsx", description: "Avatar + name + role label." },
      {
        name: "Attachments",
        file: "attachments.tsx",
        description: "File/image upload strip for prompts.",
      },
      {
        name: "OpenInChat",
        file: "open-in-chat.tsx",
        description: "Deeplink-to-conversation button.",
      },
    ],
  },
  {
    label: "Reasoning",
    items: [
      {
        name: "Reasoning",
        file: "reasoning.tsx",
        description: "Collapsible chain-of-thought block.",
      },
      {
        name: "ChainOfThought",
        file: "chain-of-thought.tsx",
        description: "Ordered reasoning-step display.",
      },
      { name: "Task", file: "task.tsx", description: "Single work item with status." },
      { name: "Plan", file: "plan.tsx", description: "Multi-step execution plan view." },
      { name: "Checkpoint", file: "checkpoint.tsx", description: "Progress milestone marker." },
      { name: "Context", file: "context.tsx", description: "Context window / memory preview." },
    ],
  },
  {
    label: "Code & tools",
    items: [
      {
        name: "CodeBlock",
        file: "code-block.tsx",
        description: "Syntax-highlighted code via Shiki.",
      },
      { name: "Tool", file: "tool.tsx", description: "Tool-call envelope: name, args, result." },
      { name: "Terminal", file: "terminal.tsx", description: "Monospace terminal output surface." },
      { name: "Commit", file: "commit.tsx", description: "Git commit card with SHA + message." },
      { name: "Sandbox", file: "sandbox.tsx", description: "Live-preview code sandbox pane." },
      { name: "FileTree", file: "file-tree.tsx", description: "Nested file/folder explorer." },
      { name: "PackageInfo", file: "package-info.tsx", description: "Dependency metadata card." },
      { name: "Snippet", file: "snippet.tsx", description: "Inline copy-able code snippet." },
      {
        name: "TestResults",
        file: "test-results.tsx",
        description: "Pass/fail rollup with breakdown.",
      },
      {
        name: "StackTrace",
        file: "stack-trace.tsx",
        description: "Parsed stack trace with source links.",
      },
      {
        name: "Artifact",
        file: "artifact.tsx",
        description: "Model-emitted file / document container.",
      },
      {
        name: "EnvironmentVariables",
        file: "environment-variables.tsx",
        description: "Masked env-var list.",
      },
    ],
  },
  {
    label: "Data & meta",
    items: [
      { name: "Sources", file: "sources.tsx", description: "Citation source list with favicons." },
      {
        name: "InlineCitation",
        file: "inline-citation.tsx",
        description: "In-flow citation marker.",
      },
      {
        name: "SchemaDisplay",
        file: "schema-display.tsx",
        description: "Typed JSON schema renderer.",
      },
      { name: "Agent", file: "agent.tsx", description: "Agent identity + capability chip." },
      { name: "Queue", file: "queue.tsx", description: "Background task queue view." },
      {
        name: "Confirmation",
        file: "confirmation.tsx",
        description: "Accept/reject flow for tool runs.",
      },
      { name: "Canvas", file: "canvas.tsx", description: "Free-form infinite canvas surface." },
      { name: "WebPreview", file: "web-preview.tsx", description: "Iframe website preview card." },
      { name: "JsxPreview", file: "jsx-preview.tsx", description: "Live-rendered JSX output." },
      { name: "Image", file: "image.tsx", description: "Model-generated / attached image frame." },
      { name: "Node", file: "node.tsx", description: "Canvas node primitive." },
      { name: "Edge", file: "edge.tsx", description: "Canvas edge primitive." },
      { name: "Connection", file: "connection.tsx", description: "Live edge being drawn." },
      { name: "Panel", file: "panel.tsx", description: "Dockable canvas panel." },
      { name: "Shimmer", file: "shimmer.tsx", description: "Typing / streaming placeholder." },
      { name: "Controls", file: "controls.tsx", description: "Zoom / pan control cluster." },
      { name: "Toolbar", file: "toolbar.tsx", description: "Generic action toolbar strip." },
      { name: "AudioPlayer", file: "audio-player.tsx", description: "Inline audio playback." },
      {
        name: "Transcription",
        file: "transcription.tsx",
        description: "Streaming speech-to-text display.",
      },
      { name: "SpeechInput", file: "speech-input.tsx", description: "Mic-based prompt capture." },
      { name: "MicSelector", file: "mic-selector.tsx", description: "Input device picker." },
      { name: "VoiceSelector", file: "voice-selector.tsx", description: "TTS voice picker." },
      { name: "ModelSelector", file: "model-selector.tsx", description: "Model/provider picker." },
    ],
  },
];

export default function AiDemoPage() {
  return (
    <>
      <Topbar crumbs={["Design System", "AI elements"]} hideDeploy />
      <Page>
        <PageHead
          kicker="AI surfaces"
          title="ai-elements under Orbit tokens"
          sub="Vercel's ai-elements re-skinned through the Orbit token bridge. Every AI UI component inherits shadow-as-border, Geist type, and variation-aware theming — drop them into any surface and they already belong."
          actions={
            <Badge tone="info" dot>
              stubbed
            </Badge>
          }
        />

        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "1fr" }}>
          <Card>
            <CardHead
              title="Conversation + Message"
              sub="src/components/ai-elements/{conversation,message}.tsx"
            />
            <CardBody>
              <AiDemo />
            </CardBody>
          </Card>
        </div>

        <div className="text-kicker mb-3">Catalog</div>
        <p className="text-[13px] text-fg-muted leading-[1.55] mb-4 max-w-prose">
          Every ai-element currently vendored under{" "}
          <code className="font-mono text-[12px]">src/components/ai-elements/</code>. Most wire up
          cleanly after a real provider is connected — the conversation above is the canonical
          example.
        </p>

        {catalog.map((group) => (
          <section key={group.label} className="mb-6">
            <div className="text-kicker mb-3">{group.label}</div>
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
            >
              {group.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-sm p-3 bg-bg shadow-[inset_0_0_0_1px_var(--color-line)]"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] font-semibold tracking-[-0.01em]">{item.name}</div>
                    <Kbd className="ml-auto">{`ai-elements/${item.file.replace(".tsx", "")}`}</Kbd>
                  </div>
                  <div className="mt-1.5 text-[12px] text-fg-muted leading-[1.5]">
                    {item.description}
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-fg-subtle">
                    src/components/ai-elements/{item.file}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </Page>
    </>
  );
}
