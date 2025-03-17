import { type AddOrUpdateTypeFormProps } from "./@types/types";
import Alert from "../../../atoms/span";
import Button from "../../../atoms/button";
import { ErrorIcon } from "../../../Icons/error-icon";
import LabeledInput from "../../../molecules/labeled-input";
import { categoryOptions } from "../../../../entities/categories.enum";
import Select from "../../../atoms/select";
import CheckBox from "../../../atoms/check-box";
import { useValidateData } from "../@hooks/use-validate-form";
import { useTypeForm } from "./@hooks/use-type-form.hook";
import { useEffect } from "react";
import Input from "../../../atoms/Input";

const AddTypeForm = ({
  saveItem,
  cleanItem,
  item,
}: AddOrUpdateTypeFormProps) => {
  const { verifyError } = useValidateData();
  const {
    setForm,
    resetForm,
    handleSubmit,
    category,
    name,
    setName,
    error,
    handleSelect,
    commission,
    setCommission,
  } = useTypeForm({ item, saveItem, cleanItem });

  useEffect(() => {
    setForm(item);
  }, [item, setForm]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl font-medium">
        {item?._id ? "Editar" : "Adicionar"} Tipo
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row justify-center md:items-end flex-col gap-4">
          <LabeledInput className="py-0 px-0">
            <Input
              label="Nome"
              id="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && verifyError(error, "name") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Nome inválido
              </Alert>
            )}
          </LabeledInput>
          <LabeledInput className="py-0">
            <Select
              options={categoryOptions}
              name="category"
              placeholder="Selecione uma categoria"
              onChange={handleSelect}
              label="Categoria"
              value={category.value}
            />
          </LabeledInput>
          <LabeledInput>
            <CheckBox
              label={"Possui comissão?"}
              value={commission}
              onChange={() => setCommission((prev) => !prev)}
            />
          </LabeledInput>
        </div>

        <div className="flex justify-end py-5">
          <Button onClick={cleanItem} type="button" color="#94a3b8" width="10%">
            Cancelar
          </Button>
          <Button color="#00c950" type="submit" width="10%">
            {item?._id ? "Editar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTypeForm;
