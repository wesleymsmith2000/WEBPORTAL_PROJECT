# ChatGPT Asset Handoff Guide

This guide is for ChatGPT sessions that are helping create, revise, merge, or package prose and artwork for **A Veil of Void and Fire**, **The Veil Remembers**, **Primordial Cipher**, and **Collatz Concourse**.

The goal is to produce clean creative assets that can be dropped into the local project folders and then integrated into the web portal without guesswork.

## Project Drop-Off Locations

Primary portal project:

```text
C:\Users\wesle\OneDrive\Documents\The Veil Remembers\VeilOfVoidAndFire\Webportal_Project
```

Sibling project folders:

```text
C:\Users\wesle\OneDrive\Documents\The Veil Remembers\PrimordialCipher
C:\Users\wesle\OneDrive\Documents\The Veil Remembers\CollatzConcourse
```

Use each project's `assets` folder as the source-material drop-off area. If an `_inbox` or `ChatGPT_Dropoff` folder exists, place new raw deliverables there first.

Recommended drop-off pattern:

```text
assets/
  _inbox/
  Act_1/
    Prose/
    Artwork/
    Storyboards/
    Audio/
    Notes/
```

## Important Separation

Use this distinction consistently:

```text
assets/       Source files, raw exports, full-resolution art, drafts, notes.
src/content/  Markdown files the Astro website reads.
public/       Web-ready files that the browser can load directly.
```

Do not tell the user to place finished prose directly into `src/content` unless the file already includes valid Astro frontmatter. Most ChatGPT-generated material should first land in `assets/`, then Codex can adapt it into the site schema.

Do not tell the user to place full-resolution source artwork directly into `public/`. Put original art in `assets/`; create optimized web copies later for `public/images`.

## Naming Rules

Use lowercase, hyphen-separated filenames when creating final packaged assets:

```text
act-01-episode-01-final-prose.md
act-01-episode-01-revision-notes.md
act-01-episode-01-hero-art.png
act-01-episode-01-panel-001-stars-folding-clean.png
act-01-episode-01-panel-002-halcyon-concord-deck-lettered.png
cipher-breyden-rules-v01.md
collatz-concourse-track-notes-v01.md
```

For artwork, include a short scene title after the panel number:

```text
act-01-episode-01-panel-###-scene-title-variant.png
```

Common variants include:

```text
clean
lettered
annotated
draft
final
```

Avoid spaces in filenames. Avoid vague names such as:

```text
final.md
new-art.png
episode.txt
image-1.png
```

If a file is a draft, say so:

```text
act-01-episode-02-draft-prose.md
act-01-episode-02-art-direction-draft.md
```

## Episode Prose Package

When preparing prose for an episode, provide a single Markdown file with these sections:

```markdown
# Act 01 Episode 01: Episode Title

## Canon Status

Draft, revised draft, final candidate, or final.

## One-Sentence Summary

A concise story summary.

## Continuity Notes

Canon constraints, character state, location, timeline placement, and dependencies.

## Finished Prose

The episode prose intended for the reader page.

## Dialogue Notes

Any dialogue that may later need speech bubbles, narration, voice acting, or timing.

## Panel / Scene Beats

Numbered visual beats for comic panels, storyboards, or motion treatment.

## Sound / Music Notes

Suggested soundtrack mood, cues, sound effects, silence, or narration timing.

## Related Archive Hooks

Characters, ships, concepts, locations, historical records, equations, or games that should link from the episode.
```

The `Finished Prose` section should be clean and readable. Keep revision discussion, alternatives, and discarded lines outside that section.

## Artwork Package

When preparing artwork, include both the image files and a companion Markdown file:

```text
act-01-episode-01-artwork-notes.md
act-01-episode-01-hero-art.png
act-01-episode-01-panel-001-stars-folding-clean.png
act-01-episode-01-panel-002-halcyon-concord-deck-lettered.png
```

The artwork notes file should include:

```markdown
# Act 01 Episode 01 Artwork Notes

## Asset List

- `act-01-episode-01-hero-art.png`
- `act-01-episode-01-panel-001-stars-folding-clean.png`

## Intended Use

Hero image, panel, archive image, character portrait, ship diagram, map, prop, icon, or background.

## Alt Text

Concise accessibility text for each image.

## Caption

Optional reader-facing caption.

## Visual Continuity

Characters, costumes, ships, symbols, colors, setting details, and scale notes that must remain consistent.

## Source Prompt

Prompt used to generate the image, if available.

## Negative Prompt / Avoid

Things the image should not contain or that should be corrected in future passes.
```

## Dialogue Overlay Package

Dialogue, narration, and thought bubbles should usually remain as editable text in the episode Markdown rather than being permanently baked into clean artwork.

When suggesting overlays, use panel-relative percentages:

```yaml
dialogue:
  - speaker: "Azura"
    text: "I have you. Breathe with me."
    x: 49
    y: 35
    width: 24
    variant: "speech"
    tail: "right"
```

Supported variants:

```text
speech
thought
narration
```

Supported tails:

```text
left
right
none
```

The web reader can show dialogue overlays as always on, always off, or on panel hover/focus. Future audio-sync work can extend this same overlay data with timing fields.

## Image Export Guidance

Prefer PNG for crisp illustrations, diagrams, UI-like assets, and transparent images.

Prefer JPG or WEBP for large painterly scene art if file size matters.

Recommended source sizes:

```text
Hero art:       2400px wide or larger
Vertical panel: 1600px wide or larger
Portrait:       1600px tall or larger
Diagram/map:    2400px wide or larger
```

Do not upscale low-quality images just to hit these numbers. Native clean output is more useful than inflated resolution.

## Web Portal Episode Frontmatter Target

The current Astro episode schema expects this shape:

```yaml
---
title: "Episode Title"
subtitle: "A Veil of Void and Fire"
act: 1
episode: 1
summary: "Short summary."
status: "draft"
heroImage: "/images/act-1/artwork/example.png"
soundtrack:
  title: "Track Title"
  note: "Audio pending."
panels:
  - image: "/images/act-1/storyboards/example.png"
    alt: "Accessible image description."
    caption: "Optional caption."
related:
  - "Concord Archives"
---

Episode prose begins here.
```

ChatGPT may include suggested frontmatter, but it should not assume final public image paths unless those paths are known.

## Related Projects

Use the same source package logic for the sibling projects.

### Primordial Cipher

Use for mathematical, symbolic, puzzle, rules, lore, and Cipher Breyden material:

```text
PrimordialCipher/assets/_inbox/
PrimordialCipher/assets/Rules/
PrimordialCipher/assets/Puzzles/
PrimordialCipher/assets/Artwork/
PrimordialCipher/assets/Lore/
```

### Collatz Concourse

Use for racing game rules, tracks, vehicle concepts, faction notes, diagrams, and match/replay ideas:

```text
CollatzConcourse/assets/_inbox/
CollatzConcourse/assets/Rules/
CollatzConcourse/assets/Tracks/
CollatzConcourse/assets/Vehicles/
CollatzConcourse/assets/Artwork/
CollatzConcourse/assets/Lore/
```

## Delivery Checklist

Before handing files back to the user, make sure:

- Filenames are specific and hyphen-separated.
- Prose has a clean `Finished Prose` section.
- Artwork includes alt text and intended use.
- Canon status is clearly marked.
- Related archive/game hooks are listed.
- Source prompts are included when available.
- Draft material is labeled as draft.
- Web-ready assumptions are called out instead of hidden.

## Best Instruction To Follow

Package creative work as source material first. Preserve the creative intent, label the canon status, describe how each asset should be used, and avoid forcing web implementation details unless the project schema is known.
