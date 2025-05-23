import { useState, useCallback } from "react";
import {
	type AddOrUpdateEntryFormProps,
	AddOrUpdateEntrySchema,
	type IAddOrUpdateEntry,
} from "../@types/types";
import type { Type } from "../../../../../entities/entry-type";
import { Categories } from "../../../../../entities/categories.enum";
import { ZodError } from "zod";
import { useValidateData } from "../../@hooks/use-validate-form";
import { numAsCurrency } from "../../../../../utils/formatters";

type Params = Omit<AddOrUpdateEntryFormProps, "editItem">;

export const useEntryForm = ({ item, saveItem, cleanItem, types }: Params) => {
	const id = item?._id;
	const [description, setDescription] = useState<string>("");
	const [quantity, setQuantity] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);
	const [selectedType, setSelectedType] = useState<Type>();
	const [category, setCategory] = useState<Categories | null>(null);
	const [afterTax, setAfterTax] = useState<number | null>(null);
	const [commission, setCommission] = useState<number | null | undefined>(null);
	const [error, setError] = useState<
		ZodError<IAddOrUpdateEntry> | Record<string, string> | null
	>(null);

	const { validateData } = useValidateData();

	const hasError = (field: string): boolean => {
		if (!error) return false;

		if (error instanceof ZodError) {
			return error.errors.some((err) => err.path.includes(field));
		}

		return !!error[field];
	};

	const getErrorMessage = (field: string): string => {
		if (!error) return "";

		if (error instanceof ZodError) {
			const fieldError = error.errors.find((err) => err.path.includes(field));
			return fieldError ? fieldError.message : "";
		}

		return error[field] || "";
	};

	const validateRequiredFields = (): boolean => {
		const errors: Record<string, string> = {};

		if (!description) {
			errors.description = "Descrição é obrigatória";
		}
		if (!selectedType) {
			errors.selectedType = "Tipo é obrigatório";
		}
		if (!quantity) {
			errors.quantity = "Quantidade é obrigatória";
		}
		if (!price) {
			errors.price = "Preço é obrigatório";
		}
		if (!total) {
			errors.total = "Total é obrigatório";
		}
		if (selectedType?.commission && commission !== 0 && !commission) {
			errors.commission = "Comissão é obrigatória";
		}

		if (Object.keys(errors).length > 0) {
			setError(errors);
			return false;
		}

		return true;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!validateRequiredFields()) {
			return;
		}

		if (!selectedType) return;

		const item: IAddOrUpdateEntry = {
			_id: id,
			description,
			price,
			quantity,
			total,
			commission,
			type: selectedType,
		};

		const isValid = validateData(AddOrUpdateEntrySchema, item);

		if (!isValid.success) {
			setError(isValid.data);
			return;
		}

		await saveItem(isValid.data);
		resetForm();
	};

	const handlePriceBlur = (value: number) => {
		if (!quantity) return;

		setPrice(value);
		setTotal(numAsCurrency(value * quantity));
	};

	const handleQuantityBlur = (value: number) => {
		if (!price) return;

		setQuantity(value);
		setTotal(price * value);
	};

	const handleTotalBlur = (_: number) => {
		if (!quantity) return;

		setPrice(numAsCurrency(total / quantity));
	};

	const handleCommissionBlur = (value: number) => {
		if (!selectedType) return;

		switch (selectedType.category) {
			case Categories.EXPENSE:
				setAfterTax(total + value);
				break;
			case Categories.INCOME:
				setAfterTax(total - value);
				break;
			default:
				return;
		}
	};

	const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = event.target.value;

		const selectedTypeObj = findType(types, selectedId);
		if (!selectedTypeObj) return;
		setSelectedType(selectedTypeObj);
		setCategory(selectedTypeObj?.category ?? null);
	};

	const resetForm = () => {
		cleanItem();
		setDescription("");
		setQuantity(0);
		setPrice(0);
		setTotal(0);
		setCommission(0);
		setSelectedType(undefined);
		setCategory(null);
		setError(null);
	};

	const setForm = useCallback(
		(item?: IAddOrUpdateEntry | null) => {
			if (!item) return;


			setDescription(item.description);
			setQuantity(item.quantity);
			setPrice(item.price);
			setTotal(item.total);
			setCommission(item.commission);
			setCategory(item.type.category);
			setAfterTax(item.total - (item.commission ?? 0));
			setError(null);

			const typeFound = findType(types, item.type?._id);

			if (!typeFound) return;
			setSelectedType(typeFound);
			setCategory(typeFound?.category ?? null);
		},
		[types],
	);

	return {
		setTotal,
		setPrice,
		setQuantity,
		setAfterTax,
		setCommission,
		setDescription,
		setSelectedType,
		setForm,
		resetForm,
		handleSubmit,
		handlePriceBlur,
		handleTotalBlur,
		handleTypeChange,
		handleQuantityBlur,
		handleCommissionBlur,
		hasError,
		getErrorMessage,
		id,
		total,
		price,
		error,
		quantity,
		category,
		afterTax,
		commission,
		description,
		selectedType,
	};
};

const findType = (types: Type[], id?: string | null): Type | undefined => {
	return types.find((type) => type._id === id);
};
