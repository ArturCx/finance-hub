import AddTransactionButton from "@/app/_components/addTransactionButton";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 md:gap-4">
        {icon}
        <p
          className={`${size === "small" ? "text-muted-foreground text-sm md:text-base" : "text-white opacity-70 text-sm md:text-base"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <p
          className={`font-bold ${size === "small" ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"}`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
