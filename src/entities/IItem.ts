import { z } from "zod";
import { typeSchema } from "./types.enum";

export const itemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().positive(),
  total: z.number().positive(),
  type: typeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IItem = z.infer<typeof itemSchema>;
