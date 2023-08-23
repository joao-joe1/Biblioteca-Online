import { Controller, Delete, Param, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('emprestimo')
export class DeletarEmprestimoController {
    constructor(private readonly prismaService: PrismaService) { }

    @Delete(':id/deletar')
    async deletarEmprestimo(@Param('id') id: number) {
        try {
            const emprestimo = await this.prismaService.emprestimo.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (!emprestimo) {
                throw new NotFoundException(`Empréstimo com o ID ${id} não encontrado.`);
            }

            const deletaEmprestimo = await this.prismaService.emprestimo.delete({
                where: {
                    id: Number(id),
                },
            });

            return {
                message: 'Empréstimo deletado com sucesso!',
                deletedEmprestimo: deletaEmprestimo,
            };
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Houve um erro ao deletar o empréstimo.', error);
        }
    }
}
