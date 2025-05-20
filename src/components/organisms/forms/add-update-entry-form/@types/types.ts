import { z } from "zod";
import { EntrySchema } from "../../../../../entities/entry";
import { EntryTypeSchema, Type } from "../../../../../entities/entry-type";

export const AddOrUpdateEntrySchema = EntrySchema.omit({
	type: true,
	afterTax: true,
}).merge(
	z.object({
		type: EntryTypeSchema.omit({ createdAt: true, updatedAt: true }),
	}),
);

export type IAddOrUpdateEntry = z.infer<typeof AddOrUpdateEntrySchema>;

export type AddOrUpdateEntryFormProps = {
	cleanItem: () => void;
	types: Type[];
	item?: IAddOrUpdateEntry | null;
	editItem: (item: IAddOrUpdateEntry) => Promise<void>;
	saveItem: (item: IAddOrUpdateEntry) => Promise<void>;
};
