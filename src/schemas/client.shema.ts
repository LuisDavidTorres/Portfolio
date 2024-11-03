import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    message: z.string().min(50).max(500)
})
