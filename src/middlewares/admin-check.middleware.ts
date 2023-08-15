import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction, response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AdminCheckMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {

        const { user_id } = req
        try {
            const user = await prisma.users.findUnique({
                where: { id: user_id }
            })
            if (!user || !user.admin) {
                return response.status(403).json({
                    error: 'Não autorizado. Somente administradores podem acessar esta rota.'
                })
            }
            next();
        } catch (error) {
            console.error(error)
            return response.status(500).json({
                error: 'Erro ao verificar status de administrador.'
            })
        }
    }
}