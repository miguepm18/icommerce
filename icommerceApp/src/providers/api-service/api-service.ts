import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from 'src/app/modelo/Cliente';

@Injectable()
export class ApiServiceProvider {
    
    private URL="http://localhost:8099/";

    constructor(public http: HttpClient){

    }

    //Devuelve todos los clientes
    getClientes():Promise<Cliente[]> {
        let promise = new Promise<Cliente[]>((resolve, reject) => {
            this.http.get(this.URL+"clientes").toPromise()
                .then((data:any)=>{
                    let clientes=new Array<Cliente>();
                    data.forEach(clientesJson => {
                        let cliente=Cliente.createFromJsonObject(clientesJson);
                        clientes.push(cliente);
                    });
                    resolve(clientes);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    //Devuelve todos los clientes
    compruebaUsuarioCliente(usuario:string):Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.get(this.URL+"clientes/checkUsername/" + usuario).toPromise()
                .then((data:boolean)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }


/*
    eliminarAlumno(id:number):Promise<Boolean>{
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL+"/alumnos/"+id).toPromise().then(
              (data:any) => { // Success
                console.log(data)
                resolve(true);
              }
            )
            .catch((error:Error)=>{
              console.log(error.message);
              reject(error.message);});
          });
          return promise;
    }//end_eliminar_alumno
   */ 
}//end_class