import type { ZodError } from "zod";
import { useCallback, useState } from "react";
import type { Option } from "../../../../atoms/select";
import {
	type AddOrUpdateTypeFormProps,
	AddOrUpdateTypeSchema,
	type Type,
} from "../@types/types";
import { useValidateData } from "../../@hooks/use-validate-form";
import {
	type Categories,
	categoryOptions,
	findCategoryByValue,
} from "../../../../../entities/categories.enum";

type Params = Omit<AddOrUpdateTypeFormProps, "editItem">;

export const useTypeForm = ({ item, saveItem, cleanItem }: Params) => {
	const id = item?._id;
	const [name, setName] = useState<Type["name"]>("");
	const [category, setCategory] = useState<Option>(categoryOptions[0]);
	const [commission, setCommission] = useState<Type["commission"]>(false);
	const [error, setError] = useState<ZodError<Type> | null>();

	const { validateData } = useValidateData();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const type: Type = {
			_id: id,
			name,
			category: category.value as Categories,
			commission,
		};

		const isValid = validateData(AddOrUpdateTypeSchema, type);

		if (!isValid.success) {
			setError(isValid.data);
			return;
		}

		await saveItem(isValid.data);
		resetForm();
	}

	const resetForm = () => {
		cleanItem();
		setName("");
		setCategory(categoryOptions[0]);
		setCommission(false);
		setError(null);
	};

	const setForm = useCallback((item?: Type | null) => {
		if (!item) return;

		setName(item.name);
		setCategory(findCategoryByValue(item.category));
		setCommission(item.commission);
	}, []);

	const handleSelect = ({
		target: { value },
	}: React.ChangeEvent<HTMLSelectElement>) => {
		setCategory(findCategoryByValue(value));
	};

	return {
		setName,
		setError,
		setCategory,
		setCommission,
		handleSubmit,
		handleSelect,
		resetForm,
		setForm,
		name,
		category,
		error,
		commission,
	};
};
