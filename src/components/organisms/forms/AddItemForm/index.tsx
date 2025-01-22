import {
  type AddItemFormProps,
  type IAddItem,
  addItemSchema,
  typesForSelect,
} from "./@types/types";
import Alert from "../../../atoms/Span";
import { useEffect, useId } from "react";
import Label from "../../../atoms/Label";
import Input from "../../../atoms/Input";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../atoms/Button";
import Select from "../../../atoms/Select";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import LabeledInput from "../../../molecules/LabeledInput";
import LabeledSelectInput from "../../../molecules/LabeledSelectInput";
import { calculateFee } from "../../../../utils/calculateFee";

const AddItemForm = ({
  saveItem,
  editItem,
  cleanItem,
  item,
}: AddItemFormProps) => {
  const descriptionTagId = useId();
  const priceTagId = useId();
  const quantityTagId = useId();
  const totalTagId = useId();
  const feeTagId = useId();

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, ...restFormState },
    ...methods
  } = useForm<IAddItem>({
    defaultValues: {
      id: item?.id,
      fee: item ? item.fee : 0,
      price: item ? item.price : 0,
      quantity: item ? item.quantity : 0,
      total: item ? item.total : 0,
      description: item?.description,
      type: item?.type,
    },
    resolver: zodResolver(addItemSchema),
  });

  const type = watch("type");
  const fee = watch("fee", item?.fee || null);
  const total = watch("total", item?.total || 0);
  const price = watch("price", item?.price || 0);
  const quantity = watch("quantity", item?.quantity || 0);

  const submitAddItem = (data: IAddItem) => {
    if (item?.id) {
      editItem(data);
      reset();
      return;
    }
    saveItem(data);
    reset();
  };

  useEffect(() => {
    if (type !== "Venda de Gado") {
      setValue("fee", 0);
    }
  }, [type, setValue]);

  const resetForm = () => {
    reset();
    cleanItem();
  };

  const handlePriceBlur = () => {
    if (!quantity) return;

    const value = (price * quantity).toFixed(2);
    setValue("total", Number.parseFloat(value));
  };

  const handleTotalBlur = () => {
    if (!quantity) return;

    const value = (total / quantity).toFixed(2);
    setValue("price", Number.parseFloat(value));
  };

  const handleQuantityBlur = () => {
    if (!price) return;

    const value = (price * quantity).toFixed(2);
    setValue("total", Number.parseFloat(value));
  };

  const handleFeeBlur = () => {
    if (!fee || !price || !quantity) return;

    const value = (price * quantity).toFixed(2);
    setValue("total", Number.parseFloat(value));
  };

  return (
    <FormProvider
      {...{
        handleSubmit,
        setValue,
        register,
        reset,
        watch,
        formState: { errors, ...restFormState },
        ...methods,
      }}
    >
      <div className="flex flex-col justify-center">
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
            {type === "Venda de Gado" && (
              <LabeledInput>
                <Input
                  InputProps={{ inputProps: { step: 0.01 } }}
                  label="Comissão"
                  id={feeTagId}
                  type="number"
                  {...register("fee", {
                    valueAsNumber: true,
                    onBlur: handleFeeBlur,
                  })}
                />
                {errors.quantity && (
                  <Alert icon={<ErrorIcon />} severity="error">
                    Comissão inválida
                  </Alert>
                )}
              </LabeledInput>
            )}
            <LabeledInput>
              <Input
                InputProps={{ inputProps: { step: 0.01 } }}
                label="Quantidade"
                id={quantityTagId}
                type="number"
                {...register("quantity", {
                  valueAsNumber: true,
                  onBlur: handleQuantityBlur,
                })}
              />
              {errors.quantity && (
                <Alert icon={<ErrorIcon />} severity="error">
                  Quantidade inválida
                </Alert>
              )}
            </LabeledInput>
            <LabeledInput>
              {type === "Venda de Gado" &&
                price !== 0 &&
                fee !== 0 &&
                fee !== undefined &&
                fee !== null && (
                  <div className="py-4">
                    <Input
                      disabled={true}
                      label="Preço corrigido"
                      type="number"
                      value={calculateFee(price, fee)}
                    />
                  </div>
                )}

              <Input
                InputProps={{ inputProps: { step: 0.01 } }}
                InputLabelProps={{ shrink: true }}
                label="Preço"
                id={priceTagId}
                type="number"
                {...register("price", {
                  valueAsNumber: true,
                  onBlur: handlePriceBlur,
                })}
              />
              {errors.price && (
                <Alert icon={<ErrorIcon />} severity="error">
                  Preço inválido
                </Alert>
              )}
            </LabeledInput>
            <LabeledInput>
              {type === "Venda de Gado" &&
                price !== 0 &&
                fee !== 0 &&
                fee !== undefined &&
                fee !== null && (
                  <div className="py-4">
                    <Input
                      disabled={true}
                      label="Total corrigido"
                      type="number"
                      value={calculateFee(quantity * price, fee)}
                    />
                  </div>
                )}
              <Input
                InputProps={{ inputProps: { step: 0.01 } }}
                InputLabelProps={{ shrink: true }}
                placeholder="total"
                label="Total"
                id={totalTagId}
                type="number"
                {...register("total", {
                  valueAsNumber: true,
                  onBlur: handleTotalBlur,
                })}
              />
              {errors.total && (
                <Alert icon={<ErrorIcon />} severity="error">
                  Total inválido
                </Alert>
              )}
            </LabeledInput>
          </div>
          <div className="flex justify-center py-4">
            {item?.id ? (
              <>
                <div className="px-4">
                  <Button type="submit">
                    {item?.id ? "Editar" : "Adicionar"}
                  </Button>
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
    </FormProvider>
  );
};

export default AddItemForm;
