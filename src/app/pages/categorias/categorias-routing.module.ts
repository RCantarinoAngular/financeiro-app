import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [

  {
    path: '', component: ListaComponent,
    data: {
      breadcrumb: 'Listar'
  }
  },

  {
    path: 'new', component: FormComponent
  },

  {
    path: ':id/edit', component: FormComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
