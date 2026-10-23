-- CreateTable
CREATE TABLE "SepayTransaction" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT,

    CONSTRAINT "SepayTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SepayTransaction_paymentId_idx" ON "SepayTransaction"("paymentId");

