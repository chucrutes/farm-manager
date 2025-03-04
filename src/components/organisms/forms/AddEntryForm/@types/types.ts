import { z } from "zod";
import { EntrySchema } from "../../../../../entities/IEntry";

export const AddEntrySchema = EntrySchema.omit({
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

export type IAddEntry = z.infer<typeof AddEntrySchema>;

export type AddEntryFormProps = {
  cleanItem: () => void;
  item?: IAddEntry | null;
  editItem: (item: IAddEntry) => Promise<void>;
  saveItem: (item: IAddEntry) => Promise<void>;
};
