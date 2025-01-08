import { z } from "zod";
import { Categories } from "./categories.enum";

export const EntryTypeSchema = z.object({
    id: z.string().nullish(),
    name: z.string(),
    category: z.nativeEnum(Categories),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type IEntryTpe = z.infer<typeof EntryTypeSchema>;
