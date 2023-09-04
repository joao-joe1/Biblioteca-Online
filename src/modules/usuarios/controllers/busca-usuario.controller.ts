import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { Users } from "@prisma/client";
import { UsersService } from "../services/users.service";


@Controller('usuario')
export class BuscaUsuarioController {
    constructor(private readonly userService: UsersService) { }
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<Users> {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException(`Usuário com o ID ${id} não encontrado...`)
        }
        return user
    }
}