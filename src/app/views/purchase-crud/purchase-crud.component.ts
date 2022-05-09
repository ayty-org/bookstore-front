import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-crud',
  templateUrl: './purchase-crud.component.html',
  styleUrls: ['./purchase-crud.component.css']
})
export class PurchaseCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToPurchaseCreate(): void{
    this.router.navigateByUrl("/purchases/create")
  }

}
