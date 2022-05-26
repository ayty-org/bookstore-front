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
      let uuid = this.route.snapshot.paramMap.get('uuid') as string;
      this.purchaseService.readByUuid(uuid).subscribe(purchase => {
        this.purchaseToSend.clientUuid = purchase.clientDTO.uuid as string;
        purchase.bookDTOS.forEach(bookDTO => this.purchaseToSend.booksUuid.push(bookDTO.uuid as string));
      });
      this.clientService.read().subscribe(clients=>{
        this.clientsSaved = clients;
      });

      this.bookService.read().subscribe(books => {
        this.booksSaved = books;
      })
  }

  hasBookandQuantity(book: Book): [boolean, number]{
    let quant = 0;
    for(let k=0; k<this.purchaseToSend.booksUuid.length; k++){
      if(this.purchaseToSend.booksUuid[k] == book.uuid){
        quant++;
      }
    }
    if(quant > 0){
      return [true, quant];
    }else{
      return [false, 1];
    }
  }

  convertDate(date: Date): string {
    return date.toString().split('T')[0];
  }

  updatePurchase(): void{
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

    if(selectClient){
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
          var quantity: number = Number((<HTMLInputElement>document.getElementById('quantity'+uuid)).value);
          for(var k=0; k<quantity; k++){
            this.purchaseToSend.booksUuid.push(uuid);
          }
        }
      });
      
      if(this.purchaseToSend.booksUuid.length == 0){
        this.purchaseService.showError('Pelo menos um livro deve ser comprado!')
      }else{
        this.purchaseService.update(this.purchaseToSend).subscribe(()=>{
          this.purchaseService.showMessage('Compra Atualizada com sucesso!');
          this.navigateToPurchases();
          this.purchaseToSend.clientUuid = '';
          this.purchaseToSend.booksUuid = [];
        });
      } 
    }
  }
}

  cancel(): void{
    this.navigateToPurchases();
  }

  navigateToPurchases(): void{
    this.router.navigateByUrl('/purchases');
  }

}