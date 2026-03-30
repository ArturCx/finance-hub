"use server";
import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { generateAiReportSchema, GenerateAiReportSchema } from "./schema";
import { getMonthDateRange } from "@/app/_utils/monthYearFilter";

export const generateAiReport = async ({ month, year }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month, year });
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const { startDate, endDate } = getMonthDateRange(month, year);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
        ${transactions
          .map(
            (transaction) =>
              `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`
          )
          .join(";")}`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return completion.choices[0].message.content;
};
