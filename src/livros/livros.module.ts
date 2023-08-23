import { Module } from "@nestjs/common";
import { LivroController } from "./livros.controller";
import { BuscaLivroController } from "./busca-livros.controller";
import { DeletarLivroController } from "./deletar-livros.controller";
import { AtulizarLivroController } from "./atualizar-livros.controller";

@Module({
    imports: [LivroModule],
    controllers: [LivroController, BuscaLivroController, DeletarLivroController, AtulizarLivroController],
})

export class LivroModule { }