import { useState } from "react";
import { ZodError } from "zod";
import { Alert } from "@mui/material";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import { verifyError } from "../../../../core/validator";
import LabeledInput from "../../../molecules/LabeledInput";
import { AddOrUpdateEntryFormProps, IAddOrUpdateEntry } from "./@types/types";
import Input from "../../../atoms/Input";
import Button from "../../../atoms/Button";
import { CurrencyInput } from "../../../atoms/CurrencyInput";
import { IEntryType } from "../../../../entities/entry-type";
import { stringifier } from "../../../../@utils/stringifier";

const AddEntryForm = ({
  saveItem,
  editItem,
  cleanItem,
  item,
  types,
}: AddOrUpdateEntryFormProps) => {
  const id = item?._id;
  const [description, setDescription] = useState<string>();
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [type, setType] = useState<IEntryType>(types[0]);
  const [error, setError] = useState<ZodError<IAddOrUpdateEntry> | null>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  const handlePriceBlur = () => {
    if (!quantity) return;

    const value = (price * quantity).toFixed(2);
    setTotal(Number.parseFloat(value));
  };

  const handleTotalBlur = () => {
    if (!quantity) return;

    const value = (total / quantity).toFixed(2);
    setPrice(Number.parseFloat(value));
  };

  const handleQuantityBlur = () => {
    if (!price) return;

    const value = (price * quantity).toFixed(2);
    setQuantity(Number.parseFloat(value));
  };

  const handleFeeBlur = () => {
    if (!fee || !price || !quantity) return;

    const value = (price * quantity).toFixed(2);
    setTotal(Number.parseFloat(value));
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl">Entradas e Saídas</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row justify-center md:items-end flex-col">
          <LabeledInput>
            <Input
              label="Descrição"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {error && verifyError(error, "description") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Descrição inválida
              </Alert>
            )}
          </LabeledInput>
          <LabeledInput>
            <CurrencyInput
              id="quantity"
              value={quantity}
              onChange={setQuantity}
            />
            {error && verifyError(error, "quantity") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Quantidade inválida
              </Alert>
            )}
          </LabeledInput>
          <LabeledInput>
            <CurrencyInput id="price" value={price} onChange={setPrice} />
            {error && verifyError(error, "price") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Preço Inválido
              </Alert>
            )}
          </LabeledInput>
          <LabeledInput>
            <CurrencyInput id="total" value={total} onChange={setTotal} />
            {error && verifyError(error, "total") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Quantidade inválida
              </Alert>
            )}
          </LabeledInput>
        </div>

        <div className="flex justify-center py-4">
          {id ? (
            <>
              <div className="px-4">
                <Button type="submit">Editar</Button>
              </div>
              <div className="px-4">
                <Button
                  color="primary"
                  onClick={() => cleanItem()}
                  type="button"
                >
                  Limpar
                </Button>
              </div>
            </>
          ) : (
            <Button type="submit">Adicionar</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
