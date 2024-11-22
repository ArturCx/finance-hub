-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('PAID', 'PAYABLE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "BillCategory" AS ENUM ('HOUSING', 'TRANSPORTATION', 'FOOD', 'ENTERTAINMENT', 'HEALTH', 'UTILITY', 'SALARY', 'EDUCATION', 'OTHER');

-- CreateEnum
CREATE TYPE "BillPaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'BANK_SLIP', 'CASH', 'PIX', 'OTHER');

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "BillStatus" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" "BillCategory" NOT NULL,
    "paymentMethod" "BillPaymentMethod" NOT NULL,
    "expireDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);
