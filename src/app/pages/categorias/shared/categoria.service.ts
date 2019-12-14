import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, flatMap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { CategoriaDTO } from './categoria.dto';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private api: string = 'api/categorias'
  constructor(private http: HttpClient) { }


  create(categoria: CategoriaDTO): Observable<CategoriaDTO> {
    return this.http.post(this.api, categoria).pipe(
      catchError(this.HandleError),
      map(this.JsonToModel))

  }

  update(categoria: CategoriaDTO): Observable<CategoriaDTO> {
    return this.http.put(`${this.api}/${categoria.id}`, categoria).pipe(
      catchError(this.HandleError),
      map(() => categoria))

  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`).pipe(
      catchError(this.HandleError),
      map(() => null))
  }

  getAll(): Observable<CategoriaDTO[]> {
    return this.http.get(this.api).pipe(
      catchError(this.HandleError),
      map(this.JsonToModels))
  }
  getById(id: number): Observable<CategoriaDTO> {
    return this.http.get(`${this.api}/${id}`).pipe(
      catchError(this.HandleError),
      map(this.JsonToModel))
  }


  private HandleError(error: any): Observable<any> {
    console.log('erro nao req', error)

    return throwError(error);


  }

  private JsonToModels(jsonData: any[]): CategoriaDTO[] {
    const cats: CategoriaDTO[] = []
    jsonData.forEach(element => cats.push(element as CategoriaDTO))

    return cats
  }

  private JsonToModel(jsonData: any): CategoriaDTO {
    return jsonData as CategoriaDTO

  }
}
