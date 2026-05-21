import { useEffect, useMemo, useState } from "react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Hero } from "./components/Hero";
import { Presets } from "./components/Presets";
import { ColorEditor, CustomColor } from "./components/ColorEditor";
import { ActionsPanel } from "./components/ActionsPanel";
import { InstallGuide } from "./components/InstallGuide";
import { BackToTop } from "./components/BackToTop";
import {
  ADDITIONAL_COLOR_IDS,
  ADDITIONAL_DEFAULT_COLORS,
  ADDITIONAL_FRIENDLY_NAMES,
  ColorMap,
  ORIGINAL_COLORS,
  OPTIMAL_V34,
  SHIFTED_SPECTRUM,
} from "./lib/bigfile";

const EMBLEM_URL = new URL("../imports/12d0dcff-200a-4233-92dd-65d51bc6b867.png", import.meta.url).href;

function colorsMatchExactly(current: ColorMap, target: ColorMap) {
  const currentKeys = Object.keys(current);
  const targetKeys = Object.keys(target);
  if (currentKeys.length !== targetKeys.length) return false;

  return targetKeys.every((key) => (current[key] ?? "").toUpperCase() === target[key].toUpperCase());
}

export default function App() {
  const [colors, setColors] = useState<ColorMap>({ ...ORIGINAL_COLORS });
  const customs = useMemo<CustomColor[]>(
    () =>
      ADDITIONAL_COLOR_IDS.filter((id) => id in colors).map((id) => ({
        id,
        name: ADDITIONAL_FRIENDLY_NAMES[id],
      })),
    [colors],
  );

  useEffect(() => {
    const saved = localStorage.getItem("ra3-theme") as "light" | "dark" | null;
    const isDark =
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const activePresetKey = useMemo(() => {
    const coreMatches = (target: ColorMap) =>
      Object.keys(target).every((key) => (colors[key] ?? "").toUpperCase() === target[key].toUpperCase());

    if (coreMatches(ORIGINAL_COLORS)) return "original";
    if (coreMatches(OPTIMAL_V34)) return "optimal";
    if (coreMatches(SHIFTED_SPECTRUM)) return "shifted-spectrum";
    return undefined;
  }, [colors]);

  const canResetPalette = useMemo(() => !colorsMatchExactly(colors, ORIGINAL_COLORS), [colors]);

  const addCustom = () => {
    const nextId = ADDITIONAL_COLOR_IDS.find((id) => !(id in colors));
    if (!nextId) return;
    setColors({ ...colors, [nextId]: ADDITIONAL_DEFAULT_COLORS[nextId] });
  };

  const deleteCustom = (id: string) => {
    const remainingValues = ADDITIONAL_COLOR_IDS.filter((customId) => customId !== id && customId in colors).map(
      (customId) => colors[customId],
    );
    const next: ColorMap = { ...colors };
    for (const customId of ADDITIONAL_COLOR_IDS) {
      delete next[customId];
    }
    remainingValues.forEach((hex, index) => {
      next[ADDITIONAL_COLOR_IDS[index]] = hex;
    });
    setColors(next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src={EMBLEM_URL}
              alt="RA3 Color Palette Editor emblem"
              className="h-9 w-9 shrink-0 object-contain"
            />
            <div className="min-w-0">
              <div className="truncate font-medium leading-tight">RA3 Color Palette Editor</div>
              <div className="hidden text-xs text-muted-foreground sm:block">
                Skirmish colors editor for C&C: Red Alert 3
              </div>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 pb-3 pt-6 md:pb-3 md:pt-8">
        <Hero />

        <ColorEditor
          colors={colors}
          customs={customs}
          onChange={setColors}
          onAddCustom={addCustom}
          onDeleteCustom={deleteCustom}
        />

        <ActionsPanel colors={colors} onChange={setColors} canResetPalette={canResetPalette} />

        <section className="space-y-3">
          <div>
            <h2>Presets</h2>
            <p className="text-sm text-muted-foreground">Apply a known-good palette in one click.</p>
          </div>
          <Presets activeKey={activePresetKey} onApply={(c) => setColors({ ...colors, ...c })} />
        </section>

        <InstallGuide />

        <footer className="space-y-3">
          <div className="rounded-md border border-border bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
            Unofficial fan-made tool. Use modified game files at your own risk. Some communities or tournaments may not allow modified files.
          </div>
          <div className="flex flex-col items-center gap-1 pt-2 text-center text-xs text-muted-foreground">
            <div>
              Made by <span className="font-medium text-foreground">deezy</span>.
            </div>
            <div>
              Thanks to <span className="font-medium text-foreground">Flexus</span> and{" "}
              <span className="font-medium text-foreground">4925</span> for help with game modding.
            </div>
          </div>
        </footer>
      </main>

      <BackToTop />
    </div>
  );
}
