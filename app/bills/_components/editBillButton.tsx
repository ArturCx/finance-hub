"use client";

import { Button } from "@/app/_components/ui/button";
import UpsertBillDialog from "@/app/_components/upsertBillDialog";
import { Bills } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EditBillButtonProps {
  bill: Bills;
}

const EditBillButton = ({ bill }: EditBillButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertBillDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...bill,
          amount: Number(bill.amount),
        }}
        billId={bill.id}
      />
    </>
  );
};

export default EditBillButton;
