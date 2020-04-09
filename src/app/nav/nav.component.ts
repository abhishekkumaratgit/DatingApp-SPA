import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(public authService: AuthService,
              private alertity: AlertifyService) {}
  model: any = {};

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertity.success('Logged in successfully');
      },
      error => {
        this.alertity.error(error);
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Successfully logged out');
  }
}
