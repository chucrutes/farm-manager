import { z } from "zod";

export const signInSchema = z.object({
    user: z.string().min(1),
    password: z.string().min(1)
})

export type IUser = z.infer<typeof signInSchema>

