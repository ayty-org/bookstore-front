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
    status: '',
    score: 0,
    scheduledAppointments: [],
    appointmentsConcluded: []
  };

  constructor(private router: Router, private clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const uuid: string = this.route.snapshot.paramMap.get('uuid') as string;
    this.clientService.readByUuid(uuid).subscribe(client => this.client = client);
  }

  updateClient(): void{
    if(this.fieldsAreCorrect()){
      this.clientService.update(this.client).subscribe(()=>{
        this.clientService.showMessage('Cliente atualizado com sucesso!');
        this.navigateToClients();
      });
    }
  }

  cancel(): void{
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl('/clients');
  }

  fieldsAreCorrect(): boolean{
    var name: string = this.client.name;
    if(name == '' || name.length < 3 || name.length > 40){
      this.clientService.showError('O campo nome não pode ser nulo e deve conter entre 3 e 40 caracteres!');
      return false;
    }
    var age = this.client.age;
    if(age == null || age < 1 || age > 120){
      this.clientService.showError('O campo idade deve conter um número inteiro entre 1 e 120');
      return false;
    }
     return true;
  }
}
