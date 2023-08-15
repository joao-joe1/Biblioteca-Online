import { Module } from "@nestjs/common";
import { LivroController } from "./livros.controller";
import { BuscaLivroController } from "./busca-livros.controller";

@Module({
    controllers: [LivroController, BuscaLivroController],
})

export class LivroModule { }