# GoldStockData Premium Landing Page

This repository contains a static landing page demo inspired by the GoldStockData Premium
experience. The page is provided at the repository root and in `public/` for preview tooling that
expects static assets in that folder.

## Local Preview

You can open `public/index.html` directly in a browser, or serve the directory with a simple HTTP
server.

### Option 1: Python (macOS/Linux/Windows)

1. Open a terminal and change into the project folder (the one that contains `public/`).

   ```bash
   cd path/to/valuation-master
   ```

2. Start the server from the repo root:

   ```bash
   python -m http.server 8000 --directory public
   ```

If you are on Windows and see an error that Python is not found, try the Python launcher instead:

```powershell
py -m http.server 8000 --directory public
```

If neither command works, install Python from https://www.python.org/downloads/ and re-open your
terminal so the command is available.

If you still see a 404, double-check you started the server from the repo root and that
`public/index.html` exists. You can also provide an absolute path instead:

```powershell
py -m http.server 8000 --directory "C:\\Users\\User\\valuation-master\\public"
```

If the `--directory` flag keeps giving 404s, switch into the `public` folder first and start the
server there:

```powershell
cd C:\Users\User\valuation-master\public
py -m http.server 8000
```

### Option 2: Node.js (any OS)

If you have Node.js installed, you can serve the site with:

```bash
npx serve public
```

Then visit `http://localhost:8000` (Python) or the URL printed by `npx serve` in your browser.

## Troubleshooting

If your `public/` folder only contains a `.gitkeep` file, you likely have an older copy or the
wrong branch. Make sure you are in the correct repository, then run:

```bash
git pull
```

After updating, confirm that `public/index.html`, `public/styles.css`, and `public/app.js` are
present.
