import { ZodError, ZodIssue, ZodSchema } from "zod";

type Response<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      data: ZodError<T>;
    };

const hasFieldError = (issue: ZodIssue, field: string): boolean => {
  return issue.path.includes(field);
};

export const useValidateData = () => {
  const validateData = <T>(schema: ZodSchema<T>, data: T): Response<T> => {
    const result = schema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        data: result.error,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  };

  const verifyError = <T>(zodError: ZodError<T>, field: string) => {
    const result = zodError.errors.some((issue) => hasFieldError(issue, field));
    return result;
  };

  return {
    validateData,
    verifyError,
  };
};
