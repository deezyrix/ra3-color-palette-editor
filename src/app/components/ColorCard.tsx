import { useEffect, useState } from "react";
import { Check, Copy, RotateCcw, X } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { isValidHex } from "../lib/bigfile";
import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from "../lib/color";

type Props = {
  id: string;
  name: string;
  value: string;
  isCustom?: boolean;
  onChange: (hex: string) => void;
  onReset?: () => void;
  onDelete?: () => void;
};

function NumField({
  label,
  value,
  min,
  max,
  onChangeValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChangeValue: (n: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(String(value));
  }, [value, focused]);

  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        data-field={label}
        type="number"
        min={min}
        max={max}
        value={draft}
        onChange={(e) => {
          const nextDraft = e.target.value;
          setDraft(nextDraft);
          if (nextDraft === "") return;
          const parsed = Number(nextDraft);
          if (Number.isNaN(parsed)) return;
          onChangeValue(Math.max(min, Math.min(max, parsed)));
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          const n = Math.max(min, Math.min(max, Number(draft) || 0));
          setDraft(String(n));
          onChangeValue(n);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
        }}
        className="h-8 w-14 rounded-md border border-input bg-input-background px-2 text-sm tabular-nums outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
      />
    </label>
  );
}

export function ColorCard({ id, name, value, isCustom, onChange, onReset, onDelete }: Props) {
  const [draft, setDraft] = useState(value);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setDraft(value.toUpperCase());
  }, [value]);

  const valid = isValidHex(draft);
  const rgb = hexToRgb(value);
  const hsv = rgbToHsv(rgb);

  const apply = (hex: string) => {
    const up = hex.toUpperCase();
    setDraft(up);
    onChange(up);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="group flex flex-col gap-2.5 rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:border-foreground/25">
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0">
          <div className="truncate text-sm font-medium leading-tight">{name}</div>
          <div className="truncate text-[11px] text-muted-foreground">{id}</div>
        </div>
        {isCustom ? (
          <button
            aria-label={`Delete ${name}`}
            title="Delete color"
            onClick={onDelete}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            aria-label={`Reset ${name}`}
            title="Reset to original"
            onClick={onReset}
            className="rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`Open color picker for ${name}`}
            className="relative block w-full overflow-hidden rounded-md ring-1 ring-inset ring-black/10 transition-[transform,box-shadow] hover:scale-[1.01] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            style={{ backgroundColor: valid ? draft : value, height: "3.25rem" }}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-3 shadow-xl"
          align="start"
          side="bottom"
          sideOffset={6}
          collisionPadding={12}
        >
          <div className="space-y-3">
            <div className="ra3-picker">
              <HexColorPicker color={value} onChange={(c) => apply(c)} />
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">HEX</span>
                <Input
                  value={draft}
                  aria-label={`${name} popover hex`}
                  onChange={(e) => {
                    let v = e.target.value;
                    if (!v.startsWith("#")) v = "#" + v.replace(/[^0-9a-fA-F]/g, "");
                    v = v.slice(0, 7).toUpperCase();
                    setDraft(v);
                    if (isValidHex(v)) onChange(v);
                  }}
                  onBlur={() => {
                    if (!isValidHex(draft)) setDraft(value);
                  }}
                  className="h-8 flex-1 font-mono text-sm"
                />
              </div>

              <div className="flex items-end gap-1.5">
                <span className="w-8 shrink-0 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">RGB</span>
                <NumField label="R" value={rgb.r} min={0} max={255} onChangeValue={(r) => apply(rgbToHex({ ...rgb, r }))} />
                <NumField label="G" value={rgb.g} min={0} max={255} onChangeValue={(g) => apply(rgbToHex({ ...rgb, g }))} />
                <NumField label="B" value={rgb.b} min={0} max={255} onChangeValue={(b) => apply(rgbToHex({ ...rgb, b }))} />
              </div>

              <div className="flex items-end gap-1.5">
                <span className="w-8 shrink-0 pb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">HSV</span>
                <NumField label="H" value={hsv.h} min={0} max={360} onChangeValue={(h) => apply(rgbToHex(hsvToRgb({ ...hsv, h })))} />
                <NumField label="S" value={hsv.s} min={0} max={100} onChangeValue={(s) => apply(rgbToHex(hsvToRgb({ ...hsv, s })))} />
                <NumField label="V" value={hsv.v} min={0} max={100} onChangeValue={(v) => apply(rgbToHex(hsvToRgb({ ...hsv, v })))} />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <Input
            aria-label={`${name} hex`}
            aria-invalid={!valid}
            value={draft}
            onChange={(e) => {
              let v = e.target.value;
              if (!v.startsWith("#")) v = "#" + v.replace(/[^0-9a-fA-F]/g, "");
              v = v.slice(0, 7).toUpperCase();
              setDraft(v);
              if (isValidHex(v)) onChange(v);
            }}
            onBlur={() => {
              if (!isValidHex(draft)) setDraft(value);
            }}
            className={`font-mono text-sm ${
              !valid
                ? "border-destructive focus-visible:ring-destructive/30"
                : "border-border/70 bg-input-background hover:border-border focus-visible:border-ring"
            }`}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={copy}
          aria-label={`Copy ${name} hex`}
          title="Copy HEX"
          className="shrink-0 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      {!valid && (
        <p role="alert" className="text-xs text-destructive">
          Enter a valid HEX like #D83A2E
        </p>
      )}
    </div>
  );
}
