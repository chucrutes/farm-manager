"use client";
import Button from "../atoms/Button";
import { useState } from "react";
import LabeledInput from "../molecules/LabeledInput";
import TwoOptionsInput from "../molecules/TwoOptionsInput";
import { IOption } from "../atoms/SelectInput";
import LabeledSelectInput from "../molecules/LabeledSelectInput";
import Input from "../atoms/Input";

type OptionType = {
  label: string;
  value: string;
  type: string;
};

const AddItemForm = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [hiddenQuantity, setHiddenQuantity] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0.0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<OptionType>({
    label: "Venda de gado",
    value: "venda_gado",
    type: "profit",
  });
  console.log(selectedOption);
  console.log(hiddenQuantity);

  const [optionOneChecked, setOptionOneChecked] = useState(true);
  const [optionTwoChecked, setOptionTwoChecked] = useState(false);

  const handleSelectedOption = (value: any) => {
    const selectedOption = optionItems.find((option) => option.value === value);
    if (!selectedOption) return;
    setSelectedOption(selectedOption);

    if (selectedOption.value == "staff") {
      setQuantity(1);
      setHiddenQuantity(true);
    } else {
      setHiddenQuantity(false);
    }
  };

  const optionItems: IOption[] = [
    { label: "Venda de gado", value: "cattle_sales", type: "profit" },
    { label: "Remédio", value: "medicine", type: "expense" },
    { label: "Compra de gado", value: "cattle_purchase", type: "expense" },
    { label: "Veneno", value: "pesticide", type: "expense" },
    { label: "Ração", value: "feed", type: "expense" },
    { label: "Funcionário", value: "staff", type: "expense" },
    { label: "Investimento", value: "investment", type: "asset" },
  ];

  async function handleSubmit() {}

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
      <form className="" action="">
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
            hidden={hiddenQuantity}
            onInputChange={(event) => setQuantity(Number(event.target.value))}
            inputType="text"
            labelContent="Quantidade"
          />
        </div>
        <div className="flex md:flex-row justify-start md:items-end flex-col">
          <LabeledInput
            inputValue={price.toString()}
            onInputChange={(event) => setPrice(Number(event.target.value))}
            inputType="text"
            labelContent="Preço"
          />
          <LabeledInput
            inputValue={totalValue.toString()}
            onInputChange={(event) => setTotalValue(Number(event.target.value))}
            inputType="text"
            labelContent="Valor total"
          />

          {/* <TwoOptionsInput
            optionOneContent={optionOneContent}
            optionTwoContent={optionTwoContent}
            onOptionOneChange={optionOneChange}
            onOptionTwoChange={optionTwoChange}
            optionOneChecked={optionOneChecked}
            optionTwoChecked={optionTwoChecked}
          /> */}
        </div>
        <div className="flex justify-center py-4">
          <Button content="Enviar" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
