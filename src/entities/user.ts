import { z } from "zod";
import { TimestampsSchema } from "./timestamps";
import { Id } from "./id";

export const SignInSchema = z.object({
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
		.min(5, "A senha deve ter pelo menos 6 caracteres")
		.max(50, "A senha deve ter no máximo 50 caracteres"),
});

export const UserSchema = z
	.object({
		name: z.string().min(1).max(64),
		username: z.string().min(3).max(64).nullish(),
		email: z.string().email(),
		password: z.string().min(3).max(64),
		phone: z.string().max(255).nullish(),
		emailVerified: z.boolean().nullish(),
	})
	.merge(TimestampsSchema)
	.merge(Id);

export const SignUpSchema = z
	.object({
		name: z.string().min(1).max(64),
		username: z.string().min(3).max(64).nullish(),
		phone: z.string().max(255).nullish(),
		email: z.string().email(),
		password: z.string().min(3).max(64),
		confirmPassword: z.string().min(3).max(64),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Senha e confirmação de senha não conferem.",
		path: ["confirmPassword"],
	});

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type User = z.infer<typeof UserSchema>;
