import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { AuthenticateUsuarioController } from './auth.controller';
import { ListaUsuarioController } from './lista-usuarios.controller';

@Module({
    controllers: [UsuarioController, AuthenticateUsuarioController, ListaUsuarioController],
})

export class UsuarioModule { }