# A Veil of Void and Fire — Canon Portal

## Project Initialization & Design Brief

# Overview

This repository is the official web portal for **A Veil of Void and Fire (AVVF)** and its companion series **The Veil Remembers (TVR)**.

The goal is **not** to build a traditional website or a simple webcomic reader.

Instead, this project should become the canonical digital experience for the franchise—a multimedia story platform that combines:

* Illustrated webtoon/comic presentation
* Novel-style narration
* Radio drama presentation
* Original soundtrack integration
* Interactive lore archives
* Companion games
* Character dossiers
* Technical documents
* Future community features

The portal should feel like opening a living archive from within the world itself.

---

# Design Philosophy

The experience should emphasize immersion, simplicity, and readability.

Readers should feel like they are entering the archives of the Concord rather than browsing a commercial website.

The interface should disappear behind the story.

Primary principles:

* Mobile-first
* Fast loading
* Minimal distractions
* Accessibility-first
* Dark mode by default
* Elegant typography
* Cinematic presentation
* Long-term maintainability

---

# Core Experience

The canonical experience consists of synchronized media.

Each episode contains:

* Opening title
* Episode artwork
* Background soundtrack
* Narration
* Dialogue
* Sound effects
* Vertical scrolling comic panels
* Ending credits
* Links to soundtrack and related lore

Readers should be encouraged to:

> 🎧 Put on headphones.
>
> Press Play.
>
> Begin scrolling.

Audio should never autoplay.

---

# Initial Technology Goals

Preferred stack:

* Astro
* TypeScript
* Markdown (or MDX)
* Static Site Generation
* GitHub repository
* Responsive CSS
* Minimal JavaScript

Avoid unnecessary frameworks.

Favor static generation wherever practical.

---

# Initial Site Structure

Home

* Latest Episode
* Begin Reading
* About the Universe
* Latest News

Read

* Acts
* Episodes
* Episode Reader

Listen

* Original Soundtracks
* Character Themes
* Ambient Collections

Watch

* Motion Comics
* Trailers
* Behind-the-scenes

Archives

* Timeline
* Concord Archives
* Technical Papers
* Ship Database
* Character Profiles
* Glossary

Games

* Cipher Breyden
* Collatz-Concourse
* Rules
* Downloads

About

* Project
* Credits
* Contact

---

# Episode Architecture

Episodes should be data-driven.

Avoid hardcoding page layouts.

Each episode should be generated from structured content.

Suggested content fields:

* title
* subtitle
* act
* episode number
* summary
* soundtrack
* narration
* panel sequence
* captions
* dialogue
* sound effects
* related archive entries

Future additions should require only new content files.

---

# Artwork Pipeline

Artwork will be produced externally.

The website should support:

* Single illustrations
* Vertical comic panels
* Splash pages
* Character portraits
* Maps
* Technical diagrams

Images should lazy-load.

Support high-resolution displays.

---

# Audio System

Support:

* Embedded soundtrack
* Ambient loops
* Optional narration
* Future chapter playlists

Audio controls should remain available while scrolling.

Do not autoplay.

Narration and character dialogue should be planned as provider-agnostic story
assets. A character's canonical voice should be a portable Voice Identity /
Voice Bible, not a hardcoded TTS provider voice ID or cloned voice model. Scene
delivery should live in separate performance metadata, and rendered audio should
be treated as an output that can be cached or replaced.

For the current portal, published webtoon episodes should favor pre-rendered
deterministic mixes synchronized to scroll anchors. Future generated speech,
voice transformation, and reference-audio analysis should plug into this model as
adapters. Keep transcripts, captions, speaker identity, and no-autoplay behavior
as accessibility requirements.

See `docs/voice_narration_strategy.md` for the updated strategy.

---

# Concord Archives

The Archives are an in-universe knowledge base.

Future sections include:

* Academy lectures
* Ship schematics
* Historical records
* Scientific papers
* Mathematical notes
* Resonance theory
* Character journals
* Cultural documents

The archive should feel authentic rather than encyclopedic.

---

# Companion Games

The portal should eventually host:

## Cipher Breyden

Mathematical strategy game.

Future goals:

* Interactive rules
* Tutorials
* Downloads
* Digital implementation

## Collatz-Concourse

Science-fiction racing game.

Future goals:

* Rules
* Lore
* Match replays
* Tournament support

---

# Future Features

Planned expansions:

* Full-text search
* Interactive timeline
* World map
* Music player
* Voice narration
* Reading progress
* Bookmarking
* Developer commentary
* Community gallery
* Fan creations
* Localization
* Accessibility improvements

---

# Repository Organization

Suggested structure:

```
/
├── docs/
├── public/
│   ├── audio/
│   ├── images/
│   ├── video/
│   └── downloads/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   │   ├── episodes/
│   │   ├── archives/
│   │   ├── characters/
│   │   ├── ships/
│   │   └── games/
│   ├── styles/
│   └── utilities/
├── scripts/
└── README.md
```

---

# Development Philosophy

Favor clarity over cleverness.

Build reusable components.

Separate content from presentation.

Keep episodes data-driven.

Document architecture thoroughly.

Design every feature with long-term scalability in mind.

This project is expected to grow from a single illustrated story into a multimedia universe spanning novels, webcomics, music, games, and interactive archives.

The codebase should support that evolution without requiring major rewrites.

---

# Immediate Milestone (v0.1)

Deliver a functional prototype containing:

* Landing page
* Episode reader template
* Placeholder soundtrack player
* Concord Archives landing page
* Games landing page
* Responsive navigation
* Dark mode
* Markdown-driven content
* Example Episode 1 placeholder

No authentication, databases, or backend services are required for the initial prototype.

The focus is establishing a clean, extensible foundation for the AVVF Canon Portal.
