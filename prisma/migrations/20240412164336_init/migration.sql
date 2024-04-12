-- CreateTable
CREATE TABLE "Bookings" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "advance" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookings_title_key" ON "Bookings"("title");
