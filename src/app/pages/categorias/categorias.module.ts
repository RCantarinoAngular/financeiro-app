import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ListaComponent, FormComponent],
  imports: [
    CategoriasRoutingModule,
    SharedModule
  ],
  providers: []
})
export class CategoriasModule { }
