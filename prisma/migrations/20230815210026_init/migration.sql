/*
  Warnings:

  - You are about to drop the column `auto` on the `Livros` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `Livros` table. All the data in the column will be lost.
  - Added the required column `autor` to the `Livros` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Livros_isbn_key";

-- AlterTable
ALTER TABLE "Livros" DROP COLUMN "auto",
DROP COLUMN "isbn",
ADD COLUMN     "autor" TEXT NOT NULL;
