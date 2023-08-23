import { Controller, Get } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('emprestimosentregues')
export class EmprestimoEntreguesController {
    constructor(private readonly prismaService: PrismaService) { }
    @Get()
    async listaEmprestimoEntregues() {
        try {
            const livrosEntregues = await this.prismaService.emprestimo.findMany({
                where: { entregue: true },
                include: { livro: true }
            })
            return livrosEntregues
        } catch (error) {
            return { message: error }
        }
    }
}