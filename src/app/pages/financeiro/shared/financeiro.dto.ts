import { CategoriaDTO } from '../../categorias/shared/categoria.dto';
import { ModelBase } from '../../../shared/models/modelBase.dto'


export class FinanceiroDTO extends ModelBase {
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

    ) { super() }

    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    }

    static fromJson(json: any): FinanceiroDTO {
        return Object.assign(new FinanceiroDTO(), json)
    }

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente'
    }
}