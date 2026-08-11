# AI Voice Identity & Performance System — Codex Design Handoff

## Context

This handoff applies to two related projects in *The Veil Remembers* ecosystem:

1. **Echoes of Tir Na Faileasan / AI-GM RPG**

   * AI-driven GM and dynamically generated NPC dialogue.
   * Supports custom/community-authored modules.
   * Intended to remain cross-platform and provider-agnostic.

2. **TVR Custom Reader / Audio-Synchronized Webtoon**

   * Songs function as episodes or major story sequences.
   * Illustrated panels can automatically scroll/synchronize with music.
   * The reader may eventually support narration, dialogue, ambience, sound effects, and transitions between spoken story and songs.

The new architectural concept is a shared **Voice Identity + Performance Direction system** that can serve both projects.

---

# 1. Core Design Principle

Do **not** make a particular audio-generation provider or voice-model identifier the canonical identity of a character.

Instead, define character voices through a portable semantic representation:

> **Character Voice Identity → Scene Performance → Speech Provider → Rendered Audio**

The canonical asset is the **Voice Identity Profile / Voice Bible**, not a model's weights or proprietary voice ID.

This allows the project to change TTS/audio providers later without losing character identity.

---

# 2. Distinguish Voice Identity From Performance

These must be separate data layers.

## Voice Identity

Relatively permanent properties describing how the character generally sounds:

* apparent age
* register
* pitch tendency
* timbre
* vocal weight
* brightness/darkness
* rasp
* breathiness
* articulation
* cadence
* rhythm
* accent characteristics
* baseline emotional quality
* characteristic authority style
* characteristic use of pauses
* behaviors under stress
* undesirable characteristics to avoid

Example:

```json
{
  "voice_id": "nashoba",
  "identity": {
    "age_impression": "older adult",
    "register": "low baritone",
    "pitch": "low",
    "timbre": [
      "warm",
      "dark",
      "weathered"
    ],
    "texture": {
      "rasp": 0.25,
      "breathiness": 0.08,
      "brightness": 0.22
    },
    "cadence": {
      "speed": "slow-medium",
      "pause_frequency": "moderate",
      "rhythmic_character": "oral storyteller"
    },
    "emotional_baseline": [
      "compassionate",
      "restrained",
      "watchful"
    ],
    "authority_style": "quiet certainty",
    "intensity_behavior":
      "increase resonance and firmness before increasing volume",
    "avoid": [
      "announcer cadence",
      "excessive gravel",
      "melodrama",
      "youthful brightness"
    ]
  }
}
```

## Performance State

Temporary information describing how the character delivers a particular line or scene.

Example:

```json
{
  "emotion": [
    "disbelief",
    "contained anger"
  ],
  "intensity": 0.62,
  "pace_modifier": 0.90,
  "volume_modifier": 1.05,
  "delivery":
    "anger appears as precision and tightening restraint rather than shouting"
}
```

Runtime synthesis therefore becomes conceptually:

```text
VOICE IDENTITY
      +
CURRENT CHARACTER STATE
      +
SCENE CONTEXT
      +
DIALOGUE
      ↓
AI PERFORMANCE DIRECTION
      ↓
SPEECH ENGINE
      ↓
AUDIO
```

---

# 3. Reference-Audio Analysis

Authors should optionally be able to provide vocal reference audio.

The system may analyze that recording and generate a **semantic Voice Identity Profile**.

Conceptual pipeline:

```text
REFERENCE AUDIO
      ↓
AI AUDIO ANALYSIS
      ↓
VOCAL CHARACTERISTICS
      ↓
SEMANTIC VOICE PROFILE
      ↓
AUTHOR REVIEW / EDIT
      ↓
CANONICAL VOICE BIBLE
```

The important architectural principle is that the resulting semantic description can exist independently of the reference recording.

The runtime TTS engine does **not** need to receive the original reference audio.

This enables a workflow such as:

```text
song vocal
      ↓
analyze performance
      ↓
"warm mature baritone,
weathered timbre,
deliberate storyteller cadence..."
      ↓
independent synthetic voice
```

This is intentionally different from:

```text
song
↓
voice embedding / model weights
↓
voice clone
```

The system should not assume that ownership or licensing of a generated song automatically grants rights to clone or extract the synthetic singer's underlying vocal identity.

Reference audio therefore functions primarily as **casting/art-direction input**.

---

# 4. Author-Performed Voice Transformation

A second workflow should be supported conceptually:

```text
AUTHOR PERFORMANCE
      +
CHARACTER VOICE PROFILE
      ↓
VOICE TRANSFORMATION
      ↓
CHARACTER PERFORMANCE
```

The author remains the actor.

The transformation modifies vocal appearance while attempting to preserve:

* timing
* pauses
* emotional performance
* emphasis
* hesitation
* laughter
* breathing
* phrasing
* dramatic interpretation

Possible transformation characteristics include:

* apparent register
* resonance
* apparent age
* vocal weight
* brightness
* darkness
* texture
* rasp
* breathiness

This should feel conceptually like:

> A narrator performing impressions of the characters.

It does **not** need to make the narrator acoustically identical to the singers heard in songs.

Some shared vocal identity between characters may actually strengthen the sense that one storyteller is performing the story.

---

# 5. Provider-Agnostic Architecture

Do not tightly couple module or story data to OpenAI, ElevenLabs, or any other particular speech provider.

Define an abstraction such as:

```text
VoiceRenderer
    render(text, voiceProfile, performanceState)
```

Potential adapters might later include:

```text
OpenAITTSAdapter
LocalTTSAdapter
VoiceConversionAdapter
RecordedAudioAdapter
FutureProviderAdapter
```

A provider may internally map the semantic voice profile to its own available voices or parameters.

Provider-specific configuration should live outside canonical character data wherever possible.

---

# 6. AI-GM RPG Integration

## Goal

Allow custom-module authors and procedural generation to give the GM and NPCs persistent vocal identities.

### Module-authored NPC

Example:

```json
{
  "npc_id": "keeper_crossroads",
  "voice": "voices/keeper_crossroads.json"
}
```

Voice file:

```json
{
  "voice_id": "keeper_crossroads",
  "register": "low alto",
  "timbre": [
    "warm",
    "dry",
    "slightly rough"
  ],
  "cadence": "slow and conversational",
  "articulation": "soft but precise",
  "age_impression": "older adult",
  "baseline_emotion": [
    "amused",
    "watchful"
  ],
  "authority_style": "knowledge without urgency",
  "special_traits": [
    "small pauses before answering",
    "rarely raises volume",
    "humor sounds almost accidental"
  ]
}
```

---

# 7. Custom Module Authoring

Module authors should eventually have several ways to create voices.

### Mode A — Text Description

Author manually describes the desired voice.

Example:

> Older fox spirit. Soft contralto. Warm but strange. Speaks slowly. Mischievous rather than threatening. Sounds as though she knows considerably more than she intends to say.

AI converts this into a structured Voice Identity Profile.

### Mode B — Reference-Assisted Casting

Author uploads/records an authorized reference performance.

AI analyzes it.

The author receives an editable semantic voice profile.

The profile becomes the module asset.

### Mode C — Author Performance

Author records dialogue themselves.

Voice processing transforms the author's performance according to the character profile while preserving acting.

### Mode D — Authorized Custom Voice

Where a provider explicitly supports consent-backed custom voices, a module may reference such a voice.

This should remain an optional provider capability rather than the default architecture.

---

# 8. Consent / Provenance Metadata

Voice assets should have provenance metadata from the beginning.

Possible structure:

```json
{
  "voice_id": "keeper_crossroads",

  "source": {
    "type": "semantic_profile",
    "reference_used": true,
    "reference_type": "author_performance"
  },

  "permissions": {
    "author_asserts_rights": true,
    "voice_cloning_allowed": false,
    "reference_retained": false
  }
}
```

Potential reference categories:

```text
text_only
author_voice
consenting_actor
licensed_voice
generated_music_reference
provider_custom_voice
```

Do not silently convert reference recordings into reusable voice clones.

---

# 9. Procedurally Generated NPC Voices

The AI GM should be able to create semantic voices for procedurally generated NPCs.

Example:

```text
NPC:

species:
remnant construct

origin:
collapsed maritime simulation

personality:
anxious
meticulous
kind

AI-generated vocal identity:

light tenor
slightly clipped rhythm
quiet mechanical coloration
careful articulation
speech accelerates when nervous
```

CRITICAL RULE:

> Generate the vocal identity once, then persist it.

When the player encounters the same NPC later, retrieve the saved Voice Identity Profile rather than asking the AI to reinvent it.

This prevents vocal identity drift.

---

# 10. GM Voice

Modules may also define the voice/personality of the AI GM itself.

For *Echoes of Tir Na Faileasan*, this is particularly interesting because the GM can function as the voice through which Tir Na Faileasan expresses itself.

Different modules could portray that voice differently:

* fireside storyteller
* mischievous guide
* ancient witness
* quiet childlike curiosity
* institutional simulator
* strange chorus-like presence

The GM's semantic identity can therefore be module-specific while its underlying reasoning architecture remains unchanged.

---

# 11. Runtime RPG Pipeline

Target conceptual flow:

```text
PLAYER ACTION
      ↓
GAME STATE
      ↓
AI GM
      ↓
NPC RESPONSE
      ↓
CHARACTER ID
      ↓
LOAD VOICE PROFILE
      ↓
DERIVE PERFORMANCE STATE
      ↓
VOICE RENDERER
      ↓
AUDIO PLAYBACK
```

The AI GM should be responsible for semantic acting direction, not low-level audio processing.

For example:

```json
{
  "character": "keeper_crossroads",
  "text": "Oh... I'm sure that's exactly how it happened.",
  "performance": {
    "emotion": "quiet amusement",
    "subtext": "she knows the player is lying",
    "intensity": 0.22,
    "pace": "slow",
    "emphasis": ["exactly"]
  }
}
```

---

# 12. Webtoon / Custom Reader Integration

The same Voice Identity system should be usable by the audio-synchronized webtoon reader.

The reader concept is evolving beyond:

> comic + soundtrack

toward something closer to:

> illustrated audiobook + audio drama + concept album + synchronized webtoon

Songs remain major structural elements.

Spoken narration/dialogue bridges musical sequences.

---

# 13. Webtoon Audio Structure

Possible episode timeline:

```text
NARRATION
    ↓
CHARACTER DIALOGUE
    ↓
AMBIENCE
    ↓
MUSICAL MOTIF ENTERS
    ↓
SPOKEN PERFORMANCE
    ↓
MUSIC BUILDS
    ↓
ORIGINAL SUNO / SONIVA SONG
    ↓
MUSIC FADES
    ↓
NARRATION RESUMES
```

The visual reader remains synchronized to the audio timeline.

---

# 14. Narrator-Performed Character Model

A particularly attractive production model is:

> One storyteller performs the narration and character dialogue.

The narrator records the complete episode.

Character lines may then receive semantic voice transformations.

Example:

```text
NARRATOR
natural voice

NASHOBA
narrator + lower resonance
+ warmth
+ age
+ slight weathering

ARKTUS
narrator + heavier resonance
+ restrained roughness
+ greater vocal mass

DIRECTOR HU
narrator + precise articulation
+ narrow dynamics
+ cooler presentation

AKASHA
narrator + lighter weight
+ brightness
+ energetic articulation
```

This deliberately preserves some common vocal DNA.

The result should resemble a skilled audiobook narrator performing distinct characters rather than pretending each character necessarily has a completely unrelated actor.

---

# 15. Songs as Vocal Casting References

Existing Suno/Soniva songs may help establish character vocal identities.

Conceptual workflow:

```text
CHARACTER SONG
      ↓
AI ANALYSIS
      ↓
VOCAL IDENTITY DESCRIPTION
      ↓
CHARACTER VOICE BIBLE
      ↓
NARRATION / DIALOGUE VOICE PRESET
```

The goal is not necessarily to reproduce the singer exactly.

Instead ask:

> What properties make this performance feel like this character?

Examples:

* register
* apparent age
* warmth
* vocal weight
* rhythmic behavior
* emotional restraint
* aggression
* tenderness
* confidence
* fragility
* articulation
* storytelling quality

These become the portable character definition.

---

# 16. Audio-to-Visual Semantic Timeline

Song/audio analysis may eventually generate an editable timeline for the webtoon.

Example:

```json
{
  "section": "chorus_1",
  "start": 77.2,
  "end": 108.4,

  "audio": {
    "mood": [
      "defiant",
      "hopeful",
      "expansive"
    ],
    "energy": 0.82
  },

  "story": {
    "function": "emotional release"
  },

  "visual": {
    "motion": "accelerating",
    "suggested_shot": "wide reveal",
    "scroll_speed": 1.25
  }
}
```

This connects the voice/audio system to the previously proposed:

```text
audio time → scroll anchors
```

architecture.

---

# 17. Shared Asset Model

Long-term, both projects should potentially consume the same character assets.

Suggested structure:

```text
characters/
    nashoba/
        character.json
        voice.json
        visual.json
        music.json

    akasha/
        character.json
        voice.json
        visual.json
        music.json
```

`voice.json` should be usable by:

* webtoon reader
* AI-GM RPG
* future audiobook/audio drama
* future game dialogue
* animation tools
* module-authoring tools
* human actor casting sheets

This prevents character identity from becoming locked to one medium.

---

# 18. Human-Readable Voice Bible

The structured JSON should always be convertible into a human-readable casting/performance sheet.

Example:

> **Nashoba**
>
> Mature, resonant baritone.
>
> Warm but weathered.
>
> Deliberate cadence with an oral-storyteller quality.
>
> His authority comes from certainty rather than volume.
>
> Emotional intensity increases through resonance and firmness before loudness.
>
> Anger tightens his delivery rather than making him immediately shout.
>
> Grief creates space and silence in his speech.
>
> Avoid announcer cadence, exaggerated gravel, theatrical melodrama, or youthful brightness.

This means the asset remains useful even if AI speech generation is later replaced by human actors.

---

# 19. Important Architectural Boundary

Do not combine:

```text
Character
Voice Provider
Voice Model
Performance
Audio File
```

into one object.

Keep them separable.

Prefer something conceptually like:

```text
Character
    ↓
VoiceIdentity

Scene
    ↓
PerformanceState

RuntimeConfiguration
    ↓
VoiceProvider

VoiceIdentity
+
PerformanceState
+
Text
+
Provider
    ↓
RenderedAudio
```

This separation is important for portability, caching, licensing, testing, and future provider changes.

---

# 20. Caching

AI-GM dialogue may be dynamically generated, but rendered audio should be cacheable.

Possible key:

```text
hash(
    text
    + voice_profile_version
    + performance_state
    + provider
    + provider_model
)
```

If identical dialogue/performance is requested again, reuse the rendered audio where appropriate.

Static webtoon narration should normally be rendered ahead of time rather than synthesized during playback.

---

# 21. Offline / Degraded Operation

The architecture should allow graceful degradation.

Ideal hierarchy:

```text
full generated speech
      ↓ unavailable
cached speech
      ↓ unavailable
device/local TTS
      ↓ unavailable
text dialogue
```

The RPG must remain playable without premium speech generation.

The webtoon must remain readable without generated narration.

Audio enhances the experience rather than becoming a hard dependency on an external API.

---

# 22. Accessibility

Voice features must coexist with text.

Always preserve:

* dialogue text
* captions/subtitles
* speaker identity
* transcript
* optional narration
* independent volume controls where practical

Potential webtoon controls:

```text
Music
Narration
Character Voices
Ambience
Sound Effects
```

The system should not require audio to understand the story.

---

# 23. Immediate Prototype Recommendation — RPG

Do **not** begin by implementing voice cloning.

Prototype the semantic architecture first.

### Phase RPG-V1

Implement:

```text
VoiceProfile schema
PerformanceState schema
VoiceRenderer interface
NPC → VoiceProfile persistence
```

Use a mock renderer initially.

Example:

```text
NPC speaks:
"Oh... I'm sure that's exactly how it happened."

VOICE:
older warm alto
slow cadence
dry humor

PERFORMANCE:
quiet amusement
knows player is lying
```

Verify that the AI-GM consistently generates useful performance metadata.

### RPG-V2

Connect one available TTS provider.

Map semantic profiles to the provider's supported controls.

### RPG-V3

Add module-author voice editor.

### RPG-V4

Add reference-audio → semantic-profile analysis.

### RPG-V5

Evaluate authorized voice transformation/custom-voice providers.

---

# 24. Immediate Prototype Recommendation — Webtoon

Do not start with full automatic narration generation.

Use one existing song sequence.

### WEBTOON-V1

Take:

```text
one song
+
one short illustrated sequence
```

Create manually:

```text
audio timeline
scene boundaries
scroll anchors
character voice profile
narration/dialogue markers
```

Test:

```text
audio playback
→ timeline
→ scroll position
```

### WEBTOON-V2

Add prerecorded human narration.

### WEBTOON-V3

Apply one character transformation/preset to selected dialogue.

### WEBTOON-V4

Experiment with:

```text
song
→ AI semantic analysis
→ suggested scroll/scene anchors
```

Human author approves/edits suggestions before publication.

### WEBTOON-V5

Create full episode audio mix:

```text
narration
+
dialogue
+
ambience
+
SFX
+
songs
```

Then drive visual presentation from the mastered timeline.

---

# 25. Relationship Between the Two Projects

Do not build two unrelated voice systems.

The webtoon and RPG have different runtime requirements, but they should share:

```text
VoiceIdentity schema
PerformanceState schema
Character identifiers
Provenance metadata
Provider abstraction concepts
Human-readable Voice Bible format
```

The webtoon primarily uses **pre-rendered deterministic audio**.

The RPG primarily uses **dynamic runtime speech**.

Therefore:

```text
                 SHARED CHARACTER SYSTEM
                         │
                    VoiceIdentity
                         │
              ┌──────────┴──────────┐
              │                     │
          WEBTOON                  RPG
              │                     │
       pre-render audio       dynamic rendering
              │                     │
     mastered timeline        AI performance state
              │                     │
       scroll anchors          realtime playback
```

---

# 26. Design Philosophy

The central principle is:

> **Preserve the character, not the generator.**

A character should not be defined as:

> `provider_voice_id = xyz123`

The character should be defined through qualities that remain intelligible to:

* an AI speech engine,
* a human voice actor,
* an audiobook narrator,
* an animation studio,
* a game engine,
* or a future technology that does not yet exist.

Existing generated songs can inform those qualities.

Author performances can inform those qualities.

AI can interpret and structure those qualities.

But the **Voice Bible is the durable creative asset**.

For the webtoon, this allows the spoken story and songs to feel like parts of one performance.

For the AI RPG, it allows every authored or procedurally generated character to acquire a persistent audible identity without tying the world to a single proprietary speech model.

---

# Codex Action

Before implementing a particular audio API:

1. Audit the current RPG and custom-reader repositories.
2. Identify where character metadata, story/module metadata, audio playback, and provider/service abstractions currently live.
3. Propose the smallest shared VoiceIdentity/PerformanceState schema that can serve both projects.
4. Do not restructure unrelated systems.
5. Keep the first implementation provider-agnostic.
6. Prototype semantic voice profiles before voice cloning or voice conversion.
7. For the webtoon, preserve the existing `audio time → scroll anchors` direction.
8. For the RPG, ensure generated NPC VoiceIdentity profiles are persisted and retrieved rather than regenerated every encounter.
9. Treat reference-audio analysis and voice transformation as later adapters/features, not requirements of the core engine.
10. Document all assumptions concerning voice provenance, consent, licensing, and provider capabilities rather than hard-coding them into the character model.

The immediate objective is **not to solve synthetic voice generation**.

The immediate objective is to build the abstraction that allows increasingly capable voice-generation systems to be plugged in later without redesigning either application.
