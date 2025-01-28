import {
  type AddOrUpdateTypeFormProps,
  type IType,
  addOrUpdateTypeSchema,
} from "./@types/types";
import Alert from "../../../atoms/Span";
import Input from "../../../atoms/Input";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../atoms/Button";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import LabeledInput from "../../../molecules/LabeledInput";
import {
  type Categories,
  categoryOptions,
} from "../../../../entities/categories.enum";
import GenericSelect from "../../../atoms/GenericSelect";
import { handleResponseToast } from "../../../../utils/handleToast";
import { onlyBrNumberFormat } from "../../../../@utils/regex-expressions";
import { stringifier } from "../../../../@utils/stringifier";
import CurrencyInput from "../../../atoms/CurrencyInput";
import { useEffect } from "react";

const AddTypeForm = ({
  saveItem,
  cleanItem,
  item,
}: AddOrUpdateTypeFormProps) => {
  stringifier(item);
  const { watch, setValue, ...methods } = useForm<IType>({
    resolver: zodResolver(addOrUpdateTypeSchema),
    defaultValues: {
      _id: item?._id,
      name: item?.name,
      commission: item?.commission,
      category: item?.category || (categoryOptions[0].value as Categories),
    },
  });

  useEffect(() => {
    if (item) {
      setValue("_id", item._id);
      setValue("name", item.name);
      setValue("commission", item.commission);
      setValue("category", item.category);
    }
  }, [item, setValue]);

  const teste = watch("name");
  console.log("name", teste);

  const submitAddOrUpdateType = async (data: IType) => {
    const res = await saveItem(data);
    handleResponseToast(res);
    methods.reset();
  };

  const resetForm = () => {
    methods.reset();
    cleanItem();
  };

  return (
    <FormProvider {...{ watch, setValue, ...methods }}>
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
        <form onSubmit={methods.handleSubmit(submitAddOrUpdateType)}>
          <div className="flex md:flex-row justify-center md:items-end flex-col">
            <LabeledInput>
              <Input label="Nome" id="name" />
              {methods.formState.errors.name && (
                <Alert icon={<ErrorIcon />} severity="error">
                  É necessário fornecer um nome
                </Alert>
              )}
            </LabeledInput>
            <LabeledInput>
              <CurrencyInput id="commission" label={"Valor da comissão"} />

              {methods.formState.errors.commission && (
                <Alert icon={<ErrorIcon />} severity="error">
                  {methods.formState.errors.commission.message} É necessário
                  fornecer um valor válido para comissão
                </Alert>
              )}
            </LabeledInput>
            <GenericSelect options={categoryOptions} name="category" />
          </div>
          <div className="flex justify-center py-4">
            {item?._id ? (
              <>
                <div className="px-4">
                  <Button type="submit">
                    {item?._id ? "Editar" : "Adicionar"}
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
              <Button type="submit">
                {item?._id ? "Salvar" : "Adicionar"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddTypeForm;
