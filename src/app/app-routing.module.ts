import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './components/books/book-create/book-create.component';
import { BookDeleteComponent } from './components/books/book-delete/book-delete.component';
import { BookUpdateComponent } from './components/books/book-update/book-update.component';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientDeleteComponent } from './components/clients/client-delete/client-delete.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { PurchaseCreateComponent } from './components/purchases/purchase-create/purchase-create.component';
import { PurchaseDeleteComponent } from './components/purchases/purchase-delete/purchase-delete.component';
import { PurchaseReadUniqueComponent } from './components/purchases/purchase-read/purchase-read-unique/purchase-read-unique.component';
import { PurchaseUpdateComponent } from './components/purchases/purchase-update/purchase-update.component';
import { BookCrudComponent } from './views/book-crud/book-crud.component';
import { ClientCrudComponent } from './views/client-crud/client-crud.component';
import { HomeComponent } from './views/home/home.component';
import { PurchaseCrudComponent } from './views/purchase-crud/purchase-crud.component';

const routes: Routes = [
  {
  path: "",
  component: HomeComponent
},
  {
    path:"clients",
    component: ClientCrudComponent
  },
  {
    path:"clients/create",
    component: ClientCreateComponent
  },
  {
    path:"clients/update/:uuid",
    component: ClientUpdateComponent
  },
  {
    path:"clients/delete/:uuid",
    component: ClientDeleteComponent
  },
  {
    path:"books",
    component: BookCrudComponent
  },
  {
    path:"books/create",
    component: BookCreateComponent
  },
  {
    path:"books/update/:uuid",
    component: BookUpdateComponent
  },
  {
    path:"books/delete/:uuid",
    component: BookDeleteComponent
  },
  {
    path:"purchases",
    component: PurchaseCrudComponent
  },
  {
    path:"purchases/create",
    component: PurchaseCreateComponent
  },
  {
    path:"purchases/update/:uuid",
    component: PurchaseUpdateComponent
  },
  {
    path:"purchases/delete/:uuid",
    component: PurchaseDeleteComponent
  },
  {
    path:"purchases/:uuid",
    component: PurchaseReadUniqueComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
