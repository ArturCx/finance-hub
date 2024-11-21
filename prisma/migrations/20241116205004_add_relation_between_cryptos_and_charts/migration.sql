/*
  Warnings:

  - You are about to drop the `CryptoCharts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CryptoCharts";

-- CreateTable
CREATE TABLE "crypto_charts" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "prices" JSONB NOT NULL,
    "marketCaps" JSONB NOT NULL,
    "totalVolumes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crypto_charts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "crypto_charts_externalId_key" ON "crypto_charts"("externalId");

-- AddForeignKey
ALTER TABLE "cryptos" ADD CONSTRAINT "cryptos_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES "crypto_charts"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;
