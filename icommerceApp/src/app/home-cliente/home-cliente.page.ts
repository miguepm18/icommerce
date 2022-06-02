import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceProvider } from 'src/providers/api-service/api-service';
import { Cliente } from '../modelo/Cliente';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})
export class HomeClientePage implements OnInit {

  cliente:Cliente;
  constructor(private apiService: ApiServiceProvider, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.apiService.getClienteId(Number.parseInt(id))
            .then((respuesta:any)=>{
              this.cliente=Cliente.createFromJsonObject(respuesta);
            })
            .catch( (error:string) => {
              console.log(error);
            });
  }

}
