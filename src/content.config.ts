import { defineCollection, z } from "astro:content";

const episodes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    act: z.number(),
    episode: z.number(),
    summary: z.string(),
    status: z.enum(["draft", "published"]).default("draft"),
    heroImage: z.string(),
    soundtrack: z
      .object({
        title: z.string(),
        src: z.string().optional(),
        note: z.string().optional(),
      })
      .optional(),
    panels: z.array(
      z.object({
        image: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
        proseTitle: z.string().optional(),
        prose: z.string().optional(),
        dialogue: z
          .array(
            z.object({
              speaker: z.string().optional(),
              text: z.string(),
              x: z.number().min(0).max(100),
              y: z.number().min(0).max(100),
              width: z.number().min(12).max(80).default(28),
              variant: z.enum(["speech", "thought", "narration"]).default("speech"),
              tail: z.enum(["left", "right", "none"]).default("none"),
            }),
          )
          .default([]),
      }),
    ),
    related: z.array(z.string()).default([]),
  }),
});

const archives = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

const characters = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    summary: z.string(),
  }),
});

const ships = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    class: z.string().optional(),
    summary: z.string(),
  }),
});

const games = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
});

export const collections = { episodes, archives, characters, ships, games };
