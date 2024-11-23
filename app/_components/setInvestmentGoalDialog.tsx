import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";

interface SetInvestmentGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (goal: string) => void;
}

export const SetInvestmentGoalDialog: React.FC<
  SetInvestmentGoalDialogProps
> = ({ open, onOpenChange, onSave }) => {
  const [investmentGoal, setInvestmentGoal] = useState<string>("");

  const handleSave = () => {
    onSave(investmentGoal);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Defina sua meta de investimento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Digite o valor..."
            value={investmentGoal}
            onChange={(e) => setInvestmentGoal(e.target.value)}
          />
          <Button onClick={handleSave} className="w-full">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
