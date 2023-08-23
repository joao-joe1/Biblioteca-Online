import { Controller, Delete, InternalServerErrorException, NotFoundException, Param } from "@nestjs/common";
import { id } from "date-fns/locale";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/livros')
export class DeletarLivroController {
    constructor(private readonly prismaService: PrismaService) { }

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
