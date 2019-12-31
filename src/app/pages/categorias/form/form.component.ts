import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms'
import { CategoriaDTO } from '../shared/categoria.dto';
import { CategoriaService } from '../shared/categoria.service';
import { BaseFormComponent } from 'src/app/shared/components/form/baseForm.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends BaseFormComponent<CategoriaDTO>{

  constructor(protected categoryService: CategoriaService, protected injector: Injector) { 
    super(injector, new CategoriaDTO(), categoryService, CategoriaDTO.fromJson)
  }


  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }


  protected creationPageTitle(): string {
    return "Cadastro de Nova Categoria";
  }

  protected editionPageTitle(): string {
    const categoryName = this.resource.name || "";
    return "Editando Categoria: " + categoryName;
  }
}