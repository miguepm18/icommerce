import { Component, OnInit } from '@angular/core';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.page.html',
  styleUrls: ['./cesta.page.scss'],
})
export class CestaPage implements OnInit {

  constructor(private apiProvider: ApiServiceProvider) { }

  ngOnInit() {
  }

}
