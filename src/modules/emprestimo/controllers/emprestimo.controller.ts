import { Body, Controller, Post, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { EmprestimoDTO } from "../emprestimo-dto/emprestimo.dto";
import { addDays } from "date-fns";
import { PrismaService } from "src/prisma/prisma.service";
import { AdminCheckGuard } from "src/guards/admin-check.guard";


@Controller('/emprestimo')
export class EmprestimoController {
    constructor(private readonly prismaService: PrismaService) { }
    @UseGuards(AdminCheckGuard)
    @Post()
    async registroLivroPendente(@Body() dadosEmprestimo: EmprestimoDTO) {
        try {
            const livro = await this.prismaService.livros.findFirst({
                where: {
                    titulo: dadosEmprestimo.nomeLivro,
                    quantidade_disponivel: { gt: 0 }
                }
            });

            if (!livro) {
                throw new HttpException('Livro não encontrado!', HttpStatus.NOT_FOUND);
            }

            if (livro.quantidade_disponivel <= 0) {
                throw new HttpException('Livro indisponível para empréstimo.', HttpStatus.BAD_REQUEST);
            }

            const user = await this.prismaService.users.findUnique({
                where: {
                    code: dadosEmprestimo.alunoCode
                }
            });

            if (!user) {
                throw new HttpException('Aluno não encontrado!', HttpStatus.NOT_FOUND);
            }

            const dataDevolucao = addDays(new Date(), 7);

            const emprestimo = await this.prismaService.emprestimo.create({
                data: {
                    livroId: livro.id,
                    aluno: user.name,
                    data_devolucao: dataDevolucao
                }
            });

            await this.prismaService.livros.update({
                where: { id: livro.id },
                data: {
                    quantidade_disponivel: livro.quantidade_disponivel - 1,
                }
            });

            return { message: 'Empréstimo realizado com sucesso!', data: emprestimo };

        } catch (error) {
            console.error('Ocorreu um erro:', error);
            throw new HttpException('Ocorreu um erro ao processar a solicitação.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
