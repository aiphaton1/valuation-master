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

If you still see a 404 at `http://localhost:8000/`, open the page directly at
`http://localhost:8000/index.html`.

### Option 2: Node.js (any OS)

If you have Node.js installed, you can serve the site with:

```bash
npx serve public
```

Then visit `http://localhost:8000` (Python) or the URL printed by `npx serve` in your browser.
