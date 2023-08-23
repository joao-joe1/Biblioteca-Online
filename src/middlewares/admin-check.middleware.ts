import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AdminCheckMiddleware implements NestMiddleware {
    constructor(private readonly prismaService: PrismaService) { }

    async use(req: Request, res: Response, next: NextFunction) {

        const { user_id } = req
        try {
            const user = await this.prismaService.users.findUnique({
                where: { id: user_id }
            })
            if (!user || !user.admin) {
                return res.status(403).json({
                    error: 'Não autorizado. Somente administradores podem acessar esta rota.'
                })
            }
            next();
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                error: 'Erro ao verificar status de administrador.'
            })
        }
    }
}