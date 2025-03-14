import { z } from "zod";
import { EntrySchema } from "../../../../../entities/entry";
import { EntryTypeSchema, IType } from "../../../../../entities/entry-type";

export const AddOrUpdateEntrySchema = EntrySchema.omit({
  createdAt: true,
  updatedAt: true,
  type: true,
}).merge(
  z.object({
    type: EntryTypeSchema.omit({ createdAt: true, updatedAt: true }),
  })
);

export type IAddOrUpdateEntry = z.infer<typeof AddOrUpdateEntrySchema>;

export type AddOrUpdateEntryFormProps = {
  cleanItem: () => void;
  types: IType[];
  item?: IAddOrUpdateEntry | null;
  editItem: (item: IAddOrUpdateEntry) => Promise<void>;
  saveItem: (item: IAddOrUpdateEntry) => Promise<void>;
};
