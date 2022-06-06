import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from 'src/app/modelo/Cliente';
import { Empleado } from 'src/app/modelo/Empleado';
import { Menu } from 'src/app/modelo/Menu';
import { Mesa } from 'src/app/modelo/Mesa';

@Injectable()
export class ApiServiceProvider {    
    private URL="http://localhost:8080/"; //LOCAL
    //private URL="http://iesjulioverne.es:4002/"; //SERVIDOR VM

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


    //Modifica un empleado(No es necesaria la password)
    modificarCliente(clienteNuevo: Cliente): Promise<Cliente> {
        let promise = new Promise<Cliente>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(clienteNuevo);
            this.http.put(this.URL + "clientes/modificarCliente",
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

    //Borra un cliente de la BD
    deleteCliente(clienteBorrado: Cliente): Promise<Cliente> {
        let promise = new Promise<Cliente>((resolve, reject) => {
            this.http.delete(this.URL + "clientes/borrarCliente/"+clienteBorrado.id).toPromise().then(
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

    //Inserta un nuevo empleado en la BD
    registrarEmpleado(empleadoNuevo: Empleado): Promise<Empleado> {
        let promise = new Promise<Empleado>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete empleadoNuevo.id;
            let datos = JSON.stringify(empleadoNuevo);
            this.http.post(this.URL + "empleados/registrarEmpleado",
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

    //Modifica un empleado(No es necesaria la password)
    modificarEmpleado(empleadoNuevo: Empleado): Promise<Empleado> {
        let promise = new Promise<Empleado>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(empleadoNuevo);
            this.http.put(this.URL + "empleados/modificarEmpleado",
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

    //Elimina un empleado
    deleteEmpleado(empleadoBorrado: Empleado): Promise<Empleado> {
        let promise = new Promise<Empleado>((resolve, reject) => {
            this.http.delete(this.URL + "empleados/borrarEmpleado/"+empleadoBorrado.id).toPromise().then(
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

    //MENUS
    getMenus():Promise<Menu[]> {
        let promise = new Promise<Menu[]>((resolve, reject) => {
            this.http.get(this.URL+"menus").toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    

    getMenuId(id:number):Promise<Menu> {
        let promise = new Promise<Menu>((resolve, reject) => {
            this.http.get(this.URL+"menus/"+id).toPromise()
                .then((data:any)=>{
                    
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    //Inserta un nuevo empleado en la BD
    registrarMenu(menuNuevo: Menu): Promise<Menu> {
        let promise = new Promise<Menu>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete menuNuevo.id;
            let datos = JSON.stringify(menuNuevo);
            this.http.post(this.URL + "menus/crearMenu",
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

    //Modifica un empleado(No es necesaria la password)
    modificarMenu(menuEditar: Menu): Promise<Menu> {
        let promise = new Promise<Menu>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(menuEditar);
            this.http.put(this.URL + "menus/modificarMenu",
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

    //Elimina un empleado
    deleteMenu(menuBorrado: Menu): Promise<Menu> {
        let promise = new Promise<Menu>((resolve, reject) => {
            this.http.delete(this.URL + "menus/borrarMenu/"+menuBorrado.id).toPromise().then(
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

    //MESAS
    getMesas():Promise<Mesa[]> {
        let promise = new Promise<Mesa[]>((resolve, reject) => {
            this.http.get(this.URL+"mesas").toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    

    getMesaId(id:number):Promise<Mesa> {
        let promise = new Promise<Mesa>((resolve, reject) => {
            this.http.get(this.URL+"mesas/"+id).toPromise()
                .then((data:any)=>{
                    
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    //Inserta un nuevo empleado en la BD
    registrarMesa(mesaNueva: Mesa): Promise<Mesa> {
        let promise = new Promise<Mesa>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete mesaNueva.id;
            let datos = JSON.stringify(mesaNueva);
            this.http.post(this.URL + "mesas/crearMesa",
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

    //Modifica un empleado(No es necesaria la password)
    modificarMesa(mesaEditar: Mesa): Promise<Mesa> {
        let promise = new Promise<Mesa>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(mesaEditar);
            this.http.put(this.URL + "mesas/modificarMesa",
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

    //Elimina un empleado
    deleteMesa(mesaBorrada: Mesa): Promise<Mesa> {
        let promise = new Promise<Mesa>((resolve, reject) => {
            this.http.delete(this.URL + "mesas/borrarMesa/"+mesaBorrada.id).toPromise().then(
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

}