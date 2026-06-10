# RA3 Color Palette Editor

Client-side color palette editor for **Command & Conquer: Red Alert 3**. The app lets players edit RA3 player colors, import a previously generated `Colors.big`, and download a ready-to-use patched `Colors.big` file.

The tool runs fully in the browser. Imported BIG files are processed locally and are not uploaded anywhere.

## Features

- Edit the seven standard Red Alert 3 player colors.
- Add up to five extra custom colors.
- Import a compatible generated `Colors.big` and continue editing it.
- Apply built-in presets.
- Download a generated `Colors.big` file.
- Light and dark theme support.
- Responsive UI for desktop and mobile.

## Player Installation

1. Open the site.
2. Choose or edit a palette.
3. Click **Generate & Download Colors.big**.
4. Copy the generated file to:

```txt
Red Alert 3/Data/Colors.big
```

5. Open your active `.SkuDef` file as a text document.
6. Add this line before the `add-config` line:

```txt
add-big Data\Colors.big
```

7. Save the `.SkuDef` file and launch the game.

To uninstall, remove the `add-big Data\Colors.big` line and delete `Colors.big` from the `Data` folder.

Make a backup of your `.SkuDef` file before editing it.

## Development

Requirements:

- Node.js 18 or newer.
- npm.

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Disclaimer

Unofficial fan-made tool. Use modified game files at your own risk. Some communities or tournaments may not allow modified files.
