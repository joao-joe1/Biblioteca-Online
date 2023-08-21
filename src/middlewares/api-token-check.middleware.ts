import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";

interface AuthPayload {
    sub: string
}

@Injectable()
export class ApiTokenCheckMiddleware implements NestMiddleware {

    private readonly JWT_SECRET: string = process.env.JWT_SECRET || "";

    use(req: Request, res: Response, next: NextFunction) {
        const authToken = req.headers.authorization as string

        if (!authToken) {
            return res.status(401).json({
                error: 'Acesso não autorizado. Token de autenticação inválido ou ausente.'
            });
        }

        const token = authToken.split(' ')[1]

        try {
            const decodedToken = verify(token, this.JWT_SECRET) as AuthPayload;
            req.user_id = decodedToken.sub;
            next();
        } catch (error) {
            return res.status(401).json({
                error: 'Acesso não autorizado. Token de autenticação inválido.'
            });
        }
    }
}