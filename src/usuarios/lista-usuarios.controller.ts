import { PrismaClient } from "@prisma/client";
import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";


@Controller('/listausuarios')
export class ListaUsuarioController {
    constructor(private readonly prisma: PrismaClient) { }

    @Get()
    async listUsuarios() {
        try {
            const listUsuarios = await this.prisma.users.findMany({
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