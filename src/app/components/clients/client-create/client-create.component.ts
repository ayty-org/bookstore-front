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
