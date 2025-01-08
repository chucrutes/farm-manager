import { z } from "zod";
import { EntryTypeSchema } from "../../../../../entities/entry-type";
import { ResponseCreation } from "../../../../../pages/api/@types";

export const addTypeSchema = EntryTypeSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type IAddType = z.infer<typeof addTypeSchema>;

export type AddTypeFormProps = {
  cleanItem: () => void;
  item?: IAddType | null;
  editItem: (item: IAddType) => Promise<void>;
  saveItem: (item: IAddType) => Promise<ResponseCreation>;
};
