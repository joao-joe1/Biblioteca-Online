import { Body, Controller, Post, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { EmprestimoDTO } from "./emprestimo-dto/emprestimo.dto";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

@Controller('/emprestimos')
export class EmprestimoController {
    @Post()
    async registroLivroPendente(@Body() dadosEmprestimo: EmprestimoDTO) {
        try {
            const livro = await prisma.livros.findFirst({
                where: {
                    titulo: dadosEmprestimo.nomeLivro
                }
            });

            if (!livro) {
                throw new HttpException('Livro não encontrado!', HttpStatus.NOT_FOUND);
            }

            if (livro.quantidade_disponivel <= 0) {
                throw new HttpException('Livro indisponível para empréstimo.', HttpStatus.BAD_REQUEST);
            }

            const user = await prisma.users.findUnique({
                where: {
                    code: dadosEmprestimo.alunoCode
                }
            });

            if (!user) {
                throw new HttpException('Aluno não encontrado!', HttpStatus.NOT_FOUND);
            }

            const dataDevolucao = addDays(new Date(), 7);

            const emprestimo = await prisma.emprestimo.create({
                data: {
                    livroId: livro.id,
                    aluno: user.name,
                    data_devolucao: dataDevolucao
                }
            });

            await prisma.livros.update({
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
