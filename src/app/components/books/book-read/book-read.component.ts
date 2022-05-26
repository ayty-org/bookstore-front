import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-read',
  templateUrl: './book-read.component.html',
  styleUrls: ['./book-read.component.css']
})
export class BookReadComponent implements OnInit {

  books: Book[];
  displayedColumns = ['details','title', 'isbn', 'quantityInStock', 'authorName', 'price', 'action' ];

  totalElements: number;
  pageEvent: PageEvent
 
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.readWithPagination(0,5).subscribe(books =>{
      this.getTotalElements();
      this.books = books;
    });
  }

  loadBooks(): void {
    this.bookService.readWithPagination(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(books => {
      this.getTotalElements();
      this.books = books;
    });
  }

  getTotalElements(): void{
    this.bookService.getTotalElements().subscribe(total => {
      this.totalElements = total;
    });
 }
}
