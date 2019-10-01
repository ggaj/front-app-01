import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ProdutosComponent } from './produtos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EditarComponent } from './editar/editar.component';
import { AlertModule } from 'src/app/components/alert/alert.module';

@NgModule({
  declarations: [ProdutosComponent, CadastroComponent, EditarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AlertModule
  ]
})

export class ProdutosModule { }
