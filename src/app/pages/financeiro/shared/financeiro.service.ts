import { Injectable, Injector } from '@angular/core';
import { FinanceiroDTO } from './financeiro.dto';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { ServiceBase } from 'src/app/shared/services/serviceBase';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceiroService extends ServiceBase<FinanceiroDTO> {


    constructor(protected injector: Injector,
        private categoriaService: CategoriaService) {
        super('api/entries', injector)
    }

    create(financeiro: FinanceiroDTO): Observable<FinanceiroDTO> {

        return this.categoriaService.getById(financeiro.categoryId)
            .pipe(flatMap(cat => {
                financeiro.category = cat
                return super.create(financeiro)
            }))
    }

    update(financeiro: FinanceiroDTO): Observable<FinanceiroDTO> {

        return this.categoriaService.getById(financeiro.categoryId)
            .pipe(flatMap(cat => {
                financeiro.category = cat
                return super.update(financeiro)

            }))
    }

    protected JsonToModels(jsonData: any[]): FinanceiroDTO[] {
        const financial: FinanceiroDTO[] = []
        jsonData.forEach(element => financial.push(FinanceiroDTO.fromJson(element)))

        return financial
    }

    protected JsonToModel(jsonData: any): FinanceiroDTO {
        return FinanceiroDTO.fromJson(jsonData)

    }
}
