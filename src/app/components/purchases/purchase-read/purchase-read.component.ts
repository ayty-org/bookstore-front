import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Purchase } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-read',
  templateUrl: './purchase-read.component.html',
  styleUrls: ['./purchase-read.component.css']
})
export class PurchaseReadComponent implements OnInit {

  purchases: Purchase[];
  displayedColumns = ['details','clientName', 'clientEmail', 'booksQuantity', 'amount', 'purchaseDate', 'action'];

  pageEvent: PageEvent;
  totalElements: number;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.read(0,5).subscribe(purchases=>{
      this.getTotalElements();
      this.purchases = purchases;
    })
  }

  loadPurchases(): void {
    this.purchaseService.read(this.pageEvent.pageIndex, this.pageEvent.pageSize)
      .subscribe(purchases => {
      this.getTotalElements();
      this.purchases = purchases;
    });
  }

  getTotalElements(): void {
    this.purchaseService.getTotalElements().subscribe(total => this.totalElements = total);
  }

  getBooksQuantity(purchase: Purchase): number{
    return purchase.bookDTOS.length;
  }


}
