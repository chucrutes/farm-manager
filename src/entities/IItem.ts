import { z } from "zod";
import { typeSchema } from "./types.enum";

export const itemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
  type: typeSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IItem = z.infer<typeof itemSchema>;
