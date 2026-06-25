/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const revalidate = 0;

const prisma = new PrismaClient();
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
const maxRequestsPerMinute = 30; // Limite de 30 por minuto
const requestInterval = Math.ceil((60 / maxRequestsPerMinute) * 1000); // Tempo entre requisições

const marketChartBaseUrl =
  "https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=brl&days=365&precision=1";
const marketOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": process.env.GECKO_API_KEY ?? "",
  },
};

export async function GET(req: NextRequest) {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=200&precision=2";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.GECKO_API_KEY ?? "",
    },
  };

  try {
    // Consulta a API externa para informações gerais
    const response = await fetch(url, options);
    const data = await response.json();

    // Atualiza as moedas no banco
    for (const crypto of data) {
      // Atualiza os dados gerais das moedas
      await prisma.cryptos.upsert({
        where: { externalId: crypto.id },
        create: {
          externalId: crypto.id,
          name: crypto.name,
          image: crypto.image,
          currentPrice: crypto.current_price,
          marketCapRank: crypto.market_cap_rank,
          marketCap: crypto.market_cap,
          priceChangePercentage24h: crypto.price_change_percentage_24h,
          totalVolume: crypto.total_volume,
        },
        update: {
          name: crypto.name,
          image: crypto.image,
          currentPrice: crypto.current_price,
          marketCapRank: crypto.market_cap_rank,
          marketCap: crypto.market_cap,
          priceChangePercentage24h: crypto.price_change_percentage_24h,
          totalVolume: crypto.total_volume,
        },
      });

      // Requisição para os dados de Market Chart
      const marketChartUrl = marketChartBaseUrl.replace("{id}", crypto.id);
      try {
        const marketChartResponse = await fetch(marketChartUrl, marketOptions);
        const marketChartData = await marketChartResponse.json();

        if (marketChartData.prices) {
          await prisma.cryptoCharts.upsert({
            where: { externalId: crypto.id },
            create: {
              externalId: crypto.id,
              prices: marketChartData.prices,
              marketCaps: marketChartData.market_caps,
              totalVolumes: marketChartData.total_volumes,
            },
            update: {
              prices: marketChartData.prices,
              marketCaps: marketChartData.market_caps,
              totalVolumes: marketChartData.total_volumes,
            },
          });
        }
      } catch (chartError) {
        console.error(
          `Failed to fetch market chart for ${crypto.id}:`,
          chartError
        );
      }

      // Atraso entre as requisições
      await delay(requestInterval);
    }

    return NextResponse.json({
      message: "Database and market charts updated successfully",
    });
  } catch (err) {
    console.error("Error updating database:", err);
    return NextResponse.json(
      { message: "Failed to update database", error: err },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
