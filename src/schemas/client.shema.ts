import { z } from "zod";

export const clientSchema = z.object({
    name: z.string().min(5).max(50),
    email: z.string().email(),
    message: z.string().min(5).max(500)
})
