import { z } from "zod";
import { EntryTypeSchema } from "./entry-type";

export const EntrySchema = z.object({
  _id: z.string().nullish(),
  description: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().positive(),
  total: z.number().positive(),
  type: EntryTypeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IEntry = z.infer<typeof EntrySchema>;
