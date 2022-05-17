import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {

  client: Client = {
    name: '', 
    age: null,
    telephone: '',
    email: '',
    gender: ''
  };

  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('uuid') as string;
    this.clientService.readByUuid(uuid).subscribe(client => this.client = client);
  }

  updateClient(): void{
    this.clientService.update(this.client).subscribe(()=>{
      this.clientService.showMessage('Cliente atualizado com sucesso!');
      this.navigateToClients();
    });
  }

  cancel(): void{
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl('/clients');
  }

}
