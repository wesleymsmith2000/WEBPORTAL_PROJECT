# Community-Ready Design

This project begins as the canon portal for **A Veil of Void and Fire** and **The Veil Remembers**, but it should be built with a wider future in mind.

The long-term aim is to create a story-delivery framework that other artists, authors, game designers, musicians, educators, and fans can understand, adapt, fork, and extend. Canon comes first here, but the structure should not be so private or tangled that only the original creator can use it.

## North Star

Make the portal useful as both:

- A canonical archive for the original universe.
- A reusable pattern for offshoots, fan fiction, companion games, experimental media, and entirely new projects.

The codebase should help people explore new ways of delivering stories and visions without requiring them to become web infrastructure experts first.

## Design Principles

### Keep Story Content Portable

Story material should live in plain, readable formats whenever practical:

- Markdown for prose, lore, character dossiers, rules, and archive entries.
- Structured frontmatter for metadata.
- Normal image, audio, video, and document files for assets.

Someone should be able to open a content file and understand what episode, scene, character, or archive record it represents without running the app.

### Separate Canon From Engine

The project should avoid hardcoding AVVF-specific assumptions deep inside reusable components.

Prefer this split:

```text
Canon/content layer:   episodes, archives, characters, ships, games, art, audio
Presentation layer:    reader pages, archive views, navigation, audio controls
Framework layer:       schemas, layouts, utilities, asset conventions
```

If a future creator wants to tell a new story, they should mostly replace content and styling, not rewrite core page generation.

### Make Folders Self-Explaining

Folders should be named for how people think about creative work:

```text
assets/
  Act_1/
    Prose/
    Artwork/
    Storyboards/
    Audio/
    Notes/

src/content/
  episodes/
  archives/
  characters/
  ships/
  games/
```

Avoid clever internal names when a plain creative name will do.

### Prefer Manifests For Production Detail

Filenames should be readable, but detailed production metadata belongs in manifests or Markdown notes.

Good filename:

```text
act-01-episode-01-panel-002-halcyon-concord-deck-lettered.png
```

Good manifest fields:

```text
Asset ID
Filename
Episode
Scene
Panel Number
Variant
Characters Present
Associated Prose Beat
Continuity Notes
Status
```

This keeps folders scannable while preserving the deeper context future reviewers need.

### Keep Components General Where Possible

Components should usually describe their role, not the specific story:

```text
EpisodeCard
AudioDock
SiteNav
ReaderLayout
ArchiveEntry
CharacterDossier
```

Use AVVF-specific language in content and styling when it serves the canon experience, but keep the underlying patterns easy to reuse.

### Document The Creative Workflow

Every repeatable workflow should eventually have a short doc:

- Dropping off prose and artwork.
- Turning source art into web-ready images.
- Adding a new episode.
- Adding a new archive entry.
- Adding a character dossier.
- Adding game rules or playable prototypes.
- Forking the portal for a new project.

The docs should assume a mixed team: writers, artists, designers, musicians, game makers, developers, and fans may all touch the project.

## Canon And Derivative Work

This repository serves canon first. That means official AVVF / TVR content should be clearly marked and protected from accidental confusion with derivative or experimental material.

Recommended future categories:

```text
canon
draft-canon
developer-notes
fan-work
alternate-continuity
experimental
template
```

For now, the existing `status` field on episodes supports:

```text
draft
published
```

As the project grows, content schemas can expand to distinguish official canon, fan-created work, alternate timelines, and reusable templates.

## Forkability Goals

A future project should be able to fork this portal and replace:

- Site title and branding.
- Visual theme.
- Episode content.
- Archive categories.
- Character and ship collections.
- Game pages.
- Artwork and audio.

Without needing to replace:

- The Markdown content workflow.
- The episode reader pattern.
- The asset drop-off conventions.
- The static site generation approach.
- The accessibility baseline.

## Contributor Experience

Future contributors should be able to answer these questions quickly:

- Where do I put source files?
- Where do web-ready files go?
- Where is the content that appears on the site?
- What naming pattern should I use?
- What metadata is required?
- What is canon, draft, or experimental?
- How do I preview my work?

When the project feels confusing, improve the docs, folder names, schemas, or examples before adding private process knowledge.

## Practical Guideline

Build the first canon portal as if it may become the example project for many later portals.

The code can be simple. The content can be specific. The structure should be generous.
