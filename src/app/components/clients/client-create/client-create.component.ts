import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: Client = {
    name: '', 
    age: null,
    telephone: '',
    email: '',
    gender: ''
  };

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
  }

  createClient(): void {
    this.clientService.create(this.client).subscribe(()=>{
      this.clientService.showMessage('Cliente salvo com sucesso!');
      this.navigateToClients();
    });
  }

  cancel(): void {
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl("/clients");
  }

}
