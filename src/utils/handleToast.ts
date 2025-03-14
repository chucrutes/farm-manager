import { toast } from "react-toastify";
import { ResponseCreation } from "../services/api/@types";
import { findLabelByKey } from "../language/pt-br";

export const handleResponseToast = (response: ResponseCreation): void => {
  const { body } = response;
  const { message, type } = body;

  const _message = findLabelByKey(message);

  switch (type) {
    case "success":
      toast.success(_message);
      break;
    case "error":
      toast.error(_message);
      break;
    case "info":
      toast.info(_message);
      break;
    default:
      toast.info(_message);
      console.warn("Unhandled message type", _message);
      break;
  }
};
