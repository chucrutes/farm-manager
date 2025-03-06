import { z } from "zod";
import { Categories } from "./categories.enum";

export const EntryTypeSchema = z.object({
  _id: z.string().nullish(),
  name: z.string().min(1),
  category: z.nativeEnum(Categories),
  commission: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type IEntryType = z.infer<typeof EntryTypeSchema>;
export type IType = Omit<IEntryType, "_id"> & {
  _id:string
};
