import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from 'src/app/modelo/Cliente';
import { Empleado } from 'src/app/modelo/Empleado';
import { Menu } from 'src/app/modelo/Menu';
import { Mesa } from 'src/app/modelo/Mesa';
import { Fichaje } from 'src/app/modelo/Fichaje';
import { Producto } from 'src/app/modelo/Producto';
import { Pedido } from 'src/app/modelo/Pedido';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable()
export class ApiServiceProvider {    
    //private URL="http://localhost:8080/"; //LOCAL
    private URL="http://iesjulioverne.es:4002/"; //SERVIDOR VM

    constructor(public http: HttpClient, private afStorage: AngularFireStorage){

    }

    //FIRESTORE STORAGE
    uploadImage(file: File, nombre:string):Promise<string> {

        var promise:Promise<string> = new Promise<string>( (resolve, reject)=>{
      
          //Se comprueba que el tipo del fichero pertenece a un tipo imagen
      
          if (file.type.split('/')[0] !== 'image') { 
      
            console.log('File type is not supported!')
      
            reject("El fichero no es de tipo imagen");
      
          }
      
          //se calcula el path dentro del storage de firebase
      
          //se guarda dentro de una carpeta avatar
      
          //el nombre del fichero es igual al id del alumno precedido de la hora dada por getTime 
          
          const fileStoragePath = `productosBackground/` + nombre;
      
      
      
          // Image reference
      
          const imageRef = this.afStorage.ref(fileStoragePath);
      
      
      
          // File upload task
      
          this.afStorage.upload(fileStoragePath, file)
      
          .then((data)=>{
      
            imageRef.getDownloadURL().subscribe(resp=>{
      
                resolve(resp);
      
            });
      
          })
      
          .catch((error)=>{
      
                reject(error);
      
          });
      
        });
      
        return(promise);  
      
      }//end_uploadImage


      removeImage(imageUrl:string):Promise<string> {

        var promise:Promise<string> = new Promise<string>( (resolve, reject)=>{
      
          var imageRef = this.afStorage.refFromURL(imageUrl);
      
          imageRef.delete().subscribe(resp=>{
      
            resolve;
      
          },
      
          error => {
      
            reject(error);
      
          });
      
        });
      
        return(promise);  
      
      
      }//end_uploadImage

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

    //FICHAJES


    getFichajes():Promise<Fichaje[]> {
        let promise = new Promise<Fichaje[]>((resolve, reject) => {
            this.http.get(this.URL+"fichajes").toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    getFichajesEmpleado(empleado:Empleado):Promise<Fichaje[]> {
        let promise = new Promise<Fichaje[]>((resolve, reject) => {
            this.http.get(this.URL+"fichajes/empleado/" + empleado.id).toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    getFichajeId(id:number):Promise<Fichaje> {
        let promise = new Promise<Fichaje>((resolve, reject) => {
            this.http.get(this.URL+"fichajes/"+id).toPromise()
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
    registrarFichaje(fichajeNuevo: Fichaje): Promise<Fichaje> {
        let promise = new Promise<Fichaje>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete fichajeNuevo.id;
            let datos = JSON.stringify(fichajeNuevo);
            this.http.post(this.URL + "fichajes/crearFichaje",
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
    modificarFichaje(fichajeEditar: Fichaje): Promise<Fichaje> {
        let promise = new Promise<Fichaje>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(fichajeEditar);
            this.http.put(this.URL + "fichajes/modificarFichaje",
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
    deleteFichaje(fichajeBorrado: Fichaje): Promise<Fichaje> {
        let promise = new Promise<Fichaje>((resolve, reject) => {
            this.http.delete(this.URL + "fichajes/borrarFichaje/"+fichajeBorrado.id).toPromise().then(
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
    //PRODUCTOS

    getNumeroDeProductos():Promise<number> {
        let promise = new Promise<number>((resolve, reject) => {
            this.http.get(this.URL+"productos/numeroProductos").toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }

    getProductos():Promise<Producto[]> {
        let promise = new Promise<Producto[]>((resolve, reject) => {
            this.http.get(this.URL+"productos").toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    

    getProductoId(id:number):Promise<Producto> {
        let promise = new Promise<Producto>((resolve, reject) => {
            this.http.get(this.URL+"productos/"+id).toPromise()
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
    registrarProducto(productoNuevo: Producto): Promise<Producto> {
        let promise = new Promise<Producto>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete productoNuevo.id;
            let datos = JSON.stringify(productoNuevo);
            this.http.post(this.URL + "productos/crearProducto",
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
    modificarProducto(productoEditar: Producto): Promise<Producto> {
        let promise = new Promise<Producto>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(productoEditar);
            this.http.put(this.URL + "productos/modificarProducto",
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
    deleteProducto(productoBorrado: Producto): Promise<Producto> {
        console.log(productoBorrado.id);
        
        let promise = new Promise<Producto>((resolve, reject) => {
            this.http.delete(this.URL + "productos/borrarProducto/"+productoBorrado.id).toPromise().then(
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

    //PEDIDOS

    getPedidos():Promise<Pedido[]> {
        let promise = new Promise<Pedido[]>((resolve, reject) => {
            this.http.get(this.URL+"pedidos").toPromise()
                .then((data:any)=>{
                    resolve(data);
                })
                .catch( (error:Error)=>{
                    reject(error.message);
                });
        });
        return promise;
    }
    

    getPedidoId(id:number):Promise<Pedido> {
        let promise = new Promise<Pedido>((resolve, reject) => {
            this.http.get(this.URL+"pedidos/"+id).toPromise()
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
    registrarPedido(pedidoNuevo: Pedido): Promise<Pedido> {
        let promise = new Promise<Pedido>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete pedidoNuevo.id;
            let datos = JSON.stringify(pedidoNuevo);
            this.http.post(this.URL + "pedidos/crearPedido",
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
    modificarPedido(pedidoEditar: Pedido): Promise<Pedido> {
        let promise = new Promise<Pedido>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(pedidoEditar);
            this.http.put(this.URL + "pedidos/modificarPedido",
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
    deletePedido(pedidoBorrado: Pedido): Promise<Pedido> {
        
        
        let promise = new Promise<Pedido>((resolve, reject) => {
            this.http.delete(this.URL + "pedidos/borrarPedido/"+pedidoBorrado.id).toPromise().then(
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

    getPedidosDelCliente(cliente:Cliente):Promise<Pedido[]> {
        let promise = new Promise<Pedido[]>((resolve, reject) => {
            this.http.get(this.URL+"pedidos/cliente/" + cliente.id).toPromise()
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



    

