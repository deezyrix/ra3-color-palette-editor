export type ColorMap = Record<string, string>;

export const COLOR_IDS = [
  "ColorRed",
  "ColorOrange",
  "ColorGold",
  "ColorGreen",
  "ColorSkyBlue",
  "ColorBlue",
  "ColorPurple",
] as const;

export type ColorId = (typeof COLOR_IDS)[number];

export const ADDITIONAL_COLOR_IDS = [
  "ColorPink",
  "ColorBurgundy",
  "ColorYellow",
  "ColorDarkGreen",
  "ColorCustom",
] as const;

export type AdditionalColorId = (typeof ADDITIONAL_COLOR_IDS)[number];

export const FRIENDLY_NAMES: Record<ColorId, string> = {
  ColorRed: "Red",
  ColorOrange: "Orange",
  ColorGold: "Gold",
  ColorGreen: "Green",
  ColorSkyBlue: "Sky Blue",
  ColorBlue: "Blue",
  ColorPurple: "Purple",
};

export const ADDITIONAL_FRIENDLY_NAMES: Record<AdditionalColorId, string> = {
  ColorPink: "Pink",
  ColorBurgundy: "Burgundy",
  ColorYellow: "Yellow",
  ColorDarkGreen: "Dark Green",
  ColorCustom: "Custom",
};

export const ORIGINAL_COLORS: ColorMap = {
  ColorGold: "#F0D719",
  ColorRed: "#E61414",
  ColorBlue: "#324BC8",
  ColorGreen: "#14693C",
  ColorOrange: "#E17314",
  ColorSkyBlue: "#66CFF8",
  ColorPurple: "#7D19C8",
};

export const ADDITIONAL_DEFAULT_COLORS: Record<AdditionalColorId, string> = {
  ColorPink: "#F898F8",
  ColorBurgundy: "#7D0101",
  ColorYellow: "#A6D00D",
  ColorDarkGreen: "#104C29",
  ColorCustom: "#808080",
};

export const OPTIMAL_V34: ColorMap = {
  ColorRed: "#D83A2E",
  ColorOrange: "#F59A1A",
  ColorGold: "#EEEC32",
  ColorGreen: "#009C4A",
  ColorSkyBlue: "#70D4F7",
  ColorBlue: "#2563EB",
  ColorPurple: "#B347F5",
};

export const SHIFTED_SPECTRUM: ColorMap = {
  ColorRed: "#730008",
  ColorOrange: "#E57D22",
  ColorGold: "#CBE522",
  ColorGreen: "#06731C",
  ColorSkyBlue: "#39DAE5",
  ColorBlue: "#005473",
  ColorPurple: "#E500E5",
};

const TEMPLATE_URLS: Record<number, string> = {
  0: new URL("../../imports/original.big", import.meta.url).href,
  1: new URL("../../imports/original-plus1.big", import.meta.url).href,
  2: new URL("../../imports/original-plus2.big", import.meta.url).href,
  3: new URL("../../imports/original-plus3.big", import.meta.url).href,
  4: new URL("../../imports/original-plus4.big", import.meta.url).href,
  5: new URL("../../imports/original-plus5.big", import.meta.url).href,
};

const MOD_BIN_SIZES: Record<number, number> = {
  0: 296,
  1: 336,
  2: 380,
  3: 424,
  4: 468,
  5: 512,
};

const EXTRA_COUNT_BY_MOD_BIN_SIZE = Object.fromEntries(
  Object.entries(MOD_BIN_SIZES).map(([count, size]) => [size, Number(count)]),
) as Record<number, number>;

type PatchSpec = { day: number[]; night: number[] };
type PatchMap = Record<string, PatchSpec>;

const PATCH_MAPS: Record<number, PatchMap> = {
  0: {
    ColorBlue: { day: [397], night: [405] },
    ColorGold: { day: [437], night: [445] },
    ColorGreen: { day: [477], night: [485] },
    ColorOrange: { day: [517], night: [525] },
    ColorPurple: { day: [561], night: [569] },
    ColorRed: { day: [605], night: [613] },
    ColorSkyBlue: { day: [645], night: [653] },
  },
  1: {
    ColorBlue: { day: [397], night: [405] },
    ColorGold: { day: [437], night: [445] },
    ColorGreen: { day: [477], night: [485] },
    ColorOrange: { day: [517], night: [525] },
    ColorPink: { day: [561], night: [569] },
    ColorPurple: { day: [601], night: [609] },
    ColorRed: { day: [645], night: [653] },
    ColorSkyBlue: { day: [685], night: [693] },
  },
  2: {
    ColorBlue: { day: [397], night: [405] },
    ColorBurgundy: { day: [437], night: [445] },
    ColorGold: { day: [481], night: [489] },
    ColorGreen: { day: [521], night: [529] },
    ColorOrange: { day: [561], night: [569] },
    ColorPink: { day: [605], night: [613] },
    ColorPurple: { day: [645], night: [653] },
    ColorRed: { day: [689], night: [697] },
    ColorSkyBlue: { day: [729], night: [737] },
  },
  3: {
    ColorBlue: { day: [397], night: [405] },
    ColorBurgundy: { day: [437], night: [445] },
    ColorGold: { day: [481], night: [489] },
    ColorGreen: { day: [521], night: [529] },
    ColorOrange: { day: [561], night: [569] },
    ColorPink: { day: [605], night: [613] },
    ColorPurple: { day: [645], night: [653] },
    ColorRed: { day: [689], night: [697] },
    ColorSkyBlue: { day: [729], night: [737] },
    ColorYellow: { day: [773], night: [781] },
  },
  4: {
    ColorBlue: { day: [397], night: [405] },
    ColorBurgundy: { day: [437], night: [445] },
    ColorDarkGreen: { day: [481], night: [489] },
    ColorGold: { day: [525], night: [533] },
    ColorGreen: { day: [565], night: [573] },
    ColorOrange: { day: [605], night: [613] },
    ColorPink: { day: [649], night: [657] },
    ColorPurple: { day: [689], night: [697] },
    ColorRed: { day: [733], night: [741] },
    ColorSkyBlue: { day: [773], night: [781] },
    ColorYellow: { day: [817], night: [825] },
  },
  5: {
    ColorBlue: { day: [397], night: [405] },
    ColorBurgundy: { day: [437], night: [445] },
    ColorCustom: { day: [481], night: [489] },
    ColorDarkGreen: { day: [525], night: [533] },
    ColorGold: { day: [569], night: [577] },
    ColorGreen: { day: [609], night: [617] },
    ColorOrange: { day: [649], night: [657] },
    ColorPink: { day: [693], night: [701] },
    ColorPurple: { day: [733], night: [741] },
    ColorRed: { day: [777], night: [785] },
    ColorSkyBlue: { day: [817], night: [825] },
    ColorYellow: { day: [861], night: [869] },
  },
};

let templateCache: Record<number, Uint8Array> = {};

type BigEntry = {
  name: string;
  offset: number;
  size: number;
};

export function isValidHex(v: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(v.trim());
}

function normalizeHex(hex: string): string {
  const trimmed = hex.trim();
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  return withHash.toUpperCase();
}

function hexToBgra(hex: string): [number, number, number, number] {
  const value = normalizeHex(hex).replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return [b, g, r, 255];
}

function bgraToHex(bytes: Uint8Array, offset: number): string {
  const b = bytes[offset];
  const g = bytes[offset + 1];
  const r = bytes[offset + 2];
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function readU32BE(bytes: Uint8Array, offset: number): number {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, false);
}

function readU32LE(bytes: Uint8Array, offset: number): number {
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset, true);
}

function parseBigEntries(bytes: Uint8Array, label: string): BigEntry[] {
  if (bytes.length < 685) {
    throw new Error(`${label} is too small to be a supported Colors.big file.`);
  }

  const magic = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
  if (magic !== "BIG4") {
    throw new Error(`${label} is not a BIG4 file.`);
  }

  const declaredSize = readU32LE(bytes, 4);
  if (declaredSize !== bytes.length) {
    throw new Error(`${label} has an invalid BIG size header.`);
  }

  const entryCount = readU32BE(bytes, 8);
  const tableEnd = readU32BE(bytes, 12);
  if (entryCount < 1 || entryCount > 128 || tableEnd <= 16 || tableEnd >= bytes.length) {
    throw new Error(`${label} has an invalid BIG file table.`);
  }

  const decoder = new TextDecoder();
  const entries: BigEntry[] = [];
  let cursor = 16;
  for (let index = 0; index < entryCount; index += 1) {
    if (cursor + 8 >= tableEnd) {
      throw new Error(`${label} has a truncated BIG file table.`);
    }

    const offset = readU32BE(bytes, cursor);
    const size = readU32BE(bytes, cursor + 4);
    cursor += 8;

    const nameStart = cursor;
    while (cursor < tableEnd && bytes[cursor] !== 0) cursor += 1;
    if (cursor >= tableEnd) {
      throw new Error(`${label} has an unterminated BIG entry name.`);
    }

    const name = decoder.decode(bytes.subarray(nameStart, cursor));
    cursor += 1;
    if (!name || offset < tableEnd || offset + size > bytes.length) {
      throw new Error(`${label} has an invalid BIG entry.`);
    }

    entries.push({ name, offset, size });
  }

  return entries;
}

function validateSupportedColorBig(bytes: Uint8Array, label: string) {
  const entries = parseBigEntries(bytes, label);
  const modBin = entries.find((entry) => entry.name.toLowerCase() === "data\\mod.bin");
  if (!modBin) {
    throw new Error(`${label} does not contain data\\mod.bin.`);
  }

  const extraCount = EXTRA_COUNT_BY_MOD_BIN_SIZE[modBin.size];
  if (modBin.offset !== 389 || extraCount === undefined) {
    throw new Error(`${label} does not match the supported RA3 color BIG layout.`);
  }

  const patchMap = PATCH_MAPS[extraCount];
  for (const id of [...COLOR_IDS, ...ADDITIONAL_COLOR_IDS.slice(0, extraCount)]) {
    const spec = patchMap[id];
    if (!spec) {
      throw new Error(`${label} has an unsupported RA3 color order.`);
    }

    for (const offset of [...spec.day, ...spec.night]) {
      if (bytes[offset + 3] !== 255) {
        throw new Error(`${label} does not look like a RA3 color palette BIG.`);
      }
    }
  }

  return extraCount;
}

function getAdditionalCount(colors: ColorMap): number {
  return ADDITIONAL_COLOR_IDS.filter((id) => id in colors).length;
}

async function getTemplateBytes(additionalCount: number): Promise<Uint8Array> {
  if (templateCache[additionalCount]) return new Uint8Array(templateCache[additionalCount]);

  const response = await fetch(TEMPLATE_URLS[additionalCount]);
  if (!response.ok) {
    throw new Error("Could not load bundled Colors.big template.");
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const detectedCount = validateSupportedColorBig(bytes, "Bundled template");
  if (detectedCount !== additionalCount) {
    throw new Error("Bundled template does not match the requested color layout.");
  }

  templateCache[additionalCount] = bytes;
  return new Uint8Array(templateCache[additionalCount]);
}

export async function buildBig(colors: ColorMap): Promise<Blob> {
  const additionalCount = getAdditionalCount(colors);
  const output = await getTemplateBytes(additionalCount);
  const patchMap = PATCH_MAPS[additionalCount];
  const idsToPatch = [...COLOR_IDS, ...ADDITIONAL_COLOR_IDS.slice(0, additionalCount)];

  for (const id of idsToPatch) {
    const fallback = ORIGINAL_COLORS[id] ?? ADDITIONAL_DEFAULT_COLORS[id as AdditionalColorId] ?? "#888888";
    const hex = normalizeHex(colors[id] ?? fallback);
    if (!isValidHex(hex)) {
      const label = FRIENDLY_NAMES[id as ColorId] ?? ADDITIONAL_FRIENDLY_NAMES[id as AdditionalColorId] ?? id;
      throw new Error(`${label} has an invalid HEX value.`);
    }

    const encoded = hexToBgra(hex);
    const spec = patchMap[id];
    for (const offset of [...spec.day, ...spec.night]) {
      output.set(encoded, offset);
    }
  }

  return new Blob([output], { type: "application/octet-stream" });
}

export async function buildBigBytes(colors: ColorMap): Promise<Uint8Array> {
  return new Uint8Array(await (await buildBig(colors)).arrayBuffer());
}

export async function parseBig(file: File): Promise<ColorMap | null> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const additionalCount = validateSupportedColorBig(bytes, "Imported file");
  const patchMap = PATCH_MAPS[additionalCount];
  const colors: ColorMap = {};

  for (const id of [...COLOR_IDS, ...ADDITIONAL_COLOR_IDS.slice(0, additionalCount)]) {
    colors[id] = bgraToHex(bytes, patchMap[id].day[0]);
  }

  return colors;
}
