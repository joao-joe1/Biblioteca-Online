import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";


@Controller('/listausuarios')
export class ListaUsuarioController {
    constructor(private readonly prismaService: PrismaService) { }

    @Get()
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
                    updated_at: true
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