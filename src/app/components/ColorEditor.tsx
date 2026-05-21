import { AlertTriangle, Plus } from "lucide-react";
import { ColorCard } from "./ColorCard";
import {
  ADDITIONAL_COLOR_IDS,
  COLOR_IDS,
  ColorMap,
  FRIENDLY_NAMES,
  ORIGINAL_COLORS,
} from "../lib/bigfile";

export type CustomColor = { id: string; name: string };

type Props = {
  colors: ColorMap;
  customs: CustomColor[];
  onChange: (next: ColorMap) => void;
  onAddCustom: () => void;
  onDeleteCustom: (id: string) => void;
};

export function ColorEditor({ colors, customs, onChange, onAddCustom, onDeleteCustom }: Props) {
  const setOne = (id: string, hex: string) => onChange({ ...colors, [id]: hex });
  const resetOne = (id: string) => onChange({ ...colors, [id]: ORIGINAL_COLORS[id] });
  const canAddCustom = customs.length < ADDITIONAL_COLOR_IDS.length;

  return (
    <section className="space-y-4">
      <div>
        <h2>Player colors</h2>
        <p className="text-sm text-muted-foreground">
          Click a swatch to pick visually, or edit HEX / RGB / HSV in the popover.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {COLOR_IDS.map((id) => (
          <ColorCard
            key={id}
            id={id}
            name={FRIENDLY_NAMES[id]}
            value={colors[id]}
            canReset={(colors[id] ?? "").toUpperCase() !== ORIGINAL_COLORS[id].toUpperCase()}
            onChange={(hex) => setOne(id, hex)}
            onReset={() => resetOne(id)}
          />
        ))}

        {customs.map((c) => (
          <ColorCard
            key={c.id}
            id={c.id}
            name={c.name}
            value={colors[c.id] ?? "#808080"}
            isCustom
            onChange={(hex) => setOne(c.id, hex)}
            onDelete={() => onDeleteCustom(c.id)}
          />
        ))}

        {canAddCustom && (
          <button
            type="button"
            onClick={onAddCustom}
            className="group flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-card/40 p-4 text-muted-foreground transition-all hover:border-primary/50 hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground/60 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Plus className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium">Add custom</span>
            <span className="px-2 text-center text-xs text-muted-foreground">
              Define your own slot
            </span>
          </button>
        )}
      </div>

      {customs.length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <div>
            <div className="font-medium">Non-standard colors won't work in multiplayer.</div>
            <div className="text-muted-foreground">
              Only the seven original color IDs are recognised by other players. Custom slots are useful for skirmish and personal mods.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
