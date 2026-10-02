# How to Push & Release

This repository is equipped with an automated GitHub Actions release workflow (`.github/workflows/release.yml`).

---

## 1. Commit the Release Setup

Stage the new workflow and version bump:

```bash
git add .github/ manifest.json versions.json
git commit -m "chore(release): prepare 1.5.0 with automated github release workflow"
```

---

## 2. Push to GitHub

Push your commits to the `main` branch:

```bash
git push origin main
```

---

## 3. What Happens Automatically

As soon as you push:

1. **GitHub Action Triggers**: The `Release Plugin` workflow runs on GitHub.
2. **Quality Gate**: It validates JavaScript syntax (`node --check main.js`).
3. **Version Check**: It reads `"version": "1.5.0"` from `manifest.json` and sees that release `1.5.0` does not exist yet.
4. **Auto-Tagging**: It automatically creates and pushes the Git tag `1.5.0`.
5. **Assets Bundling**: It builds `quran-tajweed-1.5.0.zip`.
6. **Publishing Release**: It creates **GitHub Release 1.5.0** and uploads all 4 required files:
   - `manifest.json`
   - `main.js`
   - `styles.css`
   - `quran-tajweed-1.5.0.zip`
7. **Changelog**: It automatically generates formatted release notes from your recent commits.

---

## 4. How to Release in the Future

Whenever you want to publish a future release (e.g., `1.5.1` or `1.6.0`):

1. Update `"version"` in `manifest.json`.
2. Add the version mapping in `versions.json` (e.g. `"1.5.1": "0.15.0"`).
3. Commit and push:
   ```bash
   git add manifest.json versions.json
   git commit -m "chore(release): 1.5.1"
   git push origin main
   ```
4. The GitHub Action will detect the new version and publish the release automatically!
