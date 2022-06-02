import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Empleado } from '../modelo/Empleado';

@Component({
  selector: 'app-home-empleado',
  templateUrl: './home-empleado.page.html',
  styleUrls: ['./home-empleado.page.scss'],
})
export class HomeEmpleadoPage implements OnInit {

  empleado:Empleado;
  constructor(private apiService: ApiServiceProvider, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.apiService.getEmpleadoId(Number.parseInt(id))
            .then((respuesta:any)=>{
              this.empleado=Empleado.createFromJsonObject(respuesta);
            })
            .catch( (error:string) => {
              console.log(error);
            });
  }

}
