import { Controller, Get } from '@nestjs/common'
import { PrismaClient } from '@prisma/client';


@Controller('/livros')
export class BuscaLivroController {
    constructor(private readonly prisma: PrismaClient) { }

    @Get()
    async BuscarLivros() {
        try {
            const buscaLivros = await this.prisma.livros.findMany()
            return { books: buscaLivros }
        } catch (error) {
            throw error;
        }
    }
}