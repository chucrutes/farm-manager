import { z } from "zod";

export const Id = z.object({
    _id: z.string().nullish()
})

export type Timestamps = z.infer<typeof Id>;


