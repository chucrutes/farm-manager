import { z } from "zod";
import { Types } from "../../../../../entities/types.enum";
import { itemSchema } from "../../../../../entities/IItem";
import { Categories } from "../../../../../entities/categories.enum";

export const addTypeSchema = itemSchema
  .omit({ createdAt: true, updatedAt: true, type: true })
  .merge(
    z.object({
      id: z.string().nullish(),
      name: z.string(),
      category: z.nativeEnum(Categories),
    })
  );

export type IAddType = z.infer<typeof addTypeSchema>;

export type AddTypeFormProps = {
  cleanItem: () => void;
  item?: IAddType | null;
  editItem: (item: IAddType) => Promise<void>;
  saveItem: (item: IAddType) => Promise<void>;
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
