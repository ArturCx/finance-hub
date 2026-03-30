"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { BillCategory, BillPaymentMethod, BillStatus } from "@prisma/client";
import { upsertBillSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertBillParams {
  id?: string;
  name: string;
  amount: number;
  status: BillStatus;
  category: BillCategory;
  paymentMethod: BillPaymentMethod;
  expireDate: Date;
}

export const upsertBill = async (params: UpsertBillParams) => {
  upsertBillSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.bills.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/bills");
  revalidatePath("/");
};
