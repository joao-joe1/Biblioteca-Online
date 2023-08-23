import { Body, Controller, InternalServerErrorException, NotFoundException, Param, Put } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/livros')
export class AtulizarLivroController {
    constructor(private readonly prismaService: PrismaService) { }

    @Put(':id/atualizar')
    async atualizarLivro(@Param('id') id: string, @Body() livroData: any) {
        try {
            const livro = await this.prismaService.livros.findUnique({
                where: { id: id }
            });

            if (!livro) {
                throw new NotFoundException(`Livro com o ID ${id} não encontrado.`);
            }

            const updateData = this.filterValidFields(livroData);

            if (Object.keys(updateData).length === 0) {
                return { message: 'Nenhum campo válido para atualizar.' };
            }

            await this.prismaService.livros.update({
                where: { id: id },
                data: updateData
            });

            return { message: 'Livro atualizado com sucesso.' };
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ocorreu um erro durante a atualização do livro.');
        }
    }

    private filterValidFields(data: any): any {
        const validFields = ['titulo', 'autor', 'descricao', 'genero', 'capa_url', 'quantidade_disponivel', 'quantidade_total', 'classificacao'];
        return Object.keys(data)
            .filter(key => validFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
    }
}
