import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
//Quando o backend real chegar, remover essas linhas e arquivos.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [NavBarComponent],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NavBarComponent
    
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule, 
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    NgxSpinnerModule,
    RouterModule
   
  ]
})
export class CoreModule { }
