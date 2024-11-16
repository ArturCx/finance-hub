import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";

const prisma = new PrismaClient();

(async () => {
  const apiUrl = "https://api.coingecko.com/api/v3/coins/{id}/market_chart";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-SSfXKKnLCejRfTmyway2xR8Q",
    },
  };

  try {
    // Recupera as moedas registradas no banco
    const cryptos = await prisma.cryptos.findMany({
      select: { externalId: true }, // Apenas o campo `externalId` é necessário
    });

    if (!cryptos.length) {
      console.log("Nenhuma moeda encontrada no banco.");
      return;
    }

    for (const crypto of cryptos) {
      const url = `${apiUrl.replace("{id}", crypto.externalId)}?vs_currency=brl&days=365&precision=1`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        // Valida se há dados na resposta
        if (data && data.prices) {
          await prisma.cryptoCharts.create({
            data: {
              externalId: crypto.externalId,
              prices: data.prices,
              marketCaps: data.market_caps,
              totalVolumes: data.total_volumes,
            },
          });

          console.log(`Gráfico para ${crypto.externalId} importado com sucesso.`);
        } else {
          console.log(`Nenhum dado encontrado para ${crypto.externalId}`);
        }
      } catch (err) {
        console.error(`Erro ao buscar gráfico para ${crypto.externalId}:`, err);
      }
    }
  } catch (err) {
    console.error("Erro ao buscar moedas no banco:", err);
  } finally {
    await prisma.$disconnect();
  }
})();
