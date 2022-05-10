import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookToSend } from '../bookToSend.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  private bookToSend: BookToSend = {
    title: 'Jaburaca the book ',
    synopsis: 'grande jaburasca',
    isbn: '9788533302273',
    publicationYear: new Date(),
    price: 50.50,
    quantityInStock: 3,
    authorName: 'Xerlong',
    categories: [1,2,3,4]
  }

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
  }

  createBook(): void {
    this.bookService.createBook(this.bookToSend).subscribe(()=>{
      this.bookService.showMessage('Book salvo com sucesso!');
    });
  }

  cancel(): void {
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl("/clients");
  }

}
