import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Observable, throwError, observable } from 'rxjs';
import { FinanceiroDTO } from './financeiro.dto';
import { CategoriaService } from '../../categorias/shared/categoria.service';


@Injectable({
    providedIn: 'root'
})
export class FinanceiroService {

    private api: string = 'api/entries'
    constructor(private http: HttpClient,
        private categoriaService: CategoriaService) { }


    create(financeiro: FinanceiroDTO): Observable<FinanceiroDTO> {

        return this.categoriaService.getById(financeiro.categoryId)
            .pipe(flatMap(cat => {
                financeiro.category = cat
                return this.http.post(this.api, financeiro).pipe(
                    catchError(this.HandleError),
                    map(this.JsonToModel))
            }))
    }

    update(financeiro: FinanceiroDTO): Observable<FinanceiroDTO> {

        return this.categoriaService.getById(financeiro.categoryId)
            .pipe(flatMap(cat => {
                financeiro.category = cat
                return this.http.put(`${this.api}/${financeiro.id}`, financeiro).pipe(
                    catchError(this.HandleError),
                    map(() => financeiro))
            }))
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.api}/${id}`).pipe(
            catchError(this.HandleError),
            map(() => null))
    }

    getAll(): Observable<FinanceiroDTO[]> {
        return this.http.get(this.api).pipe(
            catchError(this.HandleError),
            map(this.JsonToModels))
    }
    getById(id: number): Observable<FinanceiroDTO> {
        return this.http.get(`${this.api}/${id}`).pipe(
            catchError(this.HandleError),
            map(this.JsonToModel))
    }


    private HandleError(error: any): Observable<any> {
        console.log('erro nao req', error)

        return throwError(error);


    }

    private JsonToModels(jsonData: any[]): FinanceiroDTO[] {
        const financial: FinanceiroDTO[] = []
        jsonData.forEach(element => financial.push(Object.assign(new FinanceiroDTO, element)))

        return financial
    }

    private JsonToModel(jsonData: any): FinanceiroDTO {
        return Object.assign(new FinanceiroDTO, jsonData)

    }
}
