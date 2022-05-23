import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-empleado-page',
  templateUrl: './login-empleado-page.page.html',
  styleUrls: ['./login-empleado-page.page.scss'],
})
export class LoginEmpleadoPagePage implements OnInit {

  username:string;
  password:string;
  constructor() { }

  ngOnInit() {
  }

}
