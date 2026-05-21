import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "./ui/utils";

type Mode = "light" | "dark";
const KEY = "ra3-theme";

function applyTheme(mode: Mode) {
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
}

function getInitialMode(): Mode {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeSwitcher() {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const opts: { value: Mode; icon: typeof Sun; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-0.5 rounded-md border border-border bg-card p-0.5"
    >
      {opts.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          role="radio"
          aria-checked={mode === value}
          aria-label={label}
          onClick={() => {
            localStorage.setItem(KEY, value);
            setMode(value);
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors",
            mode === value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-accent",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
