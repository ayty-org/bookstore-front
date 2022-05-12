import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';
import { PurchaseToSend } from '../purchaseToSend.model';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {


  private purchaseToSend: PurchaseToSend = {
    clientUuid: 'f049aa80-3359-4aff-831d-a23b9cb3d9cc',
    booksUuid: ['90c51bd3-875d-47ca-ba6e-d500c150549c', 'da215870-3042-48cb-b7bc-07132ff67fd2'],
    isCompleted: true
  }

  constructor(private router: Router, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
  }

  createPurchase(): void {
    this.purchaseService.create(this.purchaseToSend).subscribe(()=>{
      this.purchaseService.showMessage('Purchase salvo com sucesso!');
    });
  }

  cancel(): void {
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl("/clients");
  }
}
