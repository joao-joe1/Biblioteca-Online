import { Controller, Get, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { AdminCheckGuard } from "src/guards/admin-check.guard";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('usuario')
export class ListaUsuarioController {
    constructor(private readonly prismaService: PrismaService) { }
    @UseGuards(AdminCheckGuard)
    @Get('lista')
    async listUsuarios() {
        try {
            const listUsuarios = await this.prismaService.users.findMany({
                select: {
                    id: true,
                    email: true,
                    password: false,
                    admin: true,
                    telefone: true,
                    rua: true,
                    bairro: true,
                    cidade: true,
                    created_at: true,
                    updated_at: true,
                    code: true
                }
            })
            return { data: listUsuarios }
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Erro ao listar os usuários!',
                    message: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}