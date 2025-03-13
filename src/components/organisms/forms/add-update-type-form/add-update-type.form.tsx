import { type AddOrUpdateTypeFormProps } from "./@types/types";
import Alert from "../../../atoms/span";
import Input from "../../../atoms/input";
import Button from "../../../atoms/button";
import { ErrorIcon } from "../../../Icons/error-icon";
import LabeledInput from "../../../molecules/labeled-input";
import { categoryOptions } from "../../../../entities/categories.enum";
import Select from "../../../atoms/select";
import CheckBox from "../../../atoms/check-box";
import { useValidateData } from "../@hooks/use-validate-form";
import { useTypeForm } from "./@hooks/use-type-form.hook";
import { useEffect } from "react";
import { stringifier } from "../../../../@utils/stringifier";

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
  stringifier(item);
  useEffect(() => {
    setForm(item);
  }, [item, setForm]);

  return (
    <div className="flex flex-col justify-center">
      <h1 className="mb-4 md:mr-4 text-center text-2xl">Tipos</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row justify-center md:items-end flex-col">
          <LabeledInput>
            <Input
              label="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && verifyError(error, "name") && (
              <Alert icon={<ErrorIcon />} severity="error">
                Nome inválido
              </Alert>
            )}
          </LabeledInput>
          <Select
            options={categoryOptions}
            name="category"
            onChange={handleSelect}
            label="Categoria"
            value={category.value}
          />
          <LabeledInput>
            <CheckBox
              label={"Possui comissão?"}
              value={commission}
              onChange={() => setCommission((prev) => !prev)}
            />
          </LabeledInput>
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
            <Button type="submit">{item?._id ? "Salvar" : "Adicionar"}</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTypeForm;
