import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { AuthenticateUsuarioController } from './auth.controller';

@Module({
    controllers: [UsuarioController, AuthenticateUsuarioController],
})

export class UsuarioModule { }