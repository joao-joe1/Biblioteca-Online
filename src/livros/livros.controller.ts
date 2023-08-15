import { PrismaClient } from "@prisma/client";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateBookDTO } from "./books-dtos/createBooks.dto";

const prisma = new PrismaClient();

@Controller('/livros')
export class LivroController {
    @Post()
    async cadastrarLivro(@Body() dadosLivros: CreateBookDTO) {
        try {

            const createBook = await prisma.livros.create({
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

            })
            return { message: 'Livro criado com sucesso!', data: createBook }
        } catch (error) {
            return { message: 'Erro ao cadastrar um livro!', error: error }
        }
    }
}