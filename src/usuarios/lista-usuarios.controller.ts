import { PrismaClient } from "@prisma/client";
import { Controller, Get } from "@nestjs/common";

const prisma = new PrismaClient();

@Controller('/listausuarios')
export class ListaUsuarioController {
    @Get()
    async listUsuarios() {
        try {
            const listUsuarios = await prisma.users.findMany({
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
            throw error
        }
    }
}