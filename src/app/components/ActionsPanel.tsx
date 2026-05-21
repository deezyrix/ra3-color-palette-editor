import { useRef, useState } from "react";
import { Download, FolderOpen, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { buildBig, ColorMap, ORIGINAL_COLORS, parseBig } from "../lib/bigfile";

type Props = {
  colors: ColorMap;
  onChange: (next: ColorMap) => void;
  canResetPalette: boolean;
};

export function ActionsPanel({ colors, onChange, canResetPalette }: Props) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const flash = (msg: string) => {
    setSuccess(msg);
    setError(null);
    setTimeout(() => setSuccess(null), 3500);
  };

  const download = async () => {
    try {
      const blob = await buildBig(colors);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Colors.big";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      flash("Colors.big generated successfully.");
    } catch (err) {
      setSuccess(null);
      setError(err instanceof Error ? err.message : "Failed to generate Colors.big.");
    }
  };

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      const parsed = await parseBig(f);
      if (!parsed) {
        setError("Could not read palette from this file.");
        return;
      }
      onChange(parsed);
      flash("Palette imported.");
    } catch {
      setError("Failed to import palette.");
    }
  };

  return (
    <section className="space-y-3">
      <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur">
        <div className="flex flex-wrap items-center gap-1.5">
          <input
            ref={fileRef}
            type="file"
            accept=".big"
            className="hidden"
            onChange={onPick}
          />
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <FolderOpen className="mr-1.5 h-3.5 w-3.5" />
            Import Colors.big
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange({ ...ORIGINAL_COLORS })}
            disabled={!canResetPalette}
            title={!canResetPalette ? "Colors already match the original palette" : undefined}
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset to original
          </Button>
        </div>
        <Button onClick={download} className="shadow">
          <Download className="mr-2 h-4 w-4" />
          Download Colors.big
        </Button>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          {success}
        </div>
      )}
      {error && (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}
    </section>
  );
}
