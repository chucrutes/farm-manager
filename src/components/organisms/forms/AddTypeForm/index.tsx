import {
  type AddTypeFormProps,
  type IAddType,
  addTypeSchema,
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

const AddTypeForm = ({
  saveItem,
  editItem,
  cleanItem,
  item,
}: AddTypeFormProps) => {
  const { watch, setValue, ...methods } = useForm<IAddType>({
    resolver: zodResolver(addTypeSchema),
    defaultValues: {
      category: item?.category || (categoryOptions[0].value as Categories),
    },
  });

  const commission = watch("commission");
  console.log("commission", commission);
  console.log("commission", typeof commission);

  const handleFeeBlur = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) => {
    console.log(value);
    if (value === "") return undefined;

    const regex = new RegExp(/^\d*,?\d*$/);

    const isValid = regex.test(value);
    console.log(isValid);

    if (!isValid) return;

    setValue("commission", Number(value));
  };

  const submitAddType = async (data: IAddType) => {
    if (item?.id) {
      editItem(data);
      methods.reset();
      return;
    }

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
        <form onSubmit={methods.handleSubmit(submitAddType)}>
          <div className="flex md:flex-row justify-center md:items-end flex-col">
            <LabeledInput>
              <Input label="Nome" {...methods.register("name")} />
              {methods.formState.errors.name && (
                <Alert icon={<ErrorIcon />} severity="error">
                  É necessário fornecer um nome
                </Alert>
              )}
            </LabeledInput>
            <LabeledInput>
              <Input
                label="Valor da comissão"
                type="string"
                {...methods.register("commission", {
                  setValueAs: (value: string) => {
                    if (value === "") return undefined;
                    const brToEn = value.replace(",", ".");
                    const valueToNum = Number.parseFloat(brToEn);
                    if (Number.isNaN(valueToNum)) return undefined;
                    return valueToNum;
                  },
                  pattern: {
                    value: /^\d*,?\d*$/,
                    message: "Not valid input",
                  },
                })}
              />
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

export default AddTypeForm;
