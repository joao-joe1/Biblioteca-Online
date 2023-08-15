import { Module } from "@nestjs/common";
import { LivroController } from "./livros.controller";

@Module({
    controllers: [LivroController],
})

export class LivroModule { }