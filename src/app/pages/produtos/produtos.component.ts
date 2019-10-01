import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  enviado = false;
  produtos: Produto[] = [];
  closeResult: string;

  constructor(
    private ps: ProdutosService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.todosProdutos();
  }

  open(content, uid: string) {
    this.modalService.open(content, { centered: true }).result.then((result) => {
      if (result) {
        this.removeProduto(uid);
      }
    }, (reason) => {
      this.getDismissReason(reason) ;
    });
  }

  private todosProdutos() {
    this.ps
      .getAll()
      .subscribe(produtos => this.produtos = produtos )
  }

  private removeProduto(uid: string){
    this.ps.removeProduto(uid).subscribe(_ => this.todosProdutos());
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
