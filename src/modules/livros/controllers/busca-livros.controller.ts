import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('livros')
export class BuscaLivroController {
    constructor(private readonly prismaService: PrismaService) { }

    @UseGuards(JwtAuthGuard)
    @Get('lista')
    async BuscarLivros() {
        try {
            const buscaLivros = await this.prismaService.livros.findMany()
            return { books: buscaLivros }
        } catch (error) {
            throw error;
        }
    }
}