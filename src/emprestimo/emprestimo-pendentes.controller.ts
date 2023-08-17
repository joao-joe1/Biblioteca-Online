import { Controller, Get } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Controller('emprestimopendentes')
export class EmprestimoPendentesController {
    @Get()
    async listaEmprestimoPendentes() {
        try {
            const livrosPendentes = await prisma.emprestimo.findMany({
                where: { entregue: false },
                include: { livro: true }
            })
            return livrosPendentes
        } catch (error) {
            return { message: error }
        }
    }
}