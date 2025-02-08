import { z } from "zod";

export const signInSchema = z.object({
  user: z
    .string({
      required_error: "O usuário é obrigatório",
      invalid_type_error: "O usuário deve ser um texto",
    })
    .min(5, "O usuário deve ter pelo menos 5 caracteres")
    .max(50, "O usuário deve ter no máximo 50 caracteres"),

  password: z
    .string({
      required_error: "A senha é obrigatória",
      invalid_type_error: "A senha deve ser um texto",
    })
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres"),
});

export type IUser = z.infer<typeof signInSchema>;
