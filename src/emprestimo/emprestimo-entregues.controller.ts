import { Controller, Get } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Controller('emprestimosentregues')
export class EmprestimoEntreguesController {
    @Get()
    async listaEmprestimoEntregues() {
        try {
            const livrosEntregues = await prisma.emprestimo.findMany({
                where: { entregue: true },
                include: { livro: true }
            })
            return livrosEntregues
        } catch (error) {
            return { message: error }
        }
    }
}