import { Fichaje } from "./Fichaje";
import { Mesa } from "./Mesa";
import { Pedido } from "./Pedido";

export class Empleado {

    constructor(public id:number,
        public nombre:string,
        public apellidos:string,
        public usuario:string,
        public password:string,
        public direccion:string,
        public email:string,
        public movil:number,
        public dni:string,
        public esAdministrador:boolean,
        public esRepartidor:boolean,
        public activo:boolean,
        public mesas:Array<Mesa>,
        public pedidos:Array<Pedido>
        )
    {}
    
    public static createFromJsonObject(jsonObject:any):Empleado
    {
        let empleado:Empleado= new Empleado(jsonObject['id'],
            jsonObject['nombre'],
            jsonObject['apellidos'],
            jsonObject['usuario'],
            jsonObject['password'],
            jsonObject['direccion'],
            jsonObject['email'],
            jsonObject['movil'],
            jsonObject['dni'],
            jsonObject['esAdministrador'],
            jsonObject['esRepartidor'],
            jsonObject['activo'],
            jsonObject['mesas'],
            jsonObject['pedidos']);
            return empleado;
    }
                
}