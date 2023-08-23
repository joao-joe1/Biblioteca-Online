import { Controller, Get } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('emprestimopendentes')
export class EmprestimoPendentesController {
    constructor(private readonly prismaService: PrismaService) { }
    @Get()
    async listaEmprestimoPendentes() {
        try {
            const livrosPendentes = await this.prismaService.emprestimo.findMany({
                where: { entregue: false },
                include: { livro: true }
            })
            return livrosPendentes
        } catch (error) {
            return { message: error }
        }
    }
}