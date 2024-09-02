/*
  Warnings:

  - You are about to drop the column `grantId` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[grantId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_grantId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "grantId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "grantId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_grantId_key" ON "User"("grantId");
