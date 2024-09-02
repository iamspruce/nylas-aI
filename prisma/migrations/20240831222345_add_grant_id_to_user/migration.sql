/*
  Warnings:

  - A unique constraint covering the columns `[grantId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "grantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Account_grantId_key" ON "Account"("grantId");
