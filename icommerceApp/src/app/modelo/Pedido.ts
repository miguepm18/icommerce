import { PedidoProducto } from "./PedidoProducto";

export class Pedido{
    constructor(public id:number,
        public tipo:string,
        public horaEntrada:string,
        public horaSalida:string,
        public estado:string,
        public activo:boolean,
        public mesaID:number,
        public productos:Array<PedidoProducto>,
        public clienteID:number,
        public empleadoID:number){}

    public static createFromJsonObject(jsonObject:any):Pedido
    {
        let pedido:Pedido = new Pedido(jsonObject['id'],
        jsonObject['tipo'],
        jsonObject['horaEntrada'],
        jsonObject['horaSalida'],
        jsonObject['estado'],
        jsonObject['activo'],
        jsonObject['mesaID'],
        jsonObject['productos'],
        jsonObject['clienteID'],
        jsonObject['empleadoID']);
        return pedido;
    }
}