import { Controller, Delete, Param, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Controller('emprestimo')
export class DeletarEmprestimoController {
    @Delete(':id/deletar')
    async deletarEmprestimo(@Param('id') id: number) {
        try {
            const emprestimo = await prisma.emprestimo.findUnique({
                where: {
                    id: id,
                },
            });

            if (!emprestimo) {
                throw new NotFoundException(`Empréstimo com o ID ${id} não encontrado.`);
            }

            const deletaEmprestimo = await prisma.emprestimo.delete({
                where: {
                    id: id,
                },
            });

            return {
                message: 'Empréstimo deletado com sucesso!',
                deletedEmprestimo: deletaEmprestimo,
            };
        } catch (error) {
            throw new InternalServerErrorException('Houve um erro ao deletar o empréstimo.', error);
        }
    }
}
