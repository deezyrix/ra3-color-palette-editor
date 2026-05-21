import { COLOR_IDS, ColorMap, OPTIMAL_V34, ORIGINAL_COLORS, SHIFTED_SPECTRUM } from "../lib/bigfile";
import { cn } from "./ui/utils";

type PresetDef = { key: string; name: string; description: string; colors: ColorMap };

type Props = {
  onApply: (colors: ColorMap) => void;
  activeKey?: string;
};

const PRESETS: PresetDef[] = [
  { key: "original", name: "Original", description: "Stock in-game palette", colors: ORIGINAL_COLORS },
  { key: "optimal", name: "Optimal", description: "Community-tuned readability", colors: OPTIMAL_V34 },
  { key: "shifted-spectrum", name: "Shifted Spectrum", description: "Uniform saturation, hue-shifted", colors: SHIFTED_SPECTRUM },
];

export function Presets({ onApply, activeKey }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PRESETS.map((p) => (
        <button
          key={p.key}
          onClick={() => onApply({ ...p.colors })}
          className={cn(
            "flex flex-col gap-3 rounded-lg border bg-card p-4 text-left shadow-sm transition-all hover:border-foreground/30 hover:shadow-md",
            activeKey === p.key ? "border-primary ring-2 ring-primary/20" : "border-border",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate font-medium">{p.name}</div>
              <div className="truncate text-xs text-muted-foreground">{p.description}</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {COLOR_IDS.map((id) => (
              <span
                key={id}
                title={id}
                className="h-6 flex-1 rounded ring-1 ring-inset ring-black/10"
                style={{ backgroundColor: p.colors[id] }}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
