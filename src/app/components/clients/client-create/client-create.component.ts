import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
  }

  createClient(): void {
    this.clientService.showMessage('Cliente salvo com sucesso!');
  }

  cancel(): void {
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl("/clients");
  }

}
