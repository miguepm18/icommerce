import { Pedido } from "./Pedido";

export class Cliente {

    constructor(public id:number,
        public nombre:string,
        public apellidos:string,
        public usuario:string,
        public password:string,
        public direccion:string,
        public email:string,
        public dni:string,
        public cuentaBanco:string,
        public fechaCaducidadCuenta:string, //MM-yy
        public activo:boolean,
        public pedidos:Array<Pedido>
        )
    {}
    
    public static createFromJsonObject(jsonObject:any):Cliente
    {
        let cliente:Cliente= new Cliente(jsonObject['id'],
            jsonObject['nombre'],
            jsonObject['apellidos'],
            jsonObject['usuario'],
            jsonObject['password'],
            jsonObject['direccion'],
            jsonObject['email'],
            jsonObject['dni'],
            jsonObject['cuentaBanco'],
            jsonObject['fechaCaducidadCuenta'],
            jsonObject['activo'],
            jsonObject['pedidos']);
            return cliente;
    }
                
}