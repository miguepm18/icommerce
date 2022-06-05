import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from 'src/app/modelo/Cliente';
import { Empleado } from 'src/app/modelo/Empleado';

@Injectable()
export class ApiServiceProvider {
    
    //private URL="http://localhost:8080/"; //LOCAL
    private URL="http://iesjulioverne.es:4002/"; //SERVIDOR VM

    constructor(public http: HttpClient){

    }

    //CLIENTES

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
    
    //Devuelve si un usuario existe en la tabla clientes
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

    //Inserta un nuevo cliente en la BD
    registrarCliente(clienteNuevo: Cliente): Promise<Cliente> {
        let promise = new Promise<Cliente>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete clienteNuevo.id;
            let datos = JSON.stringify(clienteNuevo);
            this.http.post(this.URL + "clientes/registrarCliente",
               datos,
                header).toPromise().then(
                    (data: any) => {
                        resolve(data);
                    }
                )
                .catch((error: Error) => {
                   reject(error.message);
                });
        });
        return promise;
    }
    //Comprueba que el cliente existe en la BD a partir del usuario y la contraseña, si existe, lo devuelve con todos los datos, sino devuelve false
    logInCliente(clienteLogin:Cliente):Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(clienteLogin);
            this.http.post(this.URL + "clientes/logIn",
               datos,
                header).toPromise().then(
                    (data: any) => {
                        resolve(data);
                    }
                )
                .catch((error: Error) => {
                   reject(error.message);
                });
        });
        return promise;
    }

    //Devuelve un empleado a partir de un id
    getClienteId(id:number):Promise<Cliente> {
        let promise = new Promise<Cliente>((resolve, reject) => {
            this.http.get(this.URL+"clientes/"+id).toPromise()
                .then((data:any)=>{
                    
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    //EMPLEADO

    //Comprueba que el empleado existe en la BD a partir del usuario y la contraseña, si existe, lo devuelve con todos los datos, sino devuelve false
    logInEmpleado(empleadoLogIn:Empleado):Promise<any> {
        let promise = new Promise<any>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(empleadoLogIn);
            this.http.post(this.URL + "empleados/logIn",
               datos,
                header).toPromise().then(
                    (data: any) => {
                        resolve(data);
                    }
                )
                .catch((error: Error) => {
                   reject(error.message);
                });
        });
        return promise;
    }

    //Devuelve todos los empleados
    getEmpleados():Promise<Empleado[]> {
        let promise = new Promise<Empleado[]>((resolve, reject) => {
            this.http.get(this.URL+"empleados").toPromise()
                .then((data:any)=>{
                    console.log("empleados:");
                    
                    console.log(data);
                    
                    /*
                    let empleados=new Array<Empleado>();
                    data.forEach(clientesJson => {
                        let cliente=Cliente.createFromJsonObject(clientesJson);
                        clientes.push(cliente);
                    });*/
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    //Devuelve si un usuario existe en la tabla Empleados
    compruebaUsuarioEmpleado(usuario:string):Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.get(this.URL+"empleados/checkUsername/" + usuario).toPromise()
                .then((data:boolean)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    //Devuelve un empleado a partir de un id
    getEmpleadoId(id:number):Promise<Empleado> {
        let promise = new Promise<Empleado>((resolve, reject) => {
            this.http.get(this.URL+"empleados/"+id).toPromise()
                .then((data:any)=>{
                    
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    

}