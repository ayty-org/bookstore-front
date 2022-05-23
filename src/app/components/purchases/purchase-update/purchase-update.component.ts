import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../books/book.model';
import { BookService } from '../../books/book.service';
import { Client } from '../../clients/client.model';
import { ClientService } from '../../clients/client.service';
import { PurchaseService } from '../purchase.service';
import { PurchaseToSend } from '../purchaseToSend.model';

@Component({
  selector: 'app-purchase-update',
  templateUrl: './purchase-update.component.html',
  styleUrls: ['./purchase-update.component.css']
})
export class PurchaseUpdateComponent implements OnInit {

  purchaseToSend: PurchaseToSend = {
    clientUuid: '',
    booksUuid: [],
    isCompleted: true
  }

  booksSaved: Book[];
  clientsSaved: Client[];


  constructor(private router: Router, private purchaseService: PurchaseService
    , private bookService: BookService, private clientService: ClientService, private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      this.bookService.read().subscribe(books=> {
        this.booksSaved=books;
        books.forEach(book =>{
          setTimeout(()=>{
            var date: string[] = book.publicationYear.toString().split('T')[0].split('-');
            var htmlDate: HTMLInputElement = (<HTMLInputElement>document.getElementById(book.uuid as string+'date'));
            htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`;
          },1)
          
        });
       
      });
      this.clientService.read().subscribe(clients=> this.clientsSaved=clients);

      const uuid: string = this.route.snapshot.paramMap.get('uuid') as string;
      this.purchaseService.readByUuid(uuid).subscribe(purchase => {
        this.purchaseToSend.uuid = purchase.uuid;
        this.purchaseToSend.clientUuid = purchase.clientDTO.uuid as string;
        purchase.bookDTOS.forEach(book => this.purchaseToSend.booksUuid.push(book.uuid as string));


        (<HTMLInputElement>document.getElementById(purchase.clientDTO.uuid as string)).checked = true;

        purchase.bookDTOS.forEach(bookDTO => {
          let checkbox: HTMLInputElement = <HTMLInputElement>document.getElementById(bookDTO.uuid as string);
          if(checkbox.checked){
            let quantity: HTMLInputElement = <HTMLInputElement>document.getElementById('quantity'+bookDTO.uuid as string);
            quantity.value = String((Number(quantity.value)+1));
          }else{
            checkbox.checked = true;
          }
        });
      });
  }

  updatePurchase(): void{
    this.purchaseToSend.clientUuid = '';
    this.purchaseToSend.booksUuid = [];
    
    var clientsRadio: NodeList = document.getElementsByName('clientsRadio');
    clientsRadio.forEach(radio =>{
      if((<HTMLInputElement>radio).checked){
        this.purchaseToSend.clientUuid = (<HTMLInputElement>radio).value;
      }
    });

    var booksCheckbox: NodeList = document.getElementsByName('booksCheckbox');
    booksCheckbox.forEach(checkbox =>{
      if((<HTMLInputElement>checkbox).checked){
        var uuid = (<HTMLInputElement>checkbox).value;
        var quantity: number = Number((<HTMLInputElement>document.getElementById('quantity'+uuid)).value);
        for(var k=0; k<quantity; k++){
          this.purchaseToSend.booksUuid.push(uuid);
        }
      }
    });

    this.purchaseService.update(this.purchaseToSend).subscribe(()=>{
      this.purchaseService.showMessage('Compra atualizada com sucesso!');

      console.log(this.purchaseToSend.booksUuid.length)

      this.navigateToPurchases();
    })
  }

  cancel(): void{
    this.navigateToPurchases();
  }

  navigateToPurchases(): void{
    this.router.navigateByUrl('/purchases');
  }

}
