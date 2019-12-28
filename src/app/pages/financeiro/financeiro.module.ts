import { NgModule } from '@angular/core';
import {SharedModule } from '../../shared/shared.module'

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { FinanceiroListComponent } from './lista/financeiro-list.component';
import { FormComponent } from './form/form.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask'
@NgModule({
  declarations: [FinanceiroListComponent, FormComponent],
  imports: [
   
    FinanceiroRoutingModule,
    SharedModule,
    CalendarModule, 
    IMaskModule
    
  ]
})
export class FinanceiroModule { }
