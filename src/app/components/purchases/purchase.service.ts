import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Purchase } from './purchase.model';
import { PurchaseToSend } from './purchaseToSend.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private url: string = 'http://localhost:9191/v1/purchases'

  constructor(private snackBar: MatSnackBar, private http: HttpClient)  { }


  showMessage(msg: string){
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-success']
    });
  }

  showError(msg: string){
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['msg-error']
    });
  }

  create(purchase: PurchaseToSend): Observable<Purchase>{
    return this.http.post<Purchase>(this.url, purchase);
  }

  read(): Observable<Purchase[]>{
    return this.http.get<Purchase[]>(this.url+"?page=0&size=5&sort=purchaseDate");
  }

  readByUuid(uuid: string): Observable<Purchase>{
    return this.http.get<Purchase>(`${this.url}/${uuid}`);
  }

  update(purchase: PurchaseToSend): Observable<Purchase>{
    return this.http.put<Purchase>(`${this.url}/${purchase.uuid}`, purchase);
  }

  delete(uuid: string): Observable<Purchase>{
    return this.http.delete<Purchase>(`${this.url}/${uuid}`);
  }

  
}
