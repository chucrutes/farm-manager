import { Alert } from "@mui/material";
import Label from "../../../atoms/label";
import Input from "../../../atoms/input";
import Button from "../../../atoms/button";
import { ErrorIcon } from "../../../Icons/error-icon";
import Select, { Option } from "../../../atoms/select";
import LabeledInput from "../../../molecules/labeled-input";
import { AddOrUpdateEntryFormProps } from "./@types/types";
import { useEntryForm } from "./@hooks/use-entry-form.hook";
import { CurrencyInput } from "../../../atoms/currency-input";
import { useValidateData } from "../@hooks/use-validate-form";
import { findCategoryByValue } from "../../../../entities/categories.enum";
import { useEffect } from "react";

const AddEntryForm = ({
  saveItem,
  cleanItem,
  item,
  types,
}: AddOrUpdateEntryFormProps) => {
  const { verifyError } = useValidateData();
  const {
    id,
    error,
    total,
    price,
    category,
    quantity,
    description,
    selectedType,
    afterTax,
    commission,
    handleSubmit,
    handleTotalBlur,
    handlePriceBlur,
    handleTypeChange,
    handleQuantityBlur,
    handleCommissionBlur,
    setForm,
    resetForm,
    setPrice,
    setTotal,
    setQuantity,
    setAfterTax,
    setCommission,
    setDescription,
  } = useEntryForm({ item, saveItem, cleanItem, types });

  const typeOptions: Option[] = types.map((type) => ({
    value: type._id,
    label: type.name,
  }));

  useEffect(() => {
    setForm(item);
  }, [item, setForm]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl">Entradas e Saídas</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Input
              label="Categoria"
              id="category"
              disabled={true}
              value={category ? findCategoryByValue(category)?.label : ""}
            />
            {error && verifyError(error, "category") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Categoria inválida
              </Alert>
            )}
          </LabeledInput>
          <Select
            options={typeOptions}
            name="type"
            onChange={handleTypeChange}
            label="Tipo"
            value={selectedType?._id ?? ""}
          />
          <LabeledInput>
            <Label>Quantidade</Label>
            <CurrencyInput
              id="quantity"
              value={quantity}
              onChange={setQuantity}
              onBlur={handleQuantityBlur}
            />
          </LabeledInput>
          <LabeledInput>
            <Label>Preço</Label>
            <CurrencyInput
              id="price"
              value={price}
              onChange={setPrice}
              onBlur={handlePriceBlur}
            />
          </LabeledInput>
          <LabeledInput>
            <Label>Total</Label>
            <CurrencyInput
              id="total"
              value={total}
              onChange={setTotal}
              onBlur={handleTotalBlur}
            />
          </LabeledInput>

          {/* Show commission inputs only if type.commission is true */}
          {selectedType?.commission && (
            <>
              <LabeledInput>
                <Label>Comissão (%)</Label>
                <CurrencyInput
                  id="commission"
                  disabled={!item?.type.commission}
                  value={commission ?? 0}
                  onChange={setCommission}
                  onBlur={handleCommissionBlur}
                />
              </LabeledInput>
              <LabeledInput>
                <Label>Total Após Taxa</Label>
                <CurrencyInput
                  id="totalAfterTax"
                  disabled={true}
                  value={afterTax ?? 0}
                  onChange={setAfterTax}
                />
              </LabeledInput>
            </>
          )}
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
                  onClick={() => resetForm()}
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
