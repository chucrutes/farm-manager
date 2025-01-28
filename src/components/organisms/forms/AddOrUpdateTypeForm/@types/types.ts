import type { z } from "zod";
import { EntryTypeSchema } from "../../../../../entities/entry-type";
import type { ResponseCreation } from "../../../../../pages/api/@types";

export const addOrUpdateTypeSchema = EntryTypeSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type IType = z.infer<typeof addOrUpdateTypeSchema>;

export type AddOrUpdateTypeFormProps = {
  cleanItem: () => void;
  item?: IType | null;
  editItem: (item: IType) => Promise<void>;
  saveItem: (item: IType) => Promise<ResponseCreation>;
};
