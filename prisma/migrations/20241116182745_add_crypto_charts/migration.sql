-- CreateTable
CREATE TABLE "CryptoCharts" (
    "id" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "prices" JSONB NOT NULL,
    "marketCaps" JSONB NOT NULL,
    "totalVolumes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CryptoCharts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoCharts_externalId_key" ON "CryptoCharts"("externalId");
