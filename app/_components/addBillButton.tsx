"use client";

import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import UpsertBillDialog from "./upsertBillDialog";

const AddBillButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        <span className="hidden sm:inline">Adicionar Conta</span>
        <span className="sm:hidden">Adicionar</span>
        <ArrowDownUpIcon />
      </Button>
      <UpsertBillDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddBillButton;
