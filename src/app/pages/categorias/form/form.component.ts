import { Component, OnInit, AfterContentChecked, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import toastr from 'toastr'
import { CategoriaDTO } from '../shared/categoria.dto';
import { CategoriaService } from '../shared/categoria.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterContentChecked {

  currentAction: string
  categoryForm: FormGroup
  pageTitle: string
  serverErrorMsgs: string[] = null
  submittedForm: boolean = false
  categoria: CategoriaDTO = new CategoriaDTO()

  constructor(private categoriaService: CategoriaService, private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction()
    this.buildForm()
    this.loadCategoria()


  }
  private loadCategoria() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoriaService.getById(+params.get('id'))))
        .subscribe((category) => {
          this.categoria = category
          this.categoryForm.patchValue(this.categoria) // bind para setar o form
        },
          error => alert('Error no server')
        )
    }

  }
  private buildForm() {
    this.categoryForm = this.formBuilder.group(
      {
        id: [null],
        name: [null, [Validators.required, Validators.minLength(2)]],
        description: [null]
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
      : this.pageTitle = `Editando - ${this.categoria.name || ''}`

  }

  submitForm() {
    this.submittedForm = true

    this.currentAction == 'new'
      ? this.create()
      : this.update()

  }
  update() {
    let _categoria: CategoriaDTO = Object.assign(new CategoriaDTO(), this.categoryForm.value)
    this.categoriaService.update(_categoria).subscribe(
      cat => this.sucess(cat),
      error => this.error(error)
    )
  }
  create() {
    let _categoria: CategoriaDTO = Object.assign(new CategoriaDTO(), this.categoryForm.value)
    this.categoriaService.create(_categoria).subscribe(
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
  sucess(cat: CategoriaDTO): void {
    toastr.success('Salvo com sucesso')
    this.router.navigateByUrl('categorias', { skipLocationChange: true })
      .then(() => this.router.navigate(['categorias', cat.id, 'edit']))
  }

}
