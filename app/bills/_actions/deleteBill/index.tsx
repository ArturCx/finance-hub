"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteBillSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteBill = async ({ billId }: DeleteBillSchema) => {
  await db.bills.delete({
    where: {
      id: billId,
    },
  });
  revalidatePath("/bills");
  revalidatePath("/");
};
