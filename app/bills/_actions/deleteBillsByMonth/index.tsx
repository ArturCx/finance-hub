"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/app/_lib/prisma";
import {
  getMonthDateRange,
  isValidMonth,
  isValidYear,
} from "@/app/_utils/monthYearFilter";

interface DeleteBillsByMonthParams {
  month: string;
  year: string;
}

export const deleteBillsByMonth = async ({
  month,
  year,
}: DeleteBillsByMonthParams) => {
  if (!isValidMonth(month) || !isValidYear(year)) {
    throw new Error("Período inválido.");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { startDate, endDate } = getMonthDateRange(month, year);

  const result = await db.bills.deleteMany({
    where: {
      userId,
      expireDate: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  revalidatePath("/bills");
  revalidatePath("/");

  return { deletedCount: result.count };
};
