import { Module } from "@nestjs/common";
import { EmprestimoController } from "./controllers/emprestimo.controller";
import { ListaEmprestimoController } from "./controllers/lista-emprestimos.controller";
import { EmprestimoEntregueController } from "./controllers/entregar-emprestimo.controller";
import { DeletarEmprestimoController } from "./controllers/deletar-emprestimo.controller";
import { ServiceModule } from "../usuarios/services/services.module";

@Module({
    providers: [ServiceModule],
    imports: [EmprestimosModule, ServiceModule],
    controllers: [EmprestimoController, ListaEmprestimoController, EmprestimoEntregueController, DeletarEmprestimoController],
})

export class EmprestimosModule { }