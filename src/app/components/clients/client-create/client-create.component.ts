import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientRequest } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: ClientRequest = {
    name: '', 
    age: null,
  };

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
  }

  createClient(): void {
    if(this.fieldsAreCorrect()){
      this.clientService.create(this.client).subscribe(()=>{
        this.clientService.showMessage('Cliente salvo com sucesso!');
        this.navigateToClients();
      });
    } 
  }

  cancel(): void {
    this.navigateToClients();
  }

  navigateToClients(): void{
    this.router.navigateByUrl("/clients");
  }

  fieldsAreCorrect(): boolean{
    var name: string = this.client.name;
    if(name == '' || name.length < 3 || name.length > 40){
      this.clientService.showError('O campo nome não pode estar vazio e deve conter entre 3 e 40 caracteres!');
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
