import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { BookToSend } from '../bookToSend.model';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {


  book: BookToSend = {
    uuid: '',
    title: '',
    synopsis: '',
    isbn: '9788533302273',
    publicationYear: null,
    price: null,
    quantityInStock: null,
    authorName: '',
    categories: []
  }

  constructor(private router: Router, private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('uuid') as string;
    this.bookService.readByUuid(uuid).subscribe(book =>{
      this.book.uuid = book.uuid as string;
      this.book.title = book.title;
      this.book.synopsis = book.synopsis;
      this.book.isbn = book.isbn;
      this.book.price = book.price;
      this.book.quantityInStock = book.quantityInStock;
      this.book.authorName = book.authorName;
      var date: string[] = book.publicationYear.toString().split('T')[0].split('-');
      var htmlDate: HTMLInputElement = (document.getElementsByName('publicationYear')[0] as HTMLInputElement);
      htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`
    
      book.categories.forEach(category =>{
        var checkbox: HTMLInputElement = <HTMLInputElement>document.getElementById('category'+String(category.id));
        checkbox.checked = true;
      });
    });
  }

  updateBook(): void{
    var htmlDate: HTMLInputElement = (document.getElementsByName('publicationYear')[0] as HTMLInputElement);
    this.book.publicationYear = htmlDate.valueAsDate;

    var categoriesCheckbox: NodeList = document.getElementsByName('categories');
    categoriesCheckbox.forEach(input =>{
      if((<HTMLInputElement>input).checked){
        this.book.categories.push(Number((<HTMLInputElement>input).value));
      }
    });
    this.bookService.update(this.book).subscribe(()=>{
      this.bookService.showMessage("Livro atualizado com sucesso!");
      this.navigateToBooks();
    })
  }

  cancel(): void{
    this.navigateToBooks();
  }

  navigateToBooks(): void{
    this.router.navigateByUrl('/books');
  }

}
