# NFL Sim Frontend

This Astro site displays NFL simulation standings taken from a remote JSON file and is published to GitHub Pages via a GitHub Actions workflow.

What it does
- At build time the site fetches the JSON from:
  `https://raw.githubusercontent.com/durkinliam/nfl-sim-r/refs/heads/main/outright_output.json`
- The page `src/pages/index.astro` parses that JSON and renders a table using `src/components/StandingsTable.astro`.
- On every push to `main`, the workflow `.github/workflows/deploy-gh-pages.yml` builds the site and publishes the generated `dist/` folder to the `gh-pages` branch using the provided `GITHUB_TOKEN`.

Live site URL (after first successful deployment)
- Expected URL (project pages): https://durkinliam.github.io/nfl-sim-frontend

Note: if this repository is under a different GitHub account or has a different name, substitute the correct username/repo in the URL above.

How to test locally
1. Install deps and build locally:

```bash
npm ci
npm run build
```

2. After a successful build confirm `dist/` contains the generated HTML/CSS assets.

How to trigger CI deploy
- Push to the `main` branch. The workflow `Build and Publish to gh-pages` (in `.github/workflows/deploy-gh-pages.yml`) runs on every push to `main` and on a daily schedule as configured.

How to verify the publish
1. In Actions (GitHub UI) open the workflow run triggered by your push. Check these steps:
   - `Build` ran successfully and `List built files (debug)` shows `dist/index.html`.
   - `Deploy to gh-pages` completed successfully.
   - `Configure GitHub Pages to use gh-pages branch` returned a Pages configuration JSON.
   - `Verify gh-pages contains index.html` prints a match for `index.html` (or an error message if not found).

2. After a successful deploy, visit the site at the URL above. If you see a 404, it can mean:
   - The `gh-pages` branch wasn't updated (check the `Deploy to gh-pages` step logs), or
   - GitHub Pages hasn't finished provisioning yet (wait a minute and refresh), or
   - The repository/Pages settings differ; you can check `Settings → Pages` in the GitHub repo UI.

Quick CLI checks (optional)
```bash
git fetch origin gh-pages:gh-pages
git checkout gh-pages
ls -la
```

Notes & next steps
- The site performs a server-side fetch during build, so there are no CORS issues.
- If you want stricter TypeScript checking for the page that performs the fetch, I can help add explicit types to `src/pages/index.astro` and update `tsconfig.json` back to Astro's `strict` preset.

