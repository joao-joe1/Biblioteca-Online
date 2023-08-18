import { Controller, Param, Put } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
/* Entregar livro */
@Controller('/emprestimoentregue')
export class EmprestimoEntregueController {

    @Put(':id/entregar')
    async confirmarEntrega(@Param('id') id: number) {
        try {
            const emprestigoEntregue = await prisma.emprestimo.update({
                where: { id: Number(id) },
                data: { entregue: true, data_entregue: new Date() }
            })
            return { message: 'Livro marcado como entregue!', data: emprestigoEntregue }
        } catch (error) {
            console.log(error)
            return { message: 'Erro ao confirmar entrega do livro.', error };
        }
    }
}