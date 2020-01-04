import { Injectable, Injector } from '@angular/core';
import { FinanceiroDTO } from './financeiro.dto';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { ServiceBase } from 'src/app/shared/services/serviceBase';
import { flatMap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

//data
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService extends ServiceBase<FinanceiroDTO> {


  constructor(protected injector: Injector,
    private categoriaService: CategoriaService) {
    super('api/entries', injector, FinanceiroDTO.fromJson)
  }

  create(financeiro: FinanceiroDTO): Observable<FinanceiroDTO> {

    return this.setCategoryAndSendToServer(financeiro, super.create.bind(this))

  }

  update(financeiro: FinanceiroDTO): Observable<FinanceiroDTO> {

    return this.setCategoryAndSendToServer(financeiro, super.update.bind(this))

  }

  private setCategoryAndSendToServer(financeiro: FinanceiroDTO, sendFn: any): Observable<FinanceiroDTO> {
    return this.categoriaService.getById(financeiro.categoryId).pipe(
      flatMap(category => {
        financeiro.category = category;
        return sendFn(financeiro)
      }),
      catchError(this.HandleError)
    );
  }

  getByFilter(month: number, year: number): Observable<FinanceiroDTO[]> {
    return this.getAll().pipe(
      map(itens => this.filterByMonthAndYear(itens, month, year))
    )
  }
  private filterByMonthAndYear(itens: FinanceiroDTO[], month: number, year: number): any {

    return itens.filter(item => {
      let date = moment(item.date, 'DD/MM/YYYY')
      let monthMatch = date.month() + 1 == month
      let yearMatch = date.year() == year

      if (monthMatch && yearMatch)
        return item

    })


  }


}
