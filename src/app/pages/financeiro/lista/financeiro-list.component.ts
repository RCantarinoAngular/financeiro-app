import { Component, OnInit } from '@angular/core';
import { FinanceiroDTO } from '../shared/financeiro.dto';
import { FinanceiroService } from '../shared/financeiro.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-financeiro-list',
  templateUrl: './financeiro-list.component.html',
  styleUrls: ['./financeiro-list.component.css']
})
export class FinanceiroListComponent implements OnInit {

  public financials: FinanceiroDTO[] = []
  constructor(private financeiroService: FinanceiroService,
    private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.getAll()
  }

  delete(financeiro) {

    let conf = confirm('Deseja excluir ?')
    if (conf) {
      this.spinner.show()
      this.financeiroService.delete(financeiro.id)
        .subscribe(result => this.getAll(),
          error => alert('erro'))

    }
  }

  getAll() {
    this.spinner.show()

    this.financeiroService.getAll()
      .subscribe(itens => this.financials = itens)

    this.spinner.hide()
  }

}



