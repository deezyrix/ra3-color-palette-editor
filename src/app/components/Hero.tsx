import { useState } from "react";

const BEFORE_URL = new URL("../../imports/compare-before.webp", import.meta.url).href;
const AFTER_URL = new URL("../../imports/compare-after.webp", import.meta.url).href;

export function Hero() {
  const [split, setSplit] = useState(50);

  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Unofficial fan-made tool
          </span>
          <h1>Edit Red Alert 3 player colors</h1>
          <p className="text-muted-foreground">
            Choose or edit a palette, generate Colors.big, and plug it into your RA3 Data folder.
          </p>
        </div>
        <div className="relative min-h-[220px] bg-secondary/40">
          <div className="absolute inset-0 overflow-hidden" style={{ cursor: "ew-resize" }}>
            <img
              src={BEFORE_URL}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={AFTER_URL}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: `inset(0 0 0 ${split}%)` }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-white/95 shadow-[0_0_0_1px_rgba(0,0,0,0.16),0_0_20px_rgba(0,0,0,0.35)]"
              style={{ left: `${split}%`, transform: "translateX(-1px)" }}
            >
              <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-background/90 text-foreground shadow-xl backdrop-blur">
                <span className="relative h-4 w-5">
                  <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b-2 border-l-2 border-current" />
                  <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-current" />
                </span>
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={split}
              aria-label="Move to compare original and changed airfield colors"
              onChange={(event) => setSplit(Number(event.target.value))}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
