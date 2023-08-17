import { Module } from "@nestjs/common";
import { EmprestimoController } from "./emprestimo.controller";

@Module({
    controllers: [EmprestimoController],
})

export class LivrosPendenteModule {}