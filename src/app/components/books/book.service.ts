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
      verticalPosition: "top"
    })
  }


  createBook(book: BookToSend): Observable<Book>{
    return this.http.post<Book>(this.url, book);
  }
}
