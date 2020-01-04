import { Component, Injector } from '@angular/core';
import { CategoriaService } from '../shared/categoria.service';
import { CategoriaDTO } from '../shared/categoria.dto';

import { BaseListComponent } from '../../../shared/components/list/baseList.component'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent extends BaseListComponent<CategoriaDTO>  {


  constructor(private categoriaService: CategoriaService,
    protected injector: Injector
  ) {
    super(categoriaService, injector)
  }
}
