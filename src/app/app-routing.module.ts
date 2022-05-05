import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    path:"books",
    component: BookCrudComponent
  },
  {
    path:"purchases",
    component: PurchaseCrudComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
