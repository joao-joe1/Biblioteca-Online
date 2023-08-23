import { Module, NestModule, MiddlewareConsumer, Global } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { LivroModule } from './livros/livros.module';
import { ApiTokenCheckMiddleware } from './middlewares/api-token-check.middleware';
import { AdminCheckMiddleware } from './middlewares/admin-check.middleware';
import { EmprestimosModule } from './emprestimo/emprestimos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsuarioModule, LivroModule, EmprestimosModule, PrismaModule],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes('livros', 'listausuarios', 'emprestimo')

      .apply(AdminCheckMiddleware)
      .forRoutes('cadastralivros', 'listausuarios', 'emprestimo', 'livros')
  }
}
