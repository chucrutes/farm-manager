import { toast } from "react-toastify";
import { ResponseCreation } from "../pages/api/@types";

export const handleResponseToast = (response: ResponseCreation): void => {
  const { body } = response;
  const { message, type } = body;

  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      console.warn("Unhandled message type", message);
      break;
  }
};
