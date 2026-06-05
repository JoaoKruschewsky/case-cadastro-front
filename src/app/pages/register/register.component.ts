import { Component } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { RegisterUser } from 'src/app/models/register.model';
import { LoginResponse } from 'src/app/models/response.model';
import { ApiService } from 'src/app/shared/service/register/api.service';
import { cepService } from 'src/app/shared/service/viacep/viacep.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsUtil } from 'src/app/shared/utils/validation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private apiService: ApiService, private cepService: cepService, private snackBar: MatSnackBar, private router:Router) { }

  today: string = new Date().toLocaleDateString('en-CA', {
  timeZone: 'America/Sao_Paulo'
});  cep = '';
  cepFound = false;
  showModal = false;
loginGerado = '';
countdown = 10;
showErrorModal = false;
errorMessage = '';


  address: Address = {
    logradouro: '',
    bairro: '',
    estado: '',
    uf: ''
  }

  user: RegisterUser = {
    name: '',
    cpf: '',
    dataNascimento: '',
    cep: '',
    email: '',
    endereco: this.address
  }
showError(message: string): void {
  this.errorMessage = message;
  this.showErrorModal = true;
}

pageLogin(): void {
  this.router.navigate(['/login'])
}

  save(): void {
    if (
      !this.user.name ||
      !this.user.email ||
      !this.user.cpf ||
      !this.user.dataNascimento ||
      !this.cep ||
      !this.address.logradouro ||
      !this.address.estado ||
      !this.address.logradouro ||
      !this.address.uf
    ) {
      this.showError('Preencha todos os campos');
      return;
    }

if (!ValidatorsUtil.validateCPF(this.user.cpf)) {
    this.showError("CPF inválido");
    return;
  }

  if (!ValidatorsUtil.validateCEP(this.cep)) {
    this.showError("CEP inválido");
    return;
  }

  if (!ValidatorsUtil.validateEmail(this.user.email)) {
    this.showError("Email inválido");
    return;
  }
  if (!ValidatorsUtil.validateDate(this.user.dataNascimento)) {
  this.showError("Data de nascimento inválida ou futura");
  return;
}
this.user.dataNascimento = ValidatorsUtil.formatDate(this.user.dataNascimento)
if (!this.user.name.includes(' ')) {
  this.showError("Digite nome e sobrenome");
  return;
}
this.user.name = ValidatorsUtil.cleanName(this.user.name);


    this.user.cpf = this.user.cpf.replace(/\D/g, '');
    this.cep = this.cep.replace(/\D/g, '')
    this.user.cep = this.cep
    this.user.endereco = this.address
    this.apiService.register(this.user)
      .subscribe({
        next: (resp) => {
      this.loginGerado = resp.data.loginResponse;
      this.showModal = true;
      this.countdown = 10;

      const interval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(interval);
          this.showModal = false;
          this.router.navigate(['/login']);
        }
      }, 1000);
    },

        error: (err) => {
          this.showError(err.error?.detail || 'Erro ao cadastrar usuário');

        }
      }
      )
  }

  buscarCep(): void {

    this.cepFound = false;

    this.cepService.buscarCep(this.cep).subscribe
      ({
        next: (resp) => {
          if (resp.erro) {
            this.address = {
              logradouro: '',
              bairro: '',
              estado: '',
              uf: ''
            }
            this.cepFound = false
            this.showError("Cep inválido")
            return; 
            
          }
          this.cepFound = true
         this.address.logradouro = resp.logradouro;
this.address.bairro = resp.bairro;
this.address.estado = resp.localidade;
this.address.uf = resp.uf;

        },
        error: (err) => {
          this.cepFound = false

          this.showError("Cep nao encontrado")
          }
      })
  }
}
