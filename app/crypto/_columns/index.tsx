"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/typeBadge";

export const cryptoColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "coins",
    header: "Moeda",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "24h",
    header: "24h",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "24h_volume",
    header: "Volume 24h",
  },
  {
    accessorKey: "market_cap",
    header: "	Market Cap",
  },
  {
    accessorKey: "last_7_days",
    header: "Últimos 7 dias",
  },
];
