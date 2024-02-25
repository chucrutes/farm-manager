"use client";
import Button from "../atoms/Button";
import { useState } from "react";
import LabeledInput from "../molecules/LabeledInput";
import TwoOptionsInput from "../molecules/TwoOptionsInput";
import SelectInput, { IOption } from "../atoms/SelectInput";
import LabeledSelectInput from "../molecules/LabeledSelectInput";

const AddItemForm = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("remedio");
  console.log(selectedOption);

  const [optionOneChecked, setOptionOneChecked] = useState(true);
  const [optionTwoChecked, setOptionTwoChecked] = useState(false);

  const optionOneChange = () => {
    setOptionOneChecked(!optionOneChecked);
  };
  const optionTwoChange = () => {
    setOptionTwoChecked(!optionTwoChecked);
  };

  const optionOneContent = "Entrada";
  const optionTwoContent = "Saída";
  const optionItems: IOption[] = [
    { label: "Remédio", value: "remedio" },
    { label: "Compra de gado", value: "compra_gado" },
    { label: "Venda de gado", value: "venda_gado" },
  ];

  async function handleSubmit() {}

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
      <form className="" action="">
        <div className="flex flex-row items-end">
          <LabeledSelectInput
            mainLabel="Tipo"
            options={optionItems}
            selectedOption={selectedOption}
            onChange={(value) => {
              setSelectedOption(value);
            }}
          />
          <LabeledInput
            inputValue={description}
            onInputChange={setDescription}
            labelContent="Descrição"
          />
        </div>
        <div className="flex flex-row items-end">
          <LabeledInput
            inputValue={quantity}
            onInputChange={setQuantity}
            inputType="text"
            labelContent="Quantidade"
          />
          <LabeledInput
            inputValue={price}
            onInputChange={setPrice}
            inputType="text"
            labelContent="Preço"
          />
          <LabeledInput
            inputValue={totalValue}
            onInputChange={setTotalValue}
            inputType="text"
            labelContent="Valor total"
          />
          <TwoOptionsInput
            optionOneContent={optionOneContent}
            optionTwoContent={optionTwoContent}
            onOptionOneChange={optionOneChange}
            onOptionTwoChange={optionTwoChange}
            optionOneChecked={optionOneChecked}
            optionTwoChecked={optionTwoChecked}
          />
        </div>
        <div className="flex justify-center py-4">
          <Button content="Enviar" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
