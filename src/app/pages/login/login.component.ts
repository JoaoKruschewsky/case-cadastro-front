import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseUser } from 'src/app/models/response.model';
import { ApiService } from 'src/app/shared/service/register/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router, private apiService:ApiService) {

  }

  loginData = ''
showErrorModal = false;
errorMessage = '';
  navigateRegister(): void {
    this.router.navigate(['./register'])
  }

login(): void {
  this.apiService.login(this.loginData).subscribe({
    next: (resp) => {
      this.router.navigate(['/profile'], {
        state: { name: resp.data.name, login: resp.data.login }
      });
    },
    error: (err) => {
          this.showError(err.error?.detail);
    }
  });
}

  showError(message: string): void {
  this.errorMessage = message;
  this.showErrorModal = true;
}
}
