import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../../purchase.model';
import { PurchaseService } from '../../purchase.service';

@Component({
  selector: 'app-purchase-read-unique',
  templateUrl: './purchase-read-unique.component.html',
  styleUrls: ['./purchase-read-unique.component.css']
})
export class PurchaseReadUniqueComponent implements OnInit {

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
        for(var k=0; k<dates.length; k++){
          var date: string[] = purchase.bookDTOS[k].publicationYear.toString().split('T')[0].split('-');
          var htmlDate: HTMLInputElement = (<HTMLInputElement>dates[k]);
          htmlDate.value = `${date[0]}-${date[1]}-${date[2]}`
        }
      }, 1);
      var dates: NodeList = document.getElementsByName('publicationYear');
      });
  }

  backToPurchases(): void{
    this.router.navigateByUrl('/purchases');
  }

}
