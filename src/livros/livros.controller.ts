import { Body, Controller, Post, HttpException, HttpStatus } from "@nestjs/common";
import { CreateBookDTO } from "./books-dtos/createBooks.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/livros')
export class LivroController {
    constructor(private readonly prismaService: PrismaService) { }

    @Post()
    async cadastrarLivro(@Body() dadosLivros: CreateBookDTO) {
        try {
            const createBook = await this.prismaService.livros.create({
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

            return { message: 'Livro criado com sucesso!', data: createBook };
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            throw new HttpException('Erro ao cadastrar um livro!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
