import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './pages/produtos/cadastro/cadastro.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { EditarComponent } from './pages/produtos/editar/editar.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'produtos',             component: ProdutosComponent },
  { path: 'produtos/cadastro',    component: CadastroComponent },
  { path: 'produtos/:uid/editar', component: EditarComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
