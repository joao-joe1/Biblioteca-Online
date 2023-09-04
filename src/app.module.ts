import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmprestimosModule } from './modules/emprestimo/emprestimos.module';
import { LivroModule } from './modules/livros/livros.module';
import { UsuarioModule } from './modules/usuarios/usuario.module';

@Module({
  imports: [UsuarioModule, LivroModule, EmprestimosModule, PrismaModule],
})

export class AppModule { }