# Voice And Narration Strategy

This document adapts the voice and narration handoff in
`voice_and_narration_integration_strategy.md.txt` into the current AVVF / TVR
Canon Portal strategy.

The goal is not to solve synthetic voice generation now. The goal is to shape
the project so narration, dialogue, songs, ambience, and future voice systems can
grow without locking character identity to one provider or one generated audio
model.

## North Star

The portal is evolving toward:

```text
illustrated webtoon
+ novel-style narration
+ audio drama
+ concept album / soundtrack
+ synchronized visual timeline
```

Songs remain major story structures. Spoken narration and dialogue should bridge
and frame musical sequences, while the visual reader stays synchronized to the
master audio timeline.

Audio should enrich the story, not become a hard dependency. The reader must
remain understandable as text and images without generated speech.

## Durable Character Voice Identity

Do not define a character voice as a provider voice ID, cloned model, or audio
file. The durable creative asset should be a portable Voice Identity Profile,
also readable as a human Voice Bible.

Conceptual flow:

```text
Character Voice Identity
      +
Scene Performance State
      +
Dialogue / Narration Text
      +
Runtime Provider Adapter
      =
Rendered Audio
```

The character profile should describe qualities such as:

- apparent age
- register
- pitch tendency
- timbre
- vocal weight
- brightness or darkness
- rasp and breathiness
- articulation
- cadence and rhythm
- accent characteristics
- emotional baseline
- authority style
- behavior under stress
- traits to avoid

This keeps the character useful to AI speech engines, human narrators, voice
actors, animation tools, games, and future providers.

## Separate Identity From Performance

Voice identity is persistent. Performance state is scene-specific.

Examples of persistent identity:

- Nashoba has a mature, warm, weathered baritone quality.
- His authority comes from certainty rather than volume.
- Grief creates silence and space in his delivery.

Examples of temporary performance state:

- quiet amusement
- contained anger
- pace slightly slower than baseline
- emphasis on one word
- subtext that the speaker is hiding fear

Episode data should eventually be able to carry dialogue and narration markers
that point to character IDs and timing cues without embedding provider-specific
speech settings.

## Provider-Agnostic Boundary

The project should plan for a renderer abstraction rather than a direct provider
dependency:

```text
VoiceRenderer.render(text, voiceProfile, performanceState)
```

Future adapters may include:

- prerecorded audio
- local or device TTS
- OpenAI TTS
- another hosted TTS provider
- authorized custom voices
- voice transformation from an author performance

Provider-specific voice IDs, model names, and credentials should live in runtime
configuration or adapter mapping files, not in canonical character data.

## Reference Audio And Consent

Existing songs and author recordings can help define character voices, but they
should be treated as casting and art-direction references first.

The preferred workflow is:

```text
authorized reference audio
      ->
semantic voice analysis
      ->
editable Voice Identity Profile
      ->
canonical Voice Bible
```

Do not assume a generated song grants permission to clone or extract the
underlying singer identity. Reference audio should not silently become a reusable
voice clone.

Voice assets should include provenance metadata from the beginning:

```json
{
  "voice_id": "nashoba",
  "source": {
    "type": "semantic_profile",
    "reference_used": true,
    "reference_type": "generated_music_reference"
  },
  "permissions": {
    "author_asserts_rights": true,
    "voice_cloning_allowed": false,
    "reference_retained": false
  }
}
```

Useful reference categories:

- text_only
- author_voice
- consenting_actor
- licensed_voice
- generated_music_reference
- provider_custom_voice

## Narrator-Performed Character Model

A strong production model for the webtoon is one storyteller performing the
narration and character dialogue, with optional transformations applied to
selected character lines.

This should feel like a skilled audiobook narrator performing distinct
characters, not necessarily like a separate synthetic actor for every role. Some
shared vocal DNA between characters can support the feeling that one storyteller
is carrying the tale.

Example direction:

```text
Narrator: natural voice
Nashoba: lower resonance, warmth, age, slight weathering
Arktus: heavier resonance, restrained roughness, greater vocal mass
Director Hu: precise articulation, narrow dynamics, cooler presentation
Akasha: lighter weight, brightness, energetic articulation
```

## Episode Audio Structure

The reader should continue to favor a synchronized audio timeline:

```text
narration
      ->
dialogue
      ->
ambience
      ->
musical motif
      ->
spoken performance
      ->
song
      ->
music fade
      ->
narration resumes
```

The existing `audio time -> scroll anchors` direction remains the right
foundation. Voice work should extend the same timeline rather than creating a
separate parallel playback model.

Potential future timeline fields:

```json
{
  "id": "scene-03-nashoba-warning",
  "start": 42.5,
  "end": 58.0,
  "type": "dialogue",
  "speaker": "nashoba",
  "text": "The fire remembers what the void tries to bury.",
  "performance": {
    "emotion": ["warning", "restraint"],
    "intensity": 0.48,
    "pace": "slow",
    "subtext": "he is afraid but refuses to show it"
  },
  "scrollAnchor": "panel-007"
}
```

## Shared Character Asset Direction

Long term, character assets should be reusable across the portal, RPG concepts,
future audio drama, and future animation/game workflows:

```text
characters/
  nashoba/
    character.json
    voice.json
    visual.json
    music.json
```

For the current Astro project, this can begin modestly as Markdown or JSON
content under `src/content/characters/`, with richer source material preserved in
`assets/`.

The important boundary is:

```text
Character
VoiceIdentity
PerformanceState
AudioTimeline
VoiceProvider
RenderedAudio
```

These should remain separate concepts for portability, caching, licensing,
testing, and future provider changes.

## Accessibility And Controls

Voice features must coexist with text.

Always preserve:

- dialogue text
- captions or subtitles
- speaker identity
- transcript
- optional narration
- no-autoplay behavior

Future audio controls should support separate levels where practical:

- Music
- Narration
- Character Voices
- Ambience
- Sound Effects

The story should never require audio to be understood.

## Prototype Path

Do not begin with voice cloning or a full automatic narration system.

### Webtoon V1

Use one song and one short illustrated sequence. Manually define:

- audio timeline
- scene boundaries
- scroll anchors
- character voice profile
- narration/dialogue markers

Verify:

```text
audio playback -> timeline -> scroll position
```

### Webtoon V2

Add prerecorded human narration for the same sequence.

### Webtoon V3

Apply one character voice preset or transformation to selected dialogue.

### Webtoon V4

Experiment with AI-assisted song analysis to suggest scroll anchors and scene
beats. The author approves and edits suggestions before publication.

### Webtoon V5

Create a full episode audio mix:

- narration
- dialogue
- ambience
- sound effects
- songs

Drive the visual presentation from the mastered timeline.

## Immediate Project Decisions

For this repository:

- Keep `AudioDock` provider-neutral and no-autoplay.
- Treat narration as optional episode media, not a required page dependency.
- Add voice identity and performance metadata before adding provider-specific
  APIs.
- Store source recordings and notes in `assets/`; store web-ready audio in
  `public/audio/` when it is ready for playback.
- Keep episode prose, dialogue, captions, and transcripts available as text.
- Document provider assumptions, consent, and licensing instead of hiding them
  inside character or episode data.
- Prefer pre-rendered deterministic audio for published webtoon episodes.

