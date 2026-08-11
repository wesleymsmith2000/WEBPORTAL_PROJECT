export type MediaPlatform = "youtube" | "suno" | "other";

export interface ProjectMediaItem {
  title: string;
  platform: MediaPlatform;
  url: string;
  description?: string;
  thumbnail?: string;
  tags?: string[];
  featured?: boolean;
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: "internal" | "external" | "local";
}

export interface PortalProject {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  status: string;
  description: string;
  coverImage: string;
  internalRoute?: string;
  externalUrl?: string;
  repoReference?: string;
  links: ProjectLink[];
  media: ProjectMediaItem[];
  featured: boolean;
  order: number;
}

export const projects: PortalProject[] = [
  {
    id: "echoes-below",
    title: "Echoes Below",
    subtitle: "An interactive descent through buried signal and consequence.",
    type: "Game / Interactive Experience",
    status: "Separate project in development",
    description:
      "A companion interactive experience that should remain in its own app while this portal points readers toward its playable build, design notes, and related media.",
    coverImage:
      "/images/act-1/artwork/arrival-sequence/act-01-episode-01-panel-008-central-resonance-flare-clean.png",
    repoReference: "EchoesBelowGame",
    links: [
      {
        label: "Local project reference",
        url: "EchoesBelowGame",
        kind: "local",
      },
    ],
    media: [],
    featured: true,
    order: 10,
  },
  {
    id: "echoes-of-tir-na-faileasan",
    title: "Echoes of Tir Na Faileasan",
    subtitle: "A story and lore branch for shadowed memory, place, and myth.",
    type: "Story / World / Lore Project",
    status: "Placeholder gateway",
    description:
      "A related worldbuilding project for future story pages, lore records, and cross-links back into the AVVF archive.",
    coverImage:
      "/images/act-1/artwork/arrival-sequence/act-01-episode-01-panel-004_1-asterion-port-beneath-stars-clean.png",
    repoReference: "EchoesOfTirNaFaileasan",
    links: [
      {
        label: "Local project reference",
        url: "EchoesOfTirNaFaileasan",
        kind: "local",
      },
    ],
    media: [],
    featured: true,
    order: 20,
  },
  {
    id: "primordial-cipher",
    title: "Primordial Cipher",
    subtitle: "A cipher, archive, and game-adjacent branch of the universe.",
    type: "Cipher / Archive / Lore Project",
    status: "Placeholder gateway",
    description:
      "A structured home for puzzle logic, archive fragments, and game-adjacent lore that can grow without being merged into the main webtoon reader.",
    coverImage:
      "/images/act-1/artwork/arrival-sequence/act-01-episode-01-panel-004_3-collatz-concourse-holo-wall-clean.png",
    repoReference: "PrimordialCipher",
    links: [
      {
        label: "Local project reference",
        url: "PrimordialCipher",
        kind: "local",
      },
      {
        label: "Cipher Breyden rules",
        url: "/games/",
        kind: "internal",
      },
    ],
    media: [],
    featured: true,
    order: 30,
  },
];

export const featuredProjects = [...projects]
  .filter((project) => project.featured)
  .sort((a, b) => a.order - b.order);

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}
