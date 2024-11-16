import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Busca e ordena os dados do banco de dados
    const cryptos = await prisma.cryptos.findMany({
      orderBy: {
        marketCapRank: "asc", // Ordena por marketCapRank em ordem crescente
      },
    });

    return NextResponse.json(cryptos);
  } catch (error) {
    console.error("Erro ao buscar criptomoedas:", error);
    return NextResponse.json(
      { message: "Erro ao buscar criptomoedas", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
