import { z } from "zod";

export const TimestampsSchema = z.object({
createdAt: z.date().nullish(),
    updatedAt: z.date().nullish(),
    deletedAt: z.date().nullish()
})

export type Timestamps = z.infer<typeof TimestampsSchema>;


