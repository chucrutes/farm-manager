import { z } from "zod";
import { EntryTypeSchema } from "./entry-type";

export const EntrySchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().positive(),
  total: z.number().positive(),
  type: EntryTypeSchema.nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IEntry = z.infer<typeof EntrySchema>;
