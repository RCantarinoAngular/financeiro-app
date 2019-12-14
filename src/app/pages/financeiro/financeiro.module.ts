import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { FinanceiroListComponent } from './lista/financeiro-list.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask'
@NgModule({
  declarations: [FinanceiroListComponent, FormComponent],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    CalendarModule, 
    IMaskModule
    
  ]
})
export class FinanceiroModule { }
