# Architecture Notes

The portal starts as a static Astro site so story content can grow without adding a backend too early.

This first site serves as the canon portal for AVVF / TVR, but the architecture should remain understandable and reusable enough that future collaborators can adapt it for offshoots, fan fiction, companion games, or completely new story projects. See `docs/community_ready_design.md` for the larger design intent.

## Content Model

Episodes live in `src/content/episodes/` as markdown files. Frontmatter stores structured data such as act, episode number, soundtrack metadata, panel sequence, and related archive entries. The page body stores narration or prose.

## Reader

`src/pages/read/[slug].astro` uses Astro static paths to generate one page per episode. The reader supports:

- Hero artwork
- Markdown narration
- Vertical panel sequence
- Sticky audio controls
- Related archive placeholders

Future narration, character dialogue, ambience, and sound effects should extend
the same episode/timeline model instead of becoming a separate playback system.
See `docs/voice_narration_strategy.md` for the voice identity, provenance, and
provider-abstraction strategy.

## Assets

Original production files can remain under `assets/`. Web-ready copies should be placed under `public/` so pages can reference stable root-relative URLs.
