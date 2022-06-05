import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private apiService: ApiServiceProvider, private menu:MenuController) {}
  
  ngOnInit(): void {
    this.menu.enable(true, 'empleado')
  }


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
