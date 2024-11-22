"use client";

import { Bills } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import BillStatusBadge from "../_components/typeBadge";
import {
  BILL_CATEGORY_LABELS,
  BILL_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/bills";
import EditBillButton from "../_components/editBillButton";
import DeleteBillButton from "../_components/deleteBillButton";

export const billColumns: ColumnDef<Bills>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: bill } }) => <BillStatusBadge bill={bill} />,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: bill } }) => BILL_CATEGORY_LABELS[bill.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: bill } }) =>
      BILL_PAYMENT_METHOD_LABELS[bill.paymentMethod],
  },
  {
    accessorKey: "expireDate",
    header: "Vencimento",
    cell: ({ row: { original: bill } }) =>
      new Date(bill.expireDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: bill } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(bill.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: bill } }) => {
      return (
        <div className="space-x-1">
          <EditBillButton bill={bill} />
          <DeleteBillButton billId={bill.id} />
        </div>
      );
    },
  },
];
