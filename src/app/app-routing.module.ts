import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: 'categorias', 
    loadChildren: './pages/categorias/categorias.module#CategoriasModule'
  },
  {
    path: 'lancamentos', 
    loadChildren: './pages/financeiro/financeiro.module#FinanceiroModule'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
