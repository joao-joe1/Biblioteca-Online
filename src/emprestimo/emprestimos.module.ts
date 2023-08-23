import { Module } from "@nestjs/common";
import { EmprestimoController } from "./emprestimo.controller";
import { ListaEmprestimoController } from "./lista-emprestimos.controller";
import { EmprestimoEntregueController } from "./entregar-emprestimo.controller";
import { EmprestimoEntreguesController } from "./emprestimo-entregues.controller";
import { EmprestimoPendentesController } from "./emprestimo-pendentes.controller";
import { DeletarEmprestimoController } from "./deletar-emprestimo.controller";

@Module({
    imports: [EmprestimosModule],
    controllers: [EmprestimoController, ListaEmprestimoController, EmprestimoEntregueController, DeletarEmprestimoController],
})

export class EmprestimosModule { }