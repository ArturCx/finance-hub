/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Cryptos } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import CryptoVariationBadge from "../_components/cryptoVariationBadge";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type CryptoWithCharts = Cryptos & {
  charts?: {
    prices: [number, number][];
  };
};

export const cryptoColumns: ColumnDef<CryptoWithCharts>[] = [
  {
    accessorKey: "marketCapRank",
    header: "Rank",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any);
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
      const value = parseFloat(getValue() as any);
      return !isNaN(value) ? `R$ ${value.toFixed(2)}` : "N/A";
    },
  },
  {
    accessorKey: "priceChangePercentage24h",
    header: "24h",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any);
      return <CryptoVariationBadge variation={!isNaN(value) ? value : null} />;
    },
  },
  {
    accessorKey: "totalVolume",
    header: "Volume 24h",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any);
      return !isNaN(value) ? `R$ ${value.toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "marketCap",
    header: "Market Cap",
    cell: ({ getValue }) => {
      const value = parseFloat(getValue() as any);
      return !isNaN(value) ? `R$ ${value.toLocaleString()}` : "N/A";
    },
  },
  {
    accessorKey: "charts",
    header: "Gráfico (7 dias)",
    cell: ({ row }) => {
      const chartData = row.original.charts?.prices;

      return chartData && chartData.length > 0 ? (
        <div className="flex justify-center">
          <Chart
            type="line"
            options={{
              chart: {
                sparkline: {
                  enabled: true,
                },
                animations: {
                  enabled: false,
                },
              },
              tooltip: {
                enabled: false,
              },
              stroke: {
                show: true,
                curve: "smooth",
                lineCap: "butt",
                width: 2,
              },
              xaxis: {
                labels: { show: false },
              },
            }}
            width={100}
            height={50}
            series={[
              {
                data: chartData.map(([_, price]) => price), // Extrai os preços
                name: row.original.name,
                color:
                  parseFloat(row.original.priceChangePercentage24h.toString()) >
                  0
                    ? "#22c55e"
                    : "#dc2626",
              },
            ]}
          />
        </div>
      ) : (
        <span className="text-gray-500">Sem dados</span>
      );
    },
  },
];
