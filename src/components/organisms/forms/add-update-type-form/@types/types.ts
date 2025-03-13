import type { z } from "zod";
import { EntryTypeSchema } from "../../../../../entities/entry-type";

export const AddOrUpdateTypeSchema = EntryTypeSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type IType = z.infer<typeof AddOrUpdateTypeSchema>;

export type AddOrUpdateTypeFormProps = {
  cleanItem: () => void;
  item?: IType | null;
  editItem: (item: IType) => void;
  saveItem: (item: IType) => Promise<void>;
};
