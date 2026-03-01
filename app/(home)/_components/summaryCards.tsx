import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summaryCard";
import dynamic from "next/dynamic";
interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

const InvestmentGoalProgress = dynamic(
  () => import("./InvestmentGoalProgress"),
  {
    ssr: false,
  }
);

const SummaryCards = async ({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
}: SummaryCards) => {
  return (
    <div className="space-y-6">
      {/* Card 1 */}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* Outros cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="flex-columns-1 items-center">
          <SummaryCard
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            amount={investmentsTotal}
          />
        </div>
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
      <InvestmentGoalProgress investmentsTotal={investmentsTotal} />
    </div>
  );
};

export default SummaryCards;
