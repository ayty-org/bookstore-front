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
              (<HTMLInputElement>document.getElementById(book.uuid as string+'title')).value = book.title;
              (<HTMLInputElement>document.getElementById(book.uuid as string+'synopsis')).value = book.synopsis;
              (<HTMLInputElement>document.getElementById(book.uuid as string+'isbn')).value = book.isbn;
              (<HTMLInputElement>document.getElementById(book.uuid as string+'price')).value = String(book.price);
              (<HTMLInputElement>document.getElementById(book.uuid as string+'quantityInStock')).value = String(book.quantityInStock);
              (<HTMLInputElement>document.getElementById(book.uuid as string+'authorName')).value = book.authorName;
              var date: string[] = book.publicationYear.toString().split('T')[0].split('-');
              var htmlDate: HTMLInputElement = (<HTMLInputElement>document.getElementById(book.uuid as string+'date'));
              htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`
            }else{
              (<HTMLInputElement>document.getElementById('form')).removeChild(bookEquals[k]);
              var quantity =(<HTMLInputElement>document.getElementById(book.uuid as string+'quantity'));
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

}
