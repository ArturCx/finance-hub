"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/_components/ui/dataTable";
import { cryptoColumns } from "../_columns";

export default function CryptosTable() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    async function fetchCryptos() {
      try {
        const response = await fetch("/api/cryptos");
        const data = await response.json();
        setCryptos(data);
      } catch (error) {
        console.error("Erro ao carregar as criptomoedas:", error);
      }
    }

    fetchCryptos();
  }, []);

  return (
    <div className="rounded-lg shadow border">
      <DataTable columns={cryptoColumns} data={cryptos} />
    </div>
  );
}
