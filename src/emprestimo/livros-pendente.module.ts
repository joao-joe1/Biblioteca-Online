import { Module } from "@nestjs/common";
import { EmprestimoController } from "./emprestimo.controller";
import { ListaEmprestimoController } from "./lista-emprestimos.controller";
import { EmprestimoEntregueController } from "./emprestimo-entregue.controller";
import { EmprestimoEntreguesController } from "./emprestimo-entregues.controller";
import { EmprestimoPendentesController } from "./emprestimo-pendentes.controller";

@Module({
    controllers: [EmprestimoController, ListaEmprestimoController, EmprestimoEntregueController, EmprestimoEntreguesController, EmprestimoPendentesController],
})

export class LivrosPendenteModule { }