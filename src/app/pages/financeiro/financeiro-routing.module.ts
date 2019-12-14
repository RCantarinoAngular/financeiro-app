import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceiroListComponent } from './lista/financeiro-list.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '', component: FinanceiroListComponent
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
export class FinanceiroRoutingModule { }
