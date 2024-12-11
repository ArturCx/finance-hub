import { BillCategory, BillPaymentMethod, BillStatus } from "@prisma/client";
import { z } from "zod";

export const upsertBillSchema = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  status: z.nativeEnum(BillStatus),
  category: z.nativeEnum(BillCategory),
  paymentMethod: z.nativeEnum(BillPaymentMethod),
  expireDate: z.date(),
});
