import { z } from "zod"

export const clientSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    age: z.number().int().positive().max(150, { message: "Age must be between 1 and 150." }),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF must be in the format 000.000.000-00" })
})

export type Client = z.infer<typeof clientSchema>