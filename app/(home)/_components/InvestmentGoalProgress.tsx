"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Progress } from "@/app/_components/ui/progress";
import { SetInvestmentGoalDialog } from "@/app/_components/setInvestmentGoalDialog";

interface InvestmentGoalProgressProps {
  investmentsTotal: number;
}

export default function InvestmentGoalProgress({
  investmentsTotal,
}: InvestmentGoalProgressProps) {
  const [investmentGoal, setInvestmentGoal] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedGoal = localStorage.getItem("investmentGoal");
    if (savedGoal) {
      setInvestmentGoal(parseFloat(savedGoal));
    }
  }, []);

  const handleSaveGoal = (goal: string) => {
    const parsedGoal = parseFloat(goal);
    if (!isNaN(parsedGoal) && parsedGoal > 0) {
      setInvestmentGoal(parsedGoal);
      localStorage.setItem("investmentGoal", parsedGoal.toString());
    } else {
      alert("Por favor, insira um valor válido para a meta de investimento.");
    }
  };

  const progress = investmentGoal
    ? Math.min((investmentsTotal / investmentGoal) * 100, 100)
    : 0;

  return (
    <div className="space-y-6 p-1">
      {investmentGoal ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Botão para definir a meta */}
          <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">
            Definir Meta
          </Button>

          {/* Barra de Progresso */}
          <div className="flex-1 w-full">
            <p className="text-xs md:text-sm mb-1">
              Progresso de Investimento: R${" "}
              {investmentsTotal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}{" "}
              / R${" "}
              {investmentGoal.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Botão para definir a meta */}
          <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">
            Definir Meta
          </Button>

          <p className="text-gray-500 flex-1 text-xs md:text-sm">
            Defina uma meta de investimento para começar a acompanhar o
            progresso.
          </p>
        </div>
      )}

      <SetInvestmentGoalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveGoal}
      />
    </div>
  );
}
