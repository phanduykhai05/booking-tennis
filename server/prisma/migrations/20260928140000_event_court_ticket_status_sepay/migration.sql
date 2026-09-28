-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('CANCELLED', 'PAID', 'PENDING');

-- AlterEnum
ALTER TYPE "PaymentMethod" ADD VALUE 'SEPAY';

-- AlterTable
ALTER TABLE "EventTicket" ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'PAID',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "gatewayRef" TEXT,
ADD COLUMN     "ticketId" TEXT,
ADD COLUMN     "transferContent" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "bookingId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "VenueEvent" ADD COLUMN     "courtId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transferContent_key" ON "Payment"("transferContent");

-- CreateIndex
CREATE INDEX "Payment_ticketId_idx" ON "Payment"("ticketId");

-- CreateIndex
CREATE INDEX "VenueEvent_courtId_eventDate_idx" ON "VenueEvent"("courtId", "eventDate");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "EventTicket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueEvent" ADD CONSTRAINT "VenueEvent_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE SET NULL ON UPDATE CASCADE;

