"use client";
import {
	AddItemFormProps,
	IAddItem,
	addItemSchema,
	typesForSelect,
} from "./@types/types";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import Alert from "@/components/atoms/Span";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorIcon } from "@/components/Icons/ErrorIcon";
import LabeledInput from "@/components/molecules/LabeledInput";
import LabeledSelectInput from "@/components/molecules/LabeledSelectInput";

const AddItemForm = ({ saveItem }: AddItemFormProps) => {
	const descriptionTagId = useId();
	const priceTagId = useId();
	const quantityTagId = useId();
	const totalTagId = useId();
	const typeTagId = useId();

	const {
		register,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddItem>({
		resolver: zodResolver(addItemSchema),
	});

	const price = watch("price", 0);
	const quantity = watch("quantity", 0);

	const submitAddItem = (data: IAddItem) => {
		console.log(data);

		saveItem(data);
	};

	useEffect(() => {
		setValue("total", price * quantity);
	}, [price, quantity, setValue]);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
			<form onSubmit={handleSubmit(submitAddItem)}>
				<div className="flex md:flex-row justify-between md:items-end flex-col">
					<LabeledSelectInput>
						<Label>Tipo</Label>
						<Select
							setValue={setValue}
							options={typesForSelect}
							{...register("type")}
						/>
					</LabeledSelectInput>
					<LabeledInput>
						<Input
							label="Descricão"
							id={descriptionTagId}
							{...register("description")}
						/>
						{errors.description && (
							<Alert icon={<ErrorIcon />} severity="error">
								É necessário fornecer uma descrição
							</Alert>
						)}
					</LabeledInput>
					<LabeledInput>
						<Input
							label="Quantidade"
							id={quantityTagId}
							type="number"
							{...register("quantity", { valueAsNumber: true })}
						/>
						{errors.quantity && (
							<Alert icon={<ErrorIcon />} severity="error">
								Quantidade inválida {errors.quantity.message}
							</Alert>
						)}
					</LabeledInput>
					<LabeledInput>
						<Input
							label="Preço"
							id={priceTagId}
							type="number"
							{...register("price", { valueAsNumber: true })}
						/>
						{errors.price && (
							<Alert icon={<ErrorIcon />} severity="error">
								Preço inválido
							</Alert>
						)}
					</LabeledInput>
					<LabeledInput>
						<Input
							InputLabelProps={{ shrink: true }}
							placeholder="total"
							label="Total"
							id={totalTagId}
							type="number"
							{...register("total", { valueAsNumber: true })}
						/>
						{errors.total && (
							<Alert icon={<ErrorIcon />} severity="error">
								Total inválido
							</Alert>
						)}
					</LabeledInput>
				</div>
				<div className="flex justify-center py-4">
					<Button type="submit">Adicionar</Button>
				</div>
			</form>
		</div>
	);
};

export default AddItemForm;
