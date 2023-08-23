/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bairro` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "bairro" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL DEFAULT 'MG',
ADD COLUMN     "rua" TEXT NOT NULL,
ADD COLUMN     "telefone" INTEGER NOT NULL,
ALTER COLUMN "admin" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Users_telefone_key" ON "Users"("telefone");
