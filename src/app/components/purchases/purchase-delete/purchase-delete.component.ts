import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-delete',
  templateUrl: './purchase-delete.component.html',
  styleUrls: ['./purchase-delete.component.css']
})
export class PurchaseDeleteComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
/*
  purchase: Purchase = {
    clientDTO: {
      name: '', 
      age: null,
      telephone: '',
      email: '',
      gender: ''
    },
    bookDTOS: [],
    amount: 0,
    purchaseDate: new Date,
    isCompleted: true
  }

  constructor(private purchaseService: PurchaseService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('uuid') as string;
    this.purchaseService.readByUuid(uuid).subscribe(purchase => {
      this.purchase = purchase;
      
      setTimeout(()=>{
        purchase.bookDTOS.forEach(book => {
          var bookEquals = document.getElementsByName(book.uuid as string);
          for(var k = 0; k<bookEquals.length; k++){
            if(k == 0){
              var date: string[] = book.publicationYear.toString().split('T')[0].split('-');
              var htmlDate: HTMLInputElement = (<HTMLInputElement>document.getElementById(book.uuid as string+'date'));
              htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`
            }else{
              (<HTMLInputElement>document.getElementById('form')).removeChild(bookEquals[k]);
              var quantity =(<HTMLInputElement>document.getElementById(book.uuid as string+'date'));
              quantity.value = `${(Number(quantity.value)+1)}`;
            }
          }
        })
      }, 1);
      });
  }

  deletePurchase(): void{
    this.purchaseService.delete(this.purchase.uuid as string).subscribe(()=>{
      this.purchaseService.showMessage('Compra excluída com sucesso!');
      this.navigateToPurchases();
    })
  }

  cancel(): void{
    this.navigateToPurchases();
  }

  navigateToPurchases(): void{
    this.router.navigateByUrl('/purchases');
  }
*/
}
