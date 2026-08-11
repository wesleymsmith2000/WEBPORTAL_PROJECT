Goal: Coordinate Webportal_Project as the central hub for The Veil Remembers universe.

Context:
The Webportal should keep its main purpose as a webtoon-like viewer, but it should also become the jump-off point for related projects:
- EchoesOfTirNaFaileasan
- EchoesBelow
- PrimordialCipher
- Any future related projects

Desired architecture:
Create a shared project/content registry inside Webportal_Project so new projects and media links can be added without hardcoding them throughout the app.

Suggested structure:
- src/content/projects.ts or src/data/projects.json
- src/content/mediaLinks.ts or equivalent
- Project gateway/list page
- Project detail page
- Webtoon viewer remains primary experience
- Media section for external content

Each project entry should support:
- id
- title
- subtitle/tagline
- type/category
- status
- short description
- cover/thumbnail image
- internal route or external URL
- repo/local project reference if useful
- related YouTube links
- related Suno links
- other external links
- featured flag/order

Initial project registry should include:
1. Echoes Below
   - Type: game / interactive experience
   - Should link to the EchoesBelowGame project or its eventual playable build.

2. Echoes of Tir Na Faileasan
   - Type: story/world/lore project
   - Should link to its relevant project home or future page.

3. Primordial Cipher
   - Type: cipher/archive/lore/game-adjacent project
   - Should link to its relevant project home or future page.

Webportal UX direction:
The first screen should still prioritize the webtoon viewer or the story-reading experience. Add a clear but elegant navigation route to “Projects” or “Worlds” where users can jump to the other projects. Avoid making the portal feel like only a marketing landing page.

Media direction:
Add a way to list or embed relevant YouTube and Suno content. This can start as structured outbound links, grouped by project. If embeds are practical, support embedded YouTube players and linked Suno tracks. The data model should allow multiple media items per project with:
- title
- platform: youtube | suno | other
- url
- description
- thumbnail
- tags
- featured

Implementation preference:
Keep this lightweight and extensible. Do not merge the separate projects into Webportal_Project. Treat Webportal_Project as the hub/navigation/presentation layer, with each individual project remaining its own repo/app unless there is already a reason to integrate more deeply.

Acceptance criteria:
- Webportal has a structured registry for projects.
- Webportal can render a project gateway/list from that registry.
- Webportal can show at least placeholder entries for EchoesBelow, EchoesOfTirNaFaileasan, and PrimordialCipher.
- Webportal has a structured way to attach YouTube and Suno links to projects.
- The webtoon viewer remains a first-class part of the portal, not displaced by the project hub.