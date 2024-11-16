/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Cryptos } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CryptoVariationBadge from "../_components/cryptoVariationBadge";

export const cryptoColumns: ColumnDef<Cryptos>[] = [
  {
    accessorKey: "marketCapRank",
    header: "Rank",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any); // Converte Decimal para número
      return !isNaN(value) ? value : "N/A";
    },
  },
  {
    accessorKey: "name",
    header: "Moeda",
    cell: ({ row }) => (
      <div className="flex items-center">
        <img
          src={row.original.image}
          alt={row.original.name}
          className="h-6 w-6 rounded-full mr-2"
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "currentPrice",
    header: "Preço",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any); // Converte Decimal para número
      return !isNaN(value) ? `R$ ${value.toFixed(2)}` : "N/A";
    },
  },
  {
    accessorKey: "priceChangePercentage24h",
    header: "24h",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any); // Converte Decimal para número
      return <CryptoVariationBadge variation={!isNaN(value) ? value : null} />;
    },
  },
  {
    accessorKey: "totalVolume",
    header: "Volume 24h",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any); // Converte Decimal para número
      return !isNaN(value) ? `R$ ${value.toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "marketCap",
    header: "Market Cap",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any); // Converte Decimal para número
      return !isNaN(value) ? `R$ ${value.toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "chart",
    header: "Gráfico (7dias)",
  },
];
