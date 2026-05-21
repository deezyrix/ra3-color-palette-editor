import { ArrowRight, AlertTriangle } from "lucide-react";

const BEFORE = `set-exe Data\\RA3_1.12.game
add-big Data\\Maps12.big
add-big Data\\Core12.big
add-config RA3_english_1.11.SkuDef
`;

const AFTER = `set-exe Data\\RA3_1.12.game
add-big Data\\Maps12.big
add-big Data\\Core12.big
add-big Data\\Colors.big
add-config RA3_english_1.11.SkuDef`;

function Inline({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{children}</code>;
}

function CodeBlock({ title, code, highlight }: { title: string; code: string; highlight?: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="border-b border-border bg-muted/50 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
        {title}
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-[1.65]">
        <code className="font-mono">
          {code.split("\n").map((line, i) => (
            <div
              key={i}
              className={
                highlight && line.includes(highlight)
                  ? "-mx-3 bg-emerald-500/10 px-3 text-emerald-700 dark:text-emerald-400"
                  : "text-foreground/80"
              }
            >
              {line || " "}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function InstallGuide() {
  return (
    <section className="space-y-4">
      <div>
        <h2>How to install</h2>
        <p className="text-sm text-muted-foreground">
          Place the generated file at <Inline>Red Alert 3/Data/Colors.big</Inline> and add one line in .SkuDef file.
        </p>
      </div>

      <ol className="ml-5 list-decimal space-y-2.5 text-sm">
        <li>Download <strong>Colors.big</strong>.</li>
        <li>Copy it into your <Inline>Red Alert 3/Data</Inline> folder.</li>
        <li>
          Open your active <Inline>.SkuDef</Inline> file
          {" "}(e.g. <em>RA3_english_1.12.SkuDef</em> or <em>RA3_russian_1.12.SkuDef</em>) as a text document.
          {" "}This file lives in your Red Alert 3 game folder itself (not inside <Inline>Data</Inline>).
        </li>
        <li>
          <div>
            Add <Inline>add-big Data\Colors.big</Inline> just before the <Inline>add-config</Inline> line.
          </div>
          <div className="mt-2.5 grid items-stretch gap-2.5 md:grid-cols-[1fr_auto_1fr]">
            <CodeBlock title="Before - your SkuDef" code={BEFORE} />
            <div className="flex items-center justify-center text-muted-foreground">
              <ArrowRight className="hidden h-4 w-4 md:block" />
              <ArrowRight className="block h-4 w-4 rotate-90 md:hidden" />
            </div>
            <CodeBlock title="After - with Colors.big" code={AFTER} highlight="Colors.big" />
          </div>
        </li>
        <li>Save the file and launch the game.</li>
      </ol>

      <div className="flex items-start gap-2.5 rounded-md border border-amber-500/25 bg-amber-500/5 p-3 text-sm">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <div className="space-y-0.5">
          <div className="font-medium">Make a backup of your .SkuDef file before editing it.</div>
          <div className="text-muted-foreground">
            To uninstall, remove the <Inline>add-big Data\Colors.big</Inline> line and delete Colors.big from the Data folder.
          </div>
        </div>
      </div>
    </section>
  );
}
