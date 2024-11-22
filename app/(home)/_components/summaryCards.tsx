import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summaryCard";
import { Progress } from "@/app/_components/ui/progress";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
}

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
      <div className="grid grid-cols-3 gap-6">
        <div>
          <SummaryCard
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            amount={investmentsTotal}
          />
          <Progress className="mt-2" value={investmentsTotal} />
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
    </div>
  );
};

export default SummaryCards;
