import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  book: Book = {
    title: '',
    synopsis: '',
    isbn: '',
    publicationYear: new Date(),
    price: 0,
    quantityInStock: 0,
    authorName: '',
    categories: []
  };

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
    var htmlDate: HTMLInputElement = (<HTMLInputElement>document.getElementById('date'));
    htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`;
  }

  deleteBook(): void{
    if(this.canBeDeleted()){
      this.bookService.delete(this.book.uuid as string).subscribe(()=>{
        this.bookService.showMessage('Livro excluído com sucesso!');
        this.navigateToBooks();
      });
    }
  }

  cancel(): void{
    this.navigateToBooks();
  }

  navigateToBooks():void {
    this.router.navigateByUrl('/books');
  }

  canBeDeleted(): boolean{
    var b: boolean = true;
    this.bookService.existPurchaseWithBook(this.book.uuid as string).subscribe(exists => {
      if(exists){
        this.bookService.showError('Este livro está em pelo menos uma compra, não é possível excluir!');
        b = false;
      }
    })
    return b;
  }
}
