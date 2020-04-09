import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) {}

  model: any = {};
  @Output() cancleRegister = new EventEmitter();

  ngOnInit() {}

  register() {
    this.auth.register(this.model).subscribe(
      response => {
        console.log('registered successfully');
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.cancleRegister.emit(false);
    console.log('send cancle register');
  }
}
