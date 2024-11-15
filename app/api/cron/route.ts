/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=200&precision=2";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-SSfXKKnLCejRfTmyway2xR8Q",
    },
  };

  try {
    // Lista todas as moedas no banco de dados
    const localCryptos = await prisma.cryptos.findMany();
    console.log("Local cryptos:", localCryptos);

    // Consulta a API externa
    const response = await fetch(url, options);
    const data = await response.json();

    // Atualiza as moedas no banco
    const updates = data.map(async (crypto: any) => {
      return prisma.cryptos.updateMany({
        where: { externalId: crypto.id }, // Atualiza com base no campo `externalId`
        data: {
          name: crypto.name,
          image: crypto.image,
          currentPrice: crypto.current_price,
          marketCapRank: crypto.market_cap_rank,
          marketCap: crypto.market_cap,
          priceChangePercentage24h: crypto.price_change_percentage_24h,
          totalVolume: crypto.total_volume,
        },
      });
    });

    // Aguarda todos os updates serem concluídos
    await Promise.all(updates);

    return NextResponse.json({
      message: "Database updated successfully",
      updated: updates.length,
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
