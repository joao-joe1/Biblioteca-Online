import { PrismaClient } from "@prisma/client";
import { Controller, Get } from "@nestjs/common";
import { Expose, plainToClass, classToPlain } from "class-transformer";

const prisma = new PrismaClient();

class EmprestimoDTO {
    id: number;
    aluno: string;
    data_retirada: Date;
    data_devolucao: Date;
    data_entregue: Date;
    livroId: string;
    entregue: boolean;

    constructor(emprestimo: {
        id: number;
        aluno: string;
        data_retirada: Date;
        data_devolucao: Date;
        data_entregue: Date;
        livroId: string;
        entregue: boolean;
    }) {
        this.id = emprestimo.id;
        this.aluno = emprestimo.aluno;
        this.data_retirada = emprestimo.data_retirada
        this.data_devolucao = emprestimo.data_devolucao;
        this.data_entregue = emprestimo.data_entregue;
        this.livroId = emprestimo.livroId;
        this.entregue = emprestimo.entregue;
    }

    @Expose({ name: "customStatusEmprestimo" })
    customName(): string {
        if (this.entregue) {
            return `Entregue no dia ${this.data_entregue}`
        }

        const hoje = new Date();
        const diff = (hoje.getTime() - this.data_devolucao.getTime()) / (1000 * 60 * 60 * 24);
        if (diff >= 8) {
            return "Atrasados com urgência!";
        } else if (diff >= 7) {
            return "Atrasados!";
        } else {
            return "Emprestimo em dia!";
        }
    }
}

@Controller('listaemprestimos')
export class ListaEmprestimoController {
    @Get()
    async listaEmprestimo() {
        const emprestimos = await prisma.emprestimo.findMany();

        const emprestimosEntregues = await prisma.emprestimo.findMany({
            where: {
                entregue: true
            },
            include: {
                livro: true
            }
        });

        const emprestimosPendentes = await prisma.emprestimo.findMany({
            where: {
                entregue: false
            },
            include: {
                livro: true
            }
        });

        const exposedEmprestimos = emprestimos.map(emprestimo => new EmprestimoDTO(emprestimo));
        const exposedEmprestimosEntregues = emprestimosEntregues.map(emprestimoEntregue => new EmprestimoDTO(emprestimoEntregue))
        const exposedEmprestimosPendentes = emprestimosPendentes.map(emprestimoPendentes => new EmprestimoDTO(emprestimoPendentes))

        return {
            emprestimos: classToPlain(exposedEmprestimos),
            emprestimos_entregues: classToPlain(exposedEmprestimosEntregues),
            emprestimosPendentes: classToPlain(exposedEmprestimosPendentes)
        };
    }
}
