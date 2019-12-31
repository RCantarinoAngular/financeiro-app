import { ModelBase } from '../models/modelBase.dto'
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { Injector } from '@angular/core'

export abstract class ServiceBase<T extends ModelBase> {

    protected http: HttpClient
    constructor(protected apiPath: string,
        protected injector: Injector) {
        this.http = injector.get(HttpClient)
    }

    create(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            catchError(this.HandleError),
            map(this.JsonToModel))

    }

    update(resource: T): Observable<T> {
        return this.http.put(`${this.apiPath}/${resource.Id}`, resource).pipe(
            catchError(this.HandleError),
            map(() => resource))

    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.apiPath}/${id}`).pipe(
            catchError(this.HandleError),
            map(() => null))
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.HandleError),
            map(this.JsonToModels))
    }
    getById(id: number): Observable<T> {
        return this.http.get(`${this.apiPath}/${id}`).pipe(
            catchError(this.HandleError),
            map(this.JsonToModel))
    }

    protected HandleError(error: any): Observable<any> {
        console.log('erro nao req', error)

        return throwError(error);
    }

    protected JsonToModels(jsonData: any[]): T[] {
        const recs: T[] = []
        jsonData.forEach(element => recs.push(element as T))

        return recs
    }

    protected JsonToModel(jsonData: any): T {
        return jsonData as T

    }

}