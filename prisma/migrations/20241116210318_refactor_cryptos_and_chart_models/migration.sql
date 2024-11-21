-- DropForeignKey
ALTER TABLE "cryptos" DROP CONSTRAINT "cryptos_externalId_fkey";

-- AddForeignKey
ALTER TABLE "crypto_charts" ADD CONSTRAINT "crypto_charts_externalId_fkey" FOREIGN KEY ("externalId") REFERENCES "cryptos"("externalId") ON DELETE RESTRICT ON UPDATE CASCADE;
