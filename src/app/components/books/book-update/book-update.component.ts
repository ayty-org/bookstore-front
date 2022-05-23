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

    if(this.fieldsAreCorrect()){
      this.bookService.update(this.book).subscribe(()=>{
        this.bookService.showMessage("Livro atualizado com sucesso!");
        this.navigateToBooks();
        this.book.categories = [];
        this.navigateToBooks();
      });
    }
    
  }

  cancel(): void{
    this.navigateToBooks();
  }

  navigateToBooks(): void{
    this.router.navigateByUrl('/books');
  }

  fieldsAreCorrect(): boolean{
    var title: string = this.book.title;
    if(title == '' || title.length < 3 || title.length > 60){
      this.bookService.showError('O campo título não pode estar vazio e deve conter entre 3 e 60 caracteres!');
      return false;
    }
    var synopsis: string = this.book.synopsis;
    if(synopsis == '' || synopsis.length < 3 || synopsis.length > 500){
      this.bookService.showError('O campo sinopse não pode estar vazio e deve conter entre 3 e 500 caracteres!');
      return false;
    }

    var isbn: string = this.book.isbn;
    if(isbn == '' || isbn.length !=13){
      this.bookService.showError('Informe um ISBN válido, deve conter 13 caracteres!');
      return false;
    }
    
    var publicationYear = this.book.publicationYear;
    if(publicationYear == null){
      this.bookService.showError('Informe uma data válida!');
      return false;
    }

    var price = this.book.price;
    if(price == null || price < 0){
      this.bookService.showError('O campo preço deve conter um valor positivo');
      return false;
    }

    var quantityInStock = this.book.quantityInStock
    if(quantityInStock == null || quantityInStock < 0){
      this.bookService.showError('O campo quantidade em estoque deve conter um valor positivo');
      return false;
    }

    var authorName: string = this.book.authorName;
    if(authorName == '' || authorName.length < 2 || authorName.length > 500){
      this.bookService.showError('O campo nome do autor não pode estar vazio e deve conter entre 2 e 60 caracteres!');
      return false;
    }

    var categories = this.book.categories;
    if(categories.length == 0){
      this.bookService.showError('O livro deve conter pelo menos uma categoria!');
      return false;
    }
    return true;
  }
}
