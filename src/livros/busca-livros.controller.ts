import { Controller, Get } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('/livros')
export class BuscaLivroController {
    constructor(private readonly prismaService: PrismaService) { }

    @Get()
    async BuscarLivros() {
        try {
            const buscaLivros = await this.prismaService.livros.findMany()
            return { books: buscaLivros }
        } catch (error) {
            throw error;
        }
    }
}