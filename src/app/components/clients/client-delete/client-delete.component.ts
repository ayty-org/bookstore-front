import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  client: Client = {
    name: '', 
    age: null,
    status: '',
    score: 0,
    scheduledAppointments: [],
    appointmentsConcluded: []
  };

  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    var uuid = this.route.snapshot.paramMap.get('uuid') as string;
    this.clientService.readByUuid(uuid).subscribe(client => this.client = client);
  }

  deleteClient(): void{
    if(this.canBeDeleted()){
      this.clientService.delete(this.client.uuid as string).subscribe(()=>{
        this.clientService.showMessage('Cliente excluído com sucesso!');
        this.navigateToClients();
      });
    }
  }

  cancel(): void{
    this.navigateToClients();
  }

  navigateToClients(): void {
    this.router.navigateByUrl('/clients');
  }

  canBeDeleted(): boolean{
    var b: boolean = true;
    this.clientService.existPurchaseWithClient(this.client.uuid as string).subscribe(exists => {
      if(exists){
        this.clientService.showError('Existe pelo menos uma compra com esse cliente, não é possível excluir!');
        b = false;
      }
    });
    return b;
  }
}
