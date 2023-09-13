import { Body, Controller, Post, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { CreateBookDTO } from "../books-dtos/createBooks.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminCheckGuard } from "src/guards/admin-check.guard";

@Controller('livros')
export class LivroController {
    constructor(private readonly prismaService: PrismaService) { }

    @UseGuards(AdminCheckGuard)
    @Post('cadastrar')
    async cadastrarLivro(@Body() dadosLivros: CreateBookDTO): Promise<{ message: string; data: { id: string; titulo: string; autor: string; descricao: string; genero: string; capa_url: string; quantidade_disponivel: number; quantidade_total: number; classificacao: number; data_aquisicao: Date; }; }> {
        try {

            const data = await this.prismaService.livros.create({
                data: {
                    titulo: dadosLivros.titulo,
                    autor: dadosLivros.autor,
                    descricao: dadosLivros.descricao,
                    genero: dadosLivros.genero,
                    capa_url: dadosLivros.capa_url,
                    quantidade_disponivel: dadosLivros.quantidade_disponivel,
                    quantidade_total: dadosLivros.quantidade_total,
                    classificacao: dadosLivros.classificacao
                }
            });

            console.log('creating books...', data)
            return { message: 'Livro criado com sucesso!', data };
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            throw new HttpException('Erro ao cadastrar um livro!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
