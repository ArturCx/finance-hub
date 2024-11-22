import { z } from "zod";

export const deleteBillSchema = z.object({
  billId: z.string().uuid(),
});

export type DeleteBillSchema = z.infer<typeof deleteBillSchema>;
