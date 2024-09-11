import { validateCPF } from "@/lib/utils"
import { z } from "zod"

export const clientSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: "Nome é necessário." }),
    age: z.number().int().positive().max(150, { message: "Idade deve ser entre 0 e 150" }),
    cpf: z.string().transform((value) => value.replace(/\D/g, '')),
}).refine((data) =>
    validateCPF(data.cpf)
    , {
        message: "Número do documento inválido.",
        path: ["cpf"]
    })

export type Client = z.infer<typeof clientSchema>