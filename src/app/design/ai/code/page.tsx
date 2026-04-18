"use client";

import { CodeBlock } from "@/components/ai-elements/code-block";
import { FileTree, FileTreeFile, FileTreeFolder } from "@/components/ai-elements/file-tree";
import { Terminal } from "@/components/ai-elements/terminal";

import { Topbar } from "@/components/layout/topbar";
import { Page, PageHead } from "@/components/layout/page-shell";
import { Card, CardBody, CardHead } from "@/components/orbit/card";
import { Badge } from "@/components/orbit/badge";

const sampleCode = `import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai("gpt-4o"),
    system: "You are a deployment assistant.",
    messages,
  });
  return result.toUIMessageStreamResponse();
}
`;

const terminalOutput = [
  "\u001B[90m14:22:01\u001B[39m \u001B[34mINFO \u001B[39m $ bun install",
  "\u001B[90m14:22:03\u001B[39m \u001B[34mINFO \u001B[39m resolved 1,204 packages in 1.87s",
  "\u001B[90m14:22:04\u001B[39m \u001B[34mINFO \u001B[39m $ next build --turbopack",
  "\u001B[90m14:22:09\u001B[39m \u001B[32mOK   \u001B[39m ✓ type-check passed",
  "\u001B[90m14:22:14\u001B[39m \u001B[33mWARN \u001B[39m ⚠ route /api/webhook/stripe uses dynamic rendering",
  "\u001B[90m14:22:34\u001B[39m \u001B[32mOK   \u001B[39m ✓ build completed in 33s",
].join("\n");

export default function AiCode() {
  return (
    <>
      <Topbar crumbs={["Design System", "AI", "Code"]} hideDeploy />
      <Page>
        <PageHead
          kicker="Coding agent surface"
          title="Code UI"
          sub="File tree + code block + terminal — the three atoms that build agent coding assistants. Wire these to a tool-calling model that writes files and shell commands."
          actions={<Badge tone="info" dot>static demo</Badge>}
        />

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "280px minmax(0, 1fr)" }}
        >
          <Card>
            <CardHead title="FileTree" sub="ai-elements/file-tree" />
            <CardBody className="p-0">
              <FileTree
                className="p-3"
                defaultExpanded={new Set(["src", "src/app", "src/app/api", "src/app/api/chat", "src/components", "src/components/ai-elements"])}
              >
                <FileTreeFolder name="src" path="src">
                  <FileTreeFolder name="app" path="src/app">
                    <FileTreeFolder name="api" path="src/app/api">
                      <FileTreeFolder name="chat" path="src/app/api/chat">
                        <FileTreeFile name="route.ts" path="src/app/api/chat/route.ts" />
                      </FileTreeFolder>
                    </FileTreeFolder>
                    <FileTreeFile name="layout.tsx" path="src/app/layout.tsx" />
                    <FileTreeFile name="page.tsx" path="src/app/page.tsx" />
                  </FileTreeFolder>
                  <FileTreeFolder name="components" path="src/components">
                    <FileTreeFolder name="ai-elements" path="src/components/ai-elements">
                      <FileTreeFile name="conversation.tsx" path="src/components/ai-elements/conversation.tsx" />
                      <FileTreeFile name="prompt-input.tsx" path="src/components/ai-elements/prompt-input.tsx" />
                    </FileTreeFolder>
                  </FileTreeFolder>
                </FileTreeFolder>
                <FileTreeFile name="package.json" path="package.json" />
                <FileTreeFile name="tsconfig.json" path="tsconfig.json" />
              </FileTree>
            </CardBody>
          </Card>

          <Card>
            <CardHead title="CodeBlock" sub="ai-elements/code-block — src/app/api/chat/route.ts" />
            <CardBody className="p-0">
              <CodeBlock code={sampleCode} language="typescript" />
            </CardBody>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <CardHead title="Terminal" sub="ai-elements/terminal — ANSI-tolerant build log" />
            <CardBody className="p-0">
              <Terminal output={terminalOutput} />
            </CardBody>
          </Card>
        </div>
      </Page>
    </>
  );
}
