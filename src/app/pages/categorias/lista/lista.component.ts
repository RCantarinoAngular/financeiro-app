import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../shared/categoria.service';
import { CategoriaDTO } from '../shared/categoria.dto';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',

  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public categorias: CategoriaDTO[] = []
  constructor(private categoriaService: CategoriaService,
    private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.getAll()
  }

  delete(categoria) {

    let conf = confirm('Deseja excluir ?')
    if (conf) {
      this.spinner.show()
      this.categoriaService.delete(categoria.id)
        .subscribe(result => this.getAll(),
          error => alert('erro'))

    }
  }

  getAll() {
    this.spinner.show()

    this.categoriaService.getAll()
      .subscribe(itens => this.categorias = itens)

    this.spinner.hide()
  }

}
