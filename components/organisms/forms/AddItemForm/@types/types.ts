import { z } from "zod";
import { Types } from "@/app/entities/types.enum";
import { itemSchema } from "@/app/entities/IItem";

export const addItemSchema = itemSchema.omit({ createdAt: true, updateAt: true, category: true, type: true }).merge(z.object({
    type: z.nativeEnum(Types)
}));

export type IAddItem = z.infer<typeof addItemSchema>;

export type AddItemFormProps = {
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