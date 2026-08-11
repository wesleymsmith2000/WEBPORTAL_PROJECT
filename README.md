# AVVF Canon Portal

Astro prototype for the official web portal for **A Veil of Void and Fire** and **The Veil Remembers**.

## Commands

Use `npm.cmd` from PowerShell if script execution blocks the `npm` shim.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

## Structure

- `src/content/episodes/` contains markdown-driven episode data.
- `src/pages/read/[slug].astro` renders episode pages from content.
- `src/components/AudioDock.astro` provides the no-autoplay soundtrack control surface.
- `public/images/` contains web-served artwork copied from the source `assets/` folder.

## Documentation

- `docs/architecture.md` explains the current static Astro structure.
- `docs/chatgpt_asset_handoff.md` explains how prose and artwork should be packaged for drop-off.
- `docs/community_ready_design.md` captures the long-term goal of making the portal understandable, forkable, and useful to future collaborators.
- `docs/voice_narration_strategy.md` captures the provider-agnostic plan for narration, character voices, audio timelines, consent, and voice identity.

## v0.1 Scope

- Landing page
- Episode index
- Episode reader template
- Placeholder soundtrack controls
- Concord Archives landing page
- Games landing page
- Responsive navigation
- Dark-mode visual foundation
