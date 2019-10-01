import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../produtos.service';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  produto: Produto;
  editForm: FormGroup;
  enviado = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ps: ProdutosService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('uid')) {
        this.router.navigate(['produtos']);
        return;
      }
      this.ps
        .getProduto(paramMap.get('uid'))
        .subscribe(produto => {
          this.produto = produto;
          this.editForm = this.formBuilder.group({
            uid: [this.produto.uid],
            nome: [this.produto.nome, Validators.required],
            preco: [this.produto.preco, Validators.required],
            descricao: [this.produto.descricao]
          });
        });
    });
  }

  get f() {
    return this.editForm.controls;
  }

  async salvarProdutos() {

    this.enviado = true;
    if (this.editForm.invalid) {
      return;
    }

    const {uid, nome, preco, descricao} = this.editForm.value;
    this.ps
      .addProduct(uid, nome, preco, descricao)
      .subscribe(_ => {
        this.editForm.reset();
        this.router.navigate(['produtos']);
      });
  }

}
