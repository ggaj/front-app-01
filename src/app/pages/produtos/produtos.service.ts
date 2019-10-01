import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  uri = 'http://localhost:3333/produtos';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Produto[]>(`${this.uri}`);
  }

  getProduto(uid:string){
    return this.http.get<Produto>(`${this.uri}/${uid}`);
  }

  addProduct(uid, nome, preco, descricao) {
    const obj = {
      uid,
      nome,
      preco,
      descricao
    };
    return this.http.post(`${this.uri}`, obj);
  }

  removeProduto(uid: string){
    return this.http.delete(`${this.uri}/${uid}`);
  }

}
