import { Controller, Delete, Param, NotFoundException, InternalServerErrorException, ParseIntPipe } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('emprestimo')
export class DeletarEmprestimoController {
    constructor(private readonly prismaService: PrismaService) { }

    @Delete(':id/deletar')
    async deletarEmprestimo(@Param('id', ParseIntPipe) id: number) {
        try {
            const emprestimo = await this.prismaService.emprestimo.findUnique({
                where: {
                    id: id,
                },
            });

            if (!emprestimo) {
                throw new NotFoundException(`Empréstimo com o ID ${id} não encontrado.`);
            }

            const deletaEmprestimo = await this.prismaService.emprestimo.delete({
                where: {
                    id: id,
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
