import { Controller, Body, Get } from '@nestjs/common'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('livros')
export class BuscaLivroController {
    @Get()
    async BuscarLivros() {
        try {
            const buscaLivros = await prisma.livros.findMany()
            return { books: buscaLivros }
        } catch (error) {
            throw error;
        }
    }
}