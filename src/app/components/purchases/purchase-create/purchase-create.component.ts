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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
/*

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
    this.clientService.read().subscribe(clients=> this.clientsSaved=clients);
    this.bookService.read().subscribe(books=> {
      this.booksSaved=books;
    });
  }

  convertDate(date: Date): string {
    return date.toString().split('T')[0];
  }

  createPurchase(): void {
    this.purchaseToSend.clientUuid = '';
    this.purchaseToSend.booksUuid = [];

    var clientsRadio: NodeList = document.getElementsByName('radioClients');

    var selectClient = false;
    clientsRadio.forEach(radio =>{
      if((<HTMLInputElement>radio).checked){
        this.purchaseToSend.clientUuid = (<HTMLInputElement>radio).id;
        selectClient = true;
      }
    });
    if(selectClient == false){
      this.purchaseService.showError('Um cliente deve ser selecionado!');
    }else{
      var booksCheckbox: NodeList = document.getElementsByName('bookCheckbox');
      booksCheckbox.forEach(checkbox =>{
        if((<HTMLInputElement>checkbox).checked){
          var uuid = (<HTMLInputElement>checkbox).id;
          var quantity: number = Number((<HTMLInputElement>document.getElementById(uuid+'quantity')).value);
          for(var k=0; k<quantity; k++){
            this.purchaseToSend.booksUuid.push(uuid);
          }
        }
      });
      
      if(this.purchaseToSend.booksUuid.length == 0){
        this.purchaseService.showError('Pelo menos um livro deve ser comprado!')
      }else{
        this.purchaseService.create(this.purchaseToSend).subscribe(()=>{
          this.purchaseService.showMessage('Compra salva com sucesso!');
          this.navigateToPurchases();
          this.purchaseToSend.clientUuid = '';
          this.purchaseToSend.booksUuid = [];
        });
      }  
    }
  }

  cancel(): void {
    this.navigateToPurchases();
  }

  navigateToPurchases(): void{
    this.router.navigateByUrl("/purchases");
  }
  */
}
