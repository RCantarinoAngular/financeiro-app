import { CategoriaDTO } from '../../categorias/shared/categoria.dto';

export class FinanceiroDTO {
    /**
     *
     */
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: CategoriaDTO

    ) { }

    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }


    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente'
    }
}