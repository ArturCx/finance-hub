import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/dataTable";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/addTransactionButton";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  getMonthDateRange,
  getResolvedMonthYear,
  isValidMonth,
  isValidYear,
} from "../_utils/monthYearFilter";
import DeleteTransactionsByMonthButton from "./_components/deleteTransactionsByMonthButton";

interface TransactionsPageProps {
  searchParams: {
    month?: string;
    year?: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month, year },
}: TransactionsPageProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const monthIsInvalid = !month || !isValidMonth(month);
  const yearIsInvalid = !year || !isValidYear(year);
  const resolved = getResolvedMonthYear(month, year);

  if (monthIsInvalid || yearIsInvalid) {
    redirect(`/transactions?month=${resolved.month}&year=${resolved.year}`);
  }

  const { startDate, endDate } = getMonthDateRange(
    resolved.month,
    resolved.year,
  );

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-4 md:p-6 flex h-full flex-col max-h-screen overflow-hidden">
        {/* Título e botão */}
        <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Transações</h1>
          <div className="flex items-center gap-2">
            <AddTransactionButton />
            <DeleteTransactionsByMonthButton
              month={resolved.month}
              year={resolved.year}
              totalCount={transactions.length}
            />
          </div>
        </div>
        <ScrollArea className="h-full">
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
