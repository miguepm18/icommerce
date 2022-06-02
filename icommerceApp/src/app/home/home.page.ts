import { Component } from '@angular/core';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private apiService: ApiServiceProvider) {}


  googleLogin(){
    this.apiService.getClientes()
      .then( (respuesta:any)=> {          
          console.log(respuesta);
          
      })
      .catch( (error:string) => {
          console.log(error);
      });
  }
}
