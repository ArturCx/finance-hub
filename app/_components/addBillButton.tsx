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
        Adicionar Conta
        <ArrowDownUpIcon />
      </Button>
      <UpsertBillDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default AddBillButton;
