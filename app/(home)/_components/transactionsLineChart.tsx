"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

interface TransactionsLineChartProps {
  depositsTotal: number;
  expensesTotal: number;
}

const chartConfig = {
  Receita: {
    label: "Receita",
    color: "#55B02E",
  },
  Despesas: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

export default function TransactionsLineChart({
  depositsTotal,
  expensesTotal,
}: TransactionsLineChartProps) {
  const chartData = [
    { month: "January", Receita: depositsTotal, Despesas: expensesTotal },
    {
      month: "February",
      Receita: depositsTotal + 600,
      Despesas: expensesTotal + 200,
    },
    {
      month: "March",
      Receita: depositsTotal - 400,
      Despesas: expensesTotal + 600,
    },
    {
      month: "April",
      Receita: depositsTotal + 1000,
      Despesas: expensesTotal + 100,
    },
    {
      month: "May",
      Receita: depositsTotal - 500,
      Despesas: expensesTotal + 3800,
    },
    {
      month: "June",
      Receita: depositsTotal + 1250,
      Despesas: expensesTotal + 1170,
    },
    {
      month: "July",
      Receita: depositsTotal + 250,
      Despesas: expensesTotal + 170,
    },
    {
      month: "August",
      Receita: depositsTotal + 2500,
      Despesas: expensesTotal + 1700,
    },
    {
      month: "September",
      Receita: depositsTotal - 5500,
      Despesas: expensesTotal + 3700,
    },
    {
      month: "October",
      Receita: depositsTotal + 2500,
      Despesas: expensesTotal + 170,
    },
    {
      month: "November",
      Receita: depositsTotal - 1500,
      Despesas: expensesTotal + 1170,
    },
    {
      month: "December",
      Receita: depositsTotal + 250,
      Despesas: expensesTotal + 170,
    },
  ];

  return (
    <Card className="flex flex-col p-6 w-full h-full">
      <CardContent className="flex-1 pb-0 w-full h-full flex justify-center items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="Receita"
              type="monotone"
              stroke="#55B02E"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Despesas"
              type="monotone"
              stroke="#E93030"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
