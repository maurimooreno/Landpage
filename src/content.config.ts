import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(3).max(100),
        sector: z.string().min(2).max(80),
        problem: z.string().min(20).max(320),
        contribution: z.string().min(20).max(320),
        solution: z.string().min(20).max(420),
        outcome: z.string().min(20).max(320),
        technologies: z.array(z.string().min(1)).min(1).max(8),
        synthetic: z.literal(true),
        approved: z.boolean(),
        confidential: z.boolean(),
        order: z.number().int().min(1).max(8),
        image: image().optional(),
        imageAlt: z.string().min(5).max(180).optional(),
      })
      .refine((value) => !value.image || value.imageAlt, {
        message: 'Cada imagen requiere texto alternativo.',
      }),
});

export const collections = { projects };
