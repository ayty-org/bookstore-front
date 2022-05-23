import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { BookToSend } from './bookToSend.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url: string = 'http://localhost:9191/v1/books';

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

  create(book: BookToSend): Observable<Book>{
    return this.http.post<Book>(this.url, book);
  }

  read(): Observable<Book[]>{
    return this.http.get<Book[]>(this.url);
  }

  readByUuid(uuid: string): Observable<Book>{
    return this.http.get<Book>(`${this.url}/${uuid}`);
  }

  update(book: BookToSend): Observable<Book>{
    return this.http.put<Book>(`${this.url}/${book.uuid}`, book);
  }

  delete(uuid: string): Observable<Book>{
    return this.http.delete<Book>(`${this.url}/${uuid}`);
  }
  
  existPurchaseWithBook(uuid: string): Observable<boolean>{
    return this.http.get<boolean>('http://localhost:9191/v1/purchases/existByBook/'+uuid);
  }
  
}
