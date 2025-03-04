import { z } from "zod";
import { EntrySchema } from "../../../../../entities/entry";
import { IEntryType } from "../../../../../entities/entry-type";

export const AddOrUpdateEntrySchema = EntrySchema.omit({
  createdAt: true,
  updatedAt: true,
  type: true,
}).merge(
  z.object({
    id: z.string().nullish(),
    type: z.string(),
    fee: z.number().nullish(),
  })
);

export type IAddOrUpdateEntry = z.infer<typeof AddOrUpdateEntrySchema>;

export type AddOrUpdateEntryFormProps = {
  cleanItem: () => void;
  types: IEntryType[];
  item?: IAddOrUpdateEntry | null;
  editItem: (item: IAddOrUpdateEntry) => Promise<void>;
  saveItem: (item: IAddOrUpdateEntry) => Promise<void>;
};
