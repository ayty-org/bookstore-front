import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {

  constructor(private router: Router, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
  }

  createPurchase(): void {
    this.purchaseService.showMessage('Purchase salvo com sucesso!');
  }

  cancel(): void {
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl("/clients");
  }
}
