import { z } from "zod";

export const createTransactionSchema = z.object({
  body: z.object({
    accountId: z.string().min(1, "El ID de la cuenta es obligatorio."),
    targetAccountId: z.string().optional(),
    type: z.enum(["INCOME", "EXPENSE", "TRANSFER"], {
      message: "Tipo de transacción inválido (INCOME, EXPENSE, TRANSFER).",
    }),
    category: z.string().min(1, "La categoría es obligatoria."),
    amount: z.number().positive("El monto debe ser un número positivo mayor a 0."),
    description: z.string().min(1, "La descripción es obligatoria."),
  }),
});