"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import {
  getMonthDateRange,
  isValidMonth,
  isValidYear,
} from "@/app/_utils/monthYearFilter";

interface DeleteTransactionsByMonthParams {
  month: string;
  year: string;
}

export const deleteTransactionsByMonth = async ({
  month,
  year,
}: DeleteTransactionsByMonthParams) => {
  if (!isValidMonth(month) || !isValidYear(year)) {
    throw new Error("Período inválido.");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { startDate, endDate } = getMonthDateRange(month, year);

  const result = await db.transaction.deleteMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  revalidatePath("/transactions");
  revalidatePath("/");

  return { deletedCount: result.count };
};
