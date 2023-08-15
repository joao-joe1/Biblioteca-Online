-- CreateTable
CREATE TABLE "Livros" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "auto" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "capa_url" TEXT NOT NULL,
    "quantidade_disponivel" INTEGER NOT NULL,
    "quantidade_total" INTEGER NOT NULL,
    "classificacao" DOUBLE PRECISION NOT NULL,
    "data_aquisicao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" SERIAL NOT NULL,
    "data_retirada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_devolucao" TIMESTAMP(3),
    "livroId" TEXT NOT NULL,
    "aluno" TEXT NOT NULL,

    CONSTRAINT "Emprestimo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Livros_isbn_key" ON "Livros"("isbn");

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
