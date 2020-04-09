import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService, private alertify: AlertifyService) {}

  model: any = {};
  @Output() cancleRegister = new EventEmitter();

  ngOnInit() {}

  register() {
    this.auth.register(this.model).subscribe(
      response => {
        this.alertify.success('Registerted successfully');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  cancel() {
    this.cancleRegister.emit(false);
    this.alertify.message('Register mode cancelled');
  }
}
