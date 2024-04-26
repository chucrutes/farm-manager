import { z } from "zod";
import { Types } from "../../../../../entities/types.enum";
import { itemSchema } from "../../../../../entities/IItem";

export const addItemSchema = itemSchema
  .omit({ createdAt: true, updatedAt: true, category: true, type: true })
  .merge(
    z.object({
      id: z.string().nullish(),
      type: z.string(),
      fee: z.number().nullish(),
    })
  );

export type IAddItem = z.infer<typeof addItemSchema>;

export type AddItemFormProps = {
  cleanItem: () => void;
  item?: IAddItem | null;
  editItem: (item: IAddItem) => void;
  saveItem: (item: IAddItem) => void;
};

export const typesForSelect = [
  {
    label: Types.BUY_CATTLE.toString(),
    value: Types.BUY_CATTLE.toString(),
  },
  {
    label: Types.CATTLE_SALE.toString(),
    value: Types.CATTLE_SALE.toString(),
  },
  {
    label: Types.FEED.toString(),
    value: Types.FEED.toString(),
  },
  {
    label: Types.PESTICIDE.toString(),
    value: Types.PESTICIDE.toString(),
  },
  {
    label: Types.STAFF.toString(),
    value: Types.STAFF.toString(),
  },
  {
    label: Types.MEDICINE.toString(),
    value: Types.MEDICINE.toString(),
  },
  {
    label: Types.INVESTMENT.toString(),
    value: Types.INVESTMENT.toString(),
  },
];
