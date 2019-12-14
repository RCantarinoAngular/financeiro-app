import { InMemoryDbService } from 'angular-in-memory-web-api'
import { CategoriaDTO } from './pages/categorias/shared/categoria.dto'
import { FinanceiroDTO } from './pages/financeiro/shared/financeiro.dto'


export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categorias: CategoriaDTO[] =
            [{
                id: 1,
                name: 'Lazer',
                description: 'praia , lojas'
            },
            {
                id: 2,
                name: 'Moradia',
                description: 'aluguel'
            }, {
                id: 3,
                name: 'Salarios',
                description: 'salario'
            }, {
                id: 4,
                name: 'Saude',
                description: 'remedios'
            }]


        const entries: FinanceiroDTO[] =
            [
                {
                    id: 1,
                    name: 'Gas',
                    paid: true,
                    date: '01/01/2019',
                    amount: '50,00',
                    type: 'expense',
                    description: 'Gas de cozinha',
                    category: categorias[0],
                    categoryId: categorias[0].id

                } as FinanceiroDTO , 
                {
                    id: 2,
                    name: 'Cadernos',
                    paid: false,
                    date: '01/01/2019',
                    amount: '500,00',
                    type: 'expense',
                    description: 'Material escolar',
                    category: categorias[3],
                    categoryId: categorias[3].id

                } as FinanceiroDTO] 



        return { categorias, entries }
    }
}