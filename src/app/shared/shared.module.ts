import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { ServerErrorMsgComponent } from './components/server-error-msg/server-error-msg.component';


@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormErrorComponent, ServerErrorMsgComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    PageHeaderComponent,
    RouterModule,
    FormErrorComponent,
    ServerErrorMsgComponent
  ]
})
export class SharedModule { }
