import { Injectable, Injector } from '@angular/core';
import { CategoriaDTO } from './categoria.dto';
import { ServiceBase } from '../../../shared/services/serviceBase'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends ServiceBase<CategoriaDTO> {
  constructor(protected injector: Injector) {
    super('api/categorias', injector)
  }
}
