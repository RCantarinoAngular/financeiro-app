import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms'



@Component({
  selector: 'app-form-error',
  template: `
    <p class='text-danger'>
        {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-error.component.css']
})
export class FormErrorComponent implements OnInit {


  @Input('form-control') formControl: FormControl
  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if (this.showErrorMessage()) {
      return this.getErrorMessage()
    }
    else {
      return null
    }
  }

  private showErrorMessage(): boolean {
    return this.formControl.invalid && this.formControl.touched
  }

  getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'dado abrigatorio'
    }
    if (this.formControl.errors.minlength) {
      const min = this.formControl.errors.minlength.requiredLength
      return `deve ter no minimo ${min} caracteres`
    }
    if (this.formControl.errors.email) {
      return 'formato de email invalido'
    }
  }

}
