import {
  type AddEntryFormProps,
  type IAddEntry,
  AddEntrySchema,
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

const AddEntryForm = ({
  saveItem,
  editItem,
  cleanItem,
  item,
}: AddEntryFormProps) => {
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
  } = useForm<IAddEntry>({
    defaultValues: {
      id: item?.id,
      fee: item ? item.fee : 0,
      price: item ? item.price : 0,
      quantity: item ? item.quantity : 0,
      total: item ? item.total : 0,
      description: item?.description,
      type: item?.type,
    },
    resolver: zodResolver(AddEntrySchema),
  });

  const type = watch("type");
  const fee = watch("fee", item?.fee || null);
  const total = watch("total", item?.total || 0);
  const price = watch("price", item?.price || 0);
  const quantity = watch("quantity", item?.quantity || 0);

  const submitAddEntry = (data: IAddEntry) => {
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

  return <h1>dsdsa</h1>;
};

export default AddEntryForm;
