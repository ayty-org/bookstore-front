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
    var telephone: string = this.client.telephone;
    if(telephone.length != 11){
      this.clientService.showError('O campo telefone deve conter 11 dígitos');
      return false;
    }
    var email: string = this.client.email;
    if(email == '' || email.search('@') < 0 || email.search('.com') < 0 || email.indexOf('@') == 0 || email.split('@')[1].length < 5) {
      this.clientService.showError('O campo email deve conter um email válido!');
      return false;
    }
    return true;
  }
}
