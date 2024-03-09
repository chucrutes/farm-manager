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

type AddItemFormProps = {
  saveItem: (product: IItem) => void;
};

const AddItemForm = ({ saveItem }: AddItemFormProps) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const [price, setPrice] = useState<number>(0.0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<IOption>(
    mapItemToOption(types[0], "name", "key")
  );
  const optionItems = types.map((type) => mapItemToOption(type, "name", "key"));

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
  };

  const handleQuantityChange = (value: any) => {
    const parsedNumber = parseNum(value);

    if (!parsedNumber) return;

    setQuantity(parsedNumber);

    if (price !== null && totalValue !== null) {
      setTotalValue(price * parsedNumber);
    } else if (totalValue !== null) {
      setPrice(totalValue / parsedNumber);
    }
  };

  const handlePriceChange = (value: any) => {
    const parsedNumber = parseNum(value);

    if (!parsedNumber) return;

    setPrice(parsedNumber);

    if (quantity !== null && totalValue !== null) {
      setTotalValue(parsedNumber * quantity);
    } else if (totalValue !== null) {
      setQuantity(totalValue / parsedNumber);
    }
  };

  const handleTotalChange = (value: any) => {
    const parsedNumber = parseNum(value);

    if (!parsedNumber) return;

    setTotalValue(parsedNumber);

    if (quantity !== null && price !== null) {
      setPrice(parsedNumber / quantity);
    } else if (quantity !== null) {
      setPrice(parsedNumber / quantity);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
      <form className="">
        <div className="flex md:flex-row justify-start md:items-end flex-col">
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
            onInputChange={setDescription}
            labelContent="Descrição"
          />
          <LabeledInput
            inputValue={quantity.toString()}
            onInputChange={(value: any) => handleQuantityChange(value)}
            inputType="text"
            labelContent="Quantidade"
          />
        </div>
        <div className="flex md:flex-row justify-start md:items-end flex-col">
          <LabeledInput
            inputValue={price.toString()}
            onInputChange={(value: any) => handlePriceChange(value)}
            inputType="text"
            labelContent="Preço"
          />
          <LabeledInput
            inputValue={totalValue.toString()}
            onInputChange={(value: any) => handleTotalChange(value)}
            inputType="text"
            labelContent="Valor total"
          />
        </div>
        <div className="flex justify-center py-4">
          <Button content="Enviar" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
