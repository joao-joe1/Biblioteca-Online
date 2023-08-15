import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";


interface InterfaceAuthMiddleware {
    sub: string
}

export class ApiTokenCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        const JWT_SECRET = process.env.JWT_SECRET as string
        const authToken = req.headers.authorization as string

        if (!authToken) {
            return res.status(401).json({
                error: 'Acesso não autorizado. Token de autenticação inválido ou ausente.'
            });
        }

        const token = authToken.split(' ')[1]

        try {
            const { sub } = verify(token, JWT_SECRET) as InterfaceAuthMiddleware;
            req.user_id = sub;
            next();
        } catch (error) {
            return res.status(401).json({
                error: 'Acesso não autorizado. Token de autenticação inválido.'
            });
        }
    }
}