import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../book.model';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-read-unique',
  templateUrl: './book-read-unique.component.html',
  styleUrls: ['./book-read-unique.component.css']
})
export class BookReadUniqueComponent implements OnInit {


  book: Book ={
    title: '',
    synopsis: '',
    isbn: '',
    publicationYear: new Date(),
    price: 0,
    quantityInStock: 0,
    authorName: '',
    categories: []
  }

  
  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var uuid = this.route.snapshot.paramMap.get('uuid') as string;
    this.bookService.readByUuid(uuid).subscribe(book => {
      this.book = book;
      this.showFormatedDate(book);
    });

  }
  showFormatedDate(book: Book): void {
    var date: string[] = book.publicationYear.toString().split('T')[0].split('-');
    var htmlDate: HTMLInputElement = (<HTMLInputElement>document.getElementsByName('publicationYear')[0]);
    htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`;
  }

  backToBooks(): void {
    this.router.navigateByUrl('/books');
  }

}
