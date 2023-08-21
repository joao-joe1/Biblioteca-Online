import { Controller, NotFoundException, Param, Put } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
@Controller('/emprestimo')
export class EmprestimoEntregueController {

    @Put(':id/entregar')
    async confirmarEntrega(@Param('id') id: number) {
        try {
            const emprestimo = await prisma.emprestimo.findUnique({
                where: {
                    id: id
                }
            })

            if (!emprestimo) {
                throw new NotFoundException(`Empréstimo com o ID ${id} não encontrado.`);
            }

            const emprestigoEntregue = await prisma.emprestimo.update({
                where: { id: id },
                data: { entregue: true, data_entregue: new Date() }
            })
            return { message: 'Livro marcado como entregue!', data: emprestigoEntregue }
        } catch (error) {
            return { message: 'Erro ao confirmar entrega do livro.', error };
        }
    }
}