import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../books/book.model';
import { BookService } from '../../books/book.service';
import { Client } from '../../clients/client.model';
import { ClientService } from '../../clients/client.service';
import { PurchaseService } from '../purchase.service';
import { PurchaseToSend } from '../purchaseToSend.model';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {


  purchaseToSend: PurchaseToSend = {
    clientUuid: '',
    booksUuid: [],
    isCompleted: true
  }

  booksSaved: Book[];
  clientsSaved: Client[];

  constructor(private router: Router, private purchaseService: PurchaseService
    , private bookService: BookService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.bookService.read().subscribe(books=> this.booksSaved=books);
    this.clientService.read().subscribe(clients=> this.clientsSaved=clients);
  }

  createPurchase(): void {
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
        var quantity: number = Number((<HTMLInputElement>document.getElementById(uuid)).value);
        for(var k=0; k<quantity; k++){
          console.log('entrou!')
          this.purchaseToSend.booksUuid.push(uuid);
        }
      }
    });

    this.purchaseService.create(this.purchaseToSend).subscribe(()=>{
      this.purchaseService.showMessage('Compra salva com sucesso!');
    });

    this.purchaseToSend.clientUuid = '';
    this.purchaseToSend.booksUuid = [];
    this.navigateToPurchases();
  }

  cancel(): void {
    this.navigateToPurchases();
  }


  navigateToPurchases(): void{
    this.router.navigateByUrl("/purchases");
  }
}
