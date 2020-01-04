import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FinanceiroDTO } from '../shared/financeiro.dto';

import { FinanceiroService } from '../shared/financeiro.service';

import { CategoriaDTO } from '../../categorias/shared/categoria.dto';
import { CategoriaService } from '../../categorias/shared/categoria.service';
import { BaseFormComponent } from 'src/app/shared/components/form/baseForm.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends BaseFormComponent<FinanceiroDTO> implements OnInit {

  categorias: Array<CategoriaDTO>
  submittedForm: boolean = false
  pt: any;
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    radix: ',',
    padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,
  }


  constructor(protected financeiroService: FinanceiroService,
    protected categoriaService: CategoriaService,
    protected injector: Injector) {
    super(injector, new FinanceiroDTO, financeiroService, FinanceiroDTO.fromJson)
  }

  ngOnInit() {

    this.loadCategorias()
    super.ngOnInit()

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Dom", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Do", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Hoje',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };


  }
  private loadCategorias() {
    this.categoriaService.getAll().subscribe(
      cats => this.categorias = cats
    )
  }



  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group(
      {
        id: [null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null],
        type: ["expense", [Validators.required]],
        date: [null, [Validators.required]],
        amount: [null, [Validators.required]],
        paid: [true, [Validators.required]],
        categoryId: [null, [Validators.required]],
      }
    )
  }

  get TypeOptions(): Array<any> {
    return Object.entries(FinanceiroDTO.types).map(([v, t]) => {
      return {
        text: t,
        value: v
      }
    })
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo lancamento";
  }

  protected editionPageTitle(): string {
    const entryName = this.resource.name || "";
    return "Editando Lancamento: " + entryName;
  }


}

