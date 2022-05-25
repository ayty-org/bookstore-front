import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-read',
  templateUrl: './client-read.component.html',
  styleUrls: ['./client-read.component.css']
})
export class ClientReadComponent implements OnInit {

  clients: Client[];
  displayedColumns = ['name', 'email', 'telephone', 'age', 'gender', 'action'];


  pageEvent: PageEvent;
  totalElements: number;
  loading = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.readWithPagination(0,5).subscribe(clients => {
      this.getTotalElements();
      this.clients = clients;
    });
  }

  loadClients(): void {
    this.clientService.readWithPagination(this.pageEvent.pageIndex, this.pageEvent.pageSize).subscribe(clients => {
      this.getTotalElements();
      this.clients = clients;
    });
  }

  getTotalElements(): void{
     this.clientService.getTotalElements().subscribe(total => {
       this.totalElements = total;
     });
  }
}
