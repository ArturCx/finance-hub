import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summaryCards";
import TimeSelect from "./_components/timeSelect";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/getDashboard";
import TransactionsPieChart from "./_components/transactionsPieChart";
import ExpensesPerCategory from "./_components/expensesPerCategory";
import LastTransactions from "./_components/lastTransactions";
import AiReportButton from "./_components/aiReportButton";
import TransactionsLineChart from "./_components/transactionsLineChart";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${String(new Date().getMonth() + 1).padStart(2, "0")}`);
  }
  const dashboard = await getDashboard(month);
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-2 md:gap-3">
            <AiReportButton month={month} />
            <TimeSelect />
          </div>
        </div>
        <div className="grid h-full grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4 md:gap-6 overflow-hidden">
          <div className="flex flex-col gap-4 md:gap-6 overflow-hidden">
            <SummaryCards month={month} {...dashboard} />
            <div className="flex flex-col lg:flex-row w-full h-full gap-4 md:gap-6 overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <TransactionsLineChart
                depositsTotal={10000}
                expensesTotal={5000}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-6 overflow-hidden">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
