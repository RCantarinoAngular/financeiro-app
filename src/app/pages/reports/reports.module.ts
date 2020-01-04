import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportComponent } from './report/report.component';

//charts
import { ChartModule } from 'primeng/chart'

@NgModule({
  declarations: [ReportComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    ChartModule
  ]
})
export class ReportsModule { }
