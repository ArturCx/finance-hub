"use client";

import { useTransition } from "react";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/_components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { deleteBillsByMonth } from "../_actions/deleteBillsByMonth";

interface DeleteBillsByMonthButtonProps {
  month: string;
  year: string;
  totalCount: number;
}

const DeleteBillsByMonthButton = ({
  month,
  year,
  totalCount,
}: DeleteBillsByMonthButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirmDeleteClick = () => {
    startTransition(async () => {
      try {
        const result = await deleteBillsByMonth({ month, year });
        toast.success(
          result.deletedCount > 0
            ? `${result.deletedCount} conta(s) excluída(s) com sucesso.`
            : "Nenhuma conta encontrada para excluir neste período."
        );
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao excluir as contas do período.");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="rounded-full font-bold"
          disabled={isPending || totalCount === 0}
        >
          <span className="sm:hidden">Deletar</span>
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja excluir em massa as contas de {month}/{year}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação apagará {totalCount} registro(s) da tabela e não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            {isPending ? "Excluindo..." : "Confirmar exclusão"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBillsByMonthButton;
