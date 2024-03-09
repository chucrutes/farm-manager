"use client";
import Button from "../../atoms/Button";
import { useState } from "react";
import LabeledInput from "../../molecules/LabeledInput";
import { IOption } from "../../atoms/SelectInput";
import LabeledSelectInput from "../../molecules/LabeledSelectInput";
import { types } from "@/app/entitities/types.enum";
import { mapItemToOption } from "@/app/utlis/formatTypesToSelect";
import { IItem } from "@/app/entitities/item.schema";
import { parseNum } from "@/app/utlis/numberUtils";
import { toast } from "react-toastify";

type AddItemFormProps = {
  saveItem: (product: IItem) => void;
};

const AddItemForm = ({ saveItem }: AddItemFormProps) => {
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const [price, setPrice] = useState<number>(0.0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<IOption>(
    mapItemToOption(types[0], "name", "key")
  );
  const optionItems = types.map((type) => mapItemToOption(type, "name", "key"));

  const handleSetDescription = (value: any) => {
    setDescription(value);
  };

  const handleSelectedOption = (value: any) => {
    const selectedOption = optionItems.find((option) => option.value === value);
    if (!selectedOption) return;
    setSelectedOption(selectedOption);
  };

  const handleSubmit = async () => {
    const productOption = types.find(
      (type) => type.key == selectedOption.value
    );

    if (!productOption) return;

    const product: IItem = {
      description,
      price,
      total: totalValue,
      quantity,
      type: productOption,
    };

    saveItem(product);

    setDescription("");
    setQuantity(0);
    setPrice(0);
    setTotalValue(0);
    setSelectedOption(mapItemToOption(types[0], "name", "key"));
    toast.success("Item salvo com sucesso.");
  };

  const handleQuantityChange = (value: any) => {
    const parsedNumber = parseNum(value);

    if (!parsedNumber) return;

    setQuantity(parsedNumber);

    if (price !== 0 && totalValue !== 0) {
      setTotalValue(price * parsedNumber);
    } else if (totalValue !== 0) {
      setPrice(totalValue / parsedNumber);
    }
  };

  const handlePriceChange = (value: any) => {
    const parsedNumber = parseNum(value);

    if (!parsedNumber) return;

    setPrice(parsedNumber);

    if (quantity !== 0 && totalValue !== 0) {
      setTotalValue(parsedNumber * quantity);
    } else if (totalValue !== 0) {
      setQuantity(totalValue / parsedNumber);
    }
  };

  const handleTotalChange = (value: any) => {
    const parsedNumber = parseNum(value);

    if (!parsedNumber) return;

    setTotalValue(parsedNumber);

    if (quantity !== 0 && price !== 0) {
      setPrice(parsedNumber / quantity);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
      <form className="">
        <div className="flex md:flex-row justify-between md:items-end flex-col">
          <LabeledSelectInput
            mainLabel="Tipo"
            options={optionItems}
            selectedOption={selectedOption}
            onChange={(value) => {
              handleSelectedOption(value);
            }}
          />
          <LabeledInput
            inputValue={description}
            onInputChange={(value) => handleSetDescription(value)}
            labelContent="Descrição"
          />
          <LabeledInput
            requiredInput={false}
            inputValue={quantity.toString()}
            onInputChange={(value: any) => handleQuantityChange(value)}
            labelContent="Quantidade"
          />
        </div>
        <div className="flex md:flex-row md:justify-between md:items-end flex-col">
          <LabeledInput
            requiredInput={false}
            inputValue={price.toString()}
            onInputChange={(value: any) => handlePriceChange(value)}
            labelContent="Preço"
          />
          <LabeledInput
            requiredInput={false}
            inputValue={totalValue.toString()}
            onInputChange={(value: any) => handleTotalChange(value)}
            labelContent="Valor total"
          />
        </div>
        <div className="flex justify-center py-4">
          <Button content="Salvar" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
