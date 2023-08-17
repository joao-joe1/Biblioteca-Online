import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsuarioModule } from './usuarios/usuario.module';
import { LivroModule } from './livros/livros.module';
import { ApiTokenCheckMiddleware } from './middlewares/api-token-check.middleware';
import { AdminCheckMiddleware } from './middlewares/admin-check.middleware';
import { LivrosPendenteModule } from './emprestimo/livros-pendente.module';

@Module({
  imports: [UsuarioModule, LivroModule, LivrosPendenteModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes('livros', 'cadastralivros', 'listausuarios', 'emprestimos', 'listaemprestimos')

      .apply(AdminCheckMiddleware)
      .forRoutes('cadastralivros', 'listausuarios', 'emprestimos', 'listaemprestimos')
  }
}
