import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-cliente-page',
  templateUrl: './login-cliente-page.page.html',
  styleUrls: ['./login-cliente-page.page.scss'],
})
export class LoginClientePagePage implements OnInit {

  username:string;
  password:string;
  constructor() { }

  ngOnInit() {
  }

}
