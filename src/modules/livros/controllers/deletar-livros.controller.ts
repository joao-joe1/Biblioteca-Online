import { Controller, Delete, InternalServerErrorException, NotFoundException, Param, UseGuards } from "@nestjs/common";
import { AdminCheckGuard } from "src/guards/admin-check.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('livros')
export class DeletarLivroController {
    constructor(private readonly prismaService: PrismaService) { }

    @UseGuards(AdminCheckGuard)
    @Delete(':id/deletar')
    async deletarLivro(@Param('id') id: string) {
        try {
            const livro = await this.prismaService.livros.findUnique({
                where: { id: id }
            });

            if (!livro) {
                throw new NotFoundException(`Livro com o ID ${id} não encontrado.`);
            }

            const emprestimos = await this.prismaService.emprestimo.findMany({
                where: { livroId: id }
            })

            for (const emprestimo of emprestimos) {
                await this.prismaService.emprestimo.delete({
                    where: { id: emprestimo.id }
                });
            }

            const livroDeletado = await this.prismaService.livros.delete({
                where: { id: id }
            });

            return {
                message: 'Livro deletado com sucesso!',
                deletedLivro: livroDeletado,
            };

        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Houve um erro ao deletar o livro.', error);
        }
    }
}
