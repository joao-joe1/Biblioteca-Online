import { PrismaClient } from "@prisma/client";
import { Controller, Get } from "@nestjs/common";

const prisma = new PrismaClient();


@Controller('listaemprestimos')
export class ListaEmprestimoController {
    @Get()
    async listaEmprestimo() {
        const emprestimos = await prisma.emprestimo.findMany()
        return { emprestimos: emprestimos }
    }
}