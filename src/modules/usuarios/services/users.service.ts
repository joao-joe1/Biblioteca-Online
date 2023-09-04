import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }

    async getUserById(id: string): Promise<Users | null> {
        return this.prismaService.users.findUnique({ where: { id } })
    }
}