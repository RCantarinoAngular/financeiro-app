import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FinanceiroDTO } from '../shared/financeiro.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { FinanceiroService } from '../shared/financeiro.service';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr'
import { CategoriaDTO } from '../../categorias/shared/categoria.dto';
import { CategoriaService } from '../../categorias/shared/categoria.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterContentChecked {

  currentAction: string
  FinancialForm: FormGroup
  categorias: Array<CategoriaDTO>
  pageTitle: string
  serverErrorMsgs: string[] = null
  submittedForm: boolean = false
  pt: any;
  financeiro: FinanceiroDTO = new FinanceiroDTO()
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    radix: ',',
    padFractionalZeros: true,  // if true, then pads zeros at end to the length of scale
    normalizeZeros: true,
  }


  constructor(private financeiroService: FinanceiroService, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder
    , private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.setCurrentAction()
    this.buildForm()
    this.loadFinanceiro()
    this.loadCategorias()

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Dom", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Do", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Today',
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
  private loadFinanceiro() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.financeiroService.getById(+params.get('id'))))
        .subscribe((category) => {
          this.financeiro = category
          this.FinancialForm.patchValue(this.financeiro) // bind para setar o form
        },
          error => alert('Error no server')
        )
    }

  }
  private buildForm() {
    this.FinancialForm = this.formBuilder.group(
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

  private setCurrentAction() {
    this.route.snapshot.url[0].path == 'new'
      ? this.currentAction = 'new'
      : this.currentAction = 'edit'

  }

  ngAfterContentChecked(): void {
    this.setPageTitle()

    //chamado apos que todos os evntos estiverem carregados
  }
  private setPageTitle() {
    this.currentAction == 'new'
      ? this.pageTitle = 'Cadastro de nova categoria'
      : this.pageTitle = `Editando - ${this.financeiro.name || ''}`

  }

  submitForm() {
    this.submittedForm = true

    this.currentAction == 'new'
      ? this.create()
      : this.update()

  }

  get TypeOptions(): Array<any> {
    return Object.entries(FinanceiroDTO.types).map(([v, t]) => {
      return {
        text: t,
        value: v
      }
    })
  }


  update() {
    let _categoria: FinanceiroDTO = Object.assign(new FinanceiroDTO(), this.FinancialForm.value)
    this.financeiroService.update(_categoria).subscribe(
      cat => this.sucess(cat),
      error => this.error(error)
    )
  }
  create() {
    let _categoria: FinanceiroDTO = Object.assign(new FinanceiroDTO(), this.FinancialForm.value)
    this.financeiroService.create(_categoria).subscribe(
      cat => this.sucess(cat),
      error => this.error(error)
    )
  }
  error(error: any): void {
    toastr.error('Erro ao processar requisicao')
    this.submittedForm = false

    if (error.status === 422)
      this.serverErrorMsgs = JSON.parse(error._body).errors
    else
      this.serverErrorMsgs = ['Servidor fora']


  }
  sucess(cat: FinanceiroDTO): void {
    toastr.success('Salvo com sucesso')
    this.router.navigateByUrl('categorias', { skipLocationChange: true })
      .then(() => this.router.navigate(['categorias', cat.id, 'edit']))
  }

}

