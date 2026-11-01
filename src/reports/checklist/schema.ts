import { z } from "zod";

/**
 * O que o seaps-api manda (`buildReportPdf`: o `ChecklistDetail` mais
 * `items` com as fotos). Só os campos que o PDF usa; o resto é ignorado.
 */

const person = z.object({
  name: z.string(),
  role: z.string().nullish(),
  phone: z.string().nullish(),
});

const image = z.object({
  id: z.string(),
  /** Caminho no bucket, começando com `/`; `null` se o upload não terminou. */
  image: z.string().nullable(),
  observation: z.string().nullish(),
});

const item = z.object({
  id: z.string(),
  /** 3 Bom, 1 Regular, -2 Ruim, 0 N/A; `null` = não avaliado. */
  score: z.number().nullable(),
  observation: z.string().nullish(),
  item: z.object({ name: z.string() }),
  images: z.array(image).default([]),
});

export const checklistSchema = z.object({
  /** `NNNN/AA`. */
  sid: z.string(),
  /** Média das notas; `null` se o checklist não foi finalizado. */
  score: z.number().nullable(),
  finished_at: z.coerce.date().nullable(),
  organization: z.object({ name: z.string() }).nullish(),
  user: z.object({ name: z.string() }),
  property: z.object({
    name: z.string(),
    address: z.string().nullish(),
    person: person.nullish(),
  }),
  items: z.array(item),
});

export type Checklist = z.output<typeof checklistSchema>;
export type ChecklistItem = Checklist["items"][number];
