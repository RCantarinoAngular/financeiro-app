import { Component, Injector } from '@angular/core';
import { FinanceiroDTO } from '../shared/financeiro.dto';
import { FinanceiroService } from '../shared/financeiro.service';


import { BaseListComponent } from '../../../shared/components/list/baseList.component'

@Component({
  selector: 'app-financeiro-list',
  templateUrl: './financeiro-list.component.html',
  styleUrls: ['./financeiro-list.component.css']
})
export class FinanceiroListComponent extends BaseListComponent<FinanceiroDTO>  {


  constructor(protected financeiroService: FinanceiroService,
    protected injector: Injector
  ) {
    super(financeiroService, injector)
  }

}



