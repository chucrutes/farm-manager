import {
  type AddTypeFormProps,
  type IAddType,
  addTypeSchema,
} from "./@types/types";
import Alert from "../../../atoms/Span";
import { useId } from "react";
import Input from "../../../atoms/Input";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../atoms/Button";
import { ErrorIcon } from "../../../Icons/ErrorIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import LabeledInput from "../../../molecules/LabeledInput";
import { categoryOptions } from "../../../../entities/categories.enum";
import GenericSelect from "../../../atoms/GenericSelect";

const AddTypeForm = ({
  saveItem,
  editItem,
  cleanItem,
  item,
}: AddTypeFormProps) => {
  const descriptionTagId = useId();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddType>({
    defaultValues: {
    },
    resolver: zodResolver(addTypeSchema),
  });

    const methods = useForm<IAddType>()


  const submitAddType = (data: IAddType) => {
    if (item?.id) {
      editItem(data);
      reset();
      return;
    }
    saveItem(data);
    reset();
  };


  const resetForm = () => {
    reset();
    cleanItem();
  };

  return (
    <FormProvider {...methods}>

      <div className="flex flex-col justify-center">
        <h1 className="mb-4 md:mr-4 text-center">Cadastrar Item</h1>
        <form
          onSubmit={handleSubmit(submitAddType)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
          <div className="flex md:flex-row justify-between md:items-end flex-col">
            <GenericSelect options={categoryOptions} name="teste" />
            <LabeledInput>
              <Input
                label="Nome"
                id={descriptionTagId}
                {...register("name")}
              />
              {errors.description && (
                <Alert icon={<ErrorIcon />} severity="error">
                  É necessário fornecer um nome
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

export default AddTypeForm;
