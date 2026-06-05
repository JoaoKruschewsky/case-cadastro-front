import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name = '';
  login = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    this.name = state?.name || '';
    this.login = state?.login || '';

    if (!this.name || !this.login) {
      this.router.navigate(['/login']);
    }

    
  }


  navigateLogin(): void {
    this.router.navigate(['/login']);
  }


}

