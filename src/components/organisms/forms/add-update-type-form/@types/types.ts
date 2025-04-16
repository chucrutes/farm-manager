import type { z } from "zod";
import { EntryTypeSchema } from "../../../../../entities/entry-type";

export const AddOrUpdateTypeSchema = EntryTypeSchema.omit({
	createdAt: true,
	updatedAt: true,
});

export type Type = z.infer<typeof AddOrUpdateTypeSchema>;

export type AddOrUpdateTypeFormProps = {
	cleanItem: () => void;
	item?: Type | null;
	editItem: (item: Type) => void;
	saveItem: (item: Type) => Promise<void>;
};
