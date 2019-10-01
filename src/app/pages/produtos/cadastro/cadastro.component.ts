import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProdutosService } from '../produtos.service';
import { AlertService } from 'src/app/components/alert/alert.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroProdutoForm: FormGroup;
  enviado = false;
  loading = false;

  constructor(
    private cadastroProdutoBuilder: FormBuilder,
    private router: Router,
    private ps: ProdutosService,
    private as: AlertService,
  ) { }

  ngOnInit() {
    this.cadastroProdutoForm = this.cadastroProdutoBuilder.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      descricao: ['']
    });

  }

  salvarProdutos() {

    this.enviado = true;
    this.as.clear();

    if (this.cadastroProdutoForm.invalid) {
      return;
    }

    this.loading = true;
    const {nome, preco, descricao} = this.cadastroProdutoForm.value;
    this.ps.addProduct(undefined, nome, preco, descricao).subscribe(_ => {
      this.cadastroProdutoForm.reset();
      this.loading = false;
      this.router.navigate(['produtos']);
    });

  }
}
