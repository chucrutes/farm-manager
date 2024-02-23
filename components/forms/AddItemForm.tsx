"use client";
import { signIn } from "@/api/signIn";
import Button from "../atoms/Button";
import { useState } from "react";
import LabeledInput from "../molecules/LabeledInput";
import TwoOptionsInput from "../molecules/TwoOptionsInput";

const AddItemForm = () => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalValue, setTotalValue] = useState("");

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

  async function handleSubmit() {}

  return (
    <div>
      <div>Cadastrar Item</div>
      <div>
        <form action="" className="flex flex-col items-center">
          <LabeledInput
            inputValue={description}
            onInputChange={setDescription}
            labelContent="Email/Usuário"
          />
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
          <div>
            <Button content="Enviar" onSubmit={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
