import Label from "../../../atoms/label";
import Button from "../../../atoms/button";
import Select, { Option } from "../../../atoms/select";
import LabeledInput from "../../../molecules/labeled-input";
import { AddOrUpdateEntryFormProps } from "./@types/types";
import { useEntryForm } from "./@hooks/use-entry-form.hook";
import { CurrencyInput } from "../../../atoms/currency-input";
import { findCategoryByValue } from "../../../../entities/categories.enum";
import { useEffect } from "react";
import Input from "../../../atoms/Input";
import { useNavigate } from "react-router-dom";

const AddEntryForm = ({
  saveItem,
  cleanItem,
  item,
  types,
}: AddOrUpdateEntryFormProps) => {
  const {
    id,
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
    setPrice,
    setTotal,
    setQuantity,
    setAfterTax,
    setCommission,
    setDescription,
    hasError,
    getErrorMessage,
  } = useEntryForm({ item, saveItem, cleanItem, types });

  const navigate = useNavigate();

  const typeOptions: Option[] = types.map((type) => ({
    value: type._id,
    label: type.name,
  }));

  useEffect(() => {
    if (item) {
      setForm(item);
    }
  }, [item, setForm]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl font-medium">
        {id ? "Editar" : "Adicionar"} Entrada ou Saída
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LabeledInput>
            <Input
              label="Descrição"
              id="description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={hasError("description")}
              errorMessage={getErrorMessage("description")}
            />
          </LabeledInput>
          <LabeledInput className="py-0">
            <Select
              options={typeOptions}
              name="type"
              placeholder="Selecione um tipo"
              onChange={handleTypeChange}
              label="Tipo"
              value={selectedType?._id ?? ""}
              error={hasError("selectedType")}
              errorMessage={getErrorMessage("selectedType")}
              shortcutLabel="Adicionar Tipo"
              onShortcutClick={() => {
                navigate("/types");
              }}
            />
          </LabeledInput>
          <LabeledInput>
            <Input
              label="Categoria"
              id="category"
              variant="outlined"
              disabled={true}
              value={category ? findCategoryByValue(category)?.label : ""}
              error={hasError("category")}
              errorMessage={getErrorMessage("category")}
            />
          </LabeledInput>
          <LabeledInput>
            <Label error={hasError("quantity")}>Quantidade</Label>
            <CurrencyInput
              id="quantity"
              value={quantity}
              onChange={setQuantity}
              onBlur={handleQuantityBlur}
              error={hasError("quantity")}
              errorMessage={getErrorMessage("quantity")}
            />
          </LabeledInput>
          <LabeledInput>
            <Label error={hasError("price")}>Preço</Label>
            <CurrencyInput
              id="price"
              value={price}
              onChange={setPrice}
              onBlur={handlePriceBlur}
              error={hasError("price")}
              errorMessage={getErrorMessage("price")}
            />
          </LabeledInput>
          <LabeledInput>
            <Label error={hasError("total")}>Total</Label>
            <CurrencyInput
              id="total"
              value={total}
              onChange={setTotal}
              onBlur={handleTotalBlur}
              error={hasError("total")}
              errorMessage={getErrorMessage("total")}
            />
          </LabeledInput>

          {selectedType?.commission && (
            <>
              <LabeledInput>
                <Label>Comissão (%)</Label>
                <CurrencyInput
                  id="commission"
                  disabled={!selectedType.commission}
                  value={commission ?? 0}
                  onChange={(value) => {
                    console.log(value);
                    setCommission(value);
                  }}
                  onBlur={handleCommissionBlur}
                  error={hasError("commission")}
                  errorMessage={getErrorMessage("commission")}
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

        <div className="flex justify-end py-5">
          <Button onClick={cleanItem} type="button" color="#94a3b8" width="10%">
            Cancelar
          </Button>
          <Button color="#00c950" type="submit" width="10%">
            {id ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
