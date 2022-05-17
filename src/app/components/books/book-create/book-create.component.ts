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

  book: BookToSend = {
    title: '',
    synopsis: '',
    isbn: '9788533302273',
    publicationYear: null,
    price: null,
    quantityInStock: null,
    authorName: '',
    categories: []
  }

  constructor(private router: Router, private bookService: BookService) { }

  ngOnInit(): void {
  }

  createBook(): void {
    var categoriesCheckbox: NodeList = document.getElementsByName('categories');
    categoriesCheckbox.forEach(input =>{
      if((<HTMLInputElement>input).checked){
        this.book.categories.push(Number((<HTMLInputElement>input).value));
      }
    });
    this.bookService.create(this.book).subscribe(()=>{
      this.bookService.showMessage('Book salvo com sucesso!');
    });
    this.book.categories = [];
    this.navigateToBooks;
  }

  cancel(): void {
    this.navigateToBooks();
  }

  navigateToBooks(): void{
    this.router.navigateByUrl("/books");
  }

}
