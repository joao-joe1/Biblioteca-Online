/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_code_key" ON "Users"("code");
