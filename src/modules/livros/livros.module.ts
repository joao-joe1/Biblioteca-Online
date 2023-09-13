import { Module } from "@nestjs/common";
import { LivroController } from "./controllers/livros.controller";
import { BuscaLivroController } from "./controllers/busca-livros.controller";
import { DeletarLivroController } from "./controllers/deletar-livros.controller";
import { AtulizarLivroController } from "./controllers/atualizar-livros.controller";
import { ServiceModule } from "../usuarios/services/services.module";

@Module({
    providers: [ServiceModule],
    imports: [LivroModule, ServiceModule],
    controllers: [LivroController, BuscaLivroController, DeletarLivroController, AtulizarLivroController],
})

export class LivroModule { }