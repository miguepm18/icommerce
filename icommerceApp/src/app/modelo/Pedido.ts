import { Cliente } from "./Cliente";
import { Empleado } from "./Empleado";
import { PedidoProducto } from "./PedidoProducto";

export class Pedido {
    constructor(public id: number,
        public tipo: string,
        public horaEntrada: string,
        public horaSalida: string,
        public estado: string,
        public activo: boolean,
        public mesaID: number,
        public precio: number,
        public direccion:string,
        public productos: Array<PedidoProducto>,
        public cliente: Cliente,
        public empleado: Empleado) { }

    public static createFromJsonObject(jsonObject: any): Pedido {

        let pedido: Pedido = new Pedido(jsonObject['id'],
            jsonObject['tipo'],
            jsonObject['horaEntrada'],
            jsonObject['horaSalida'],
            jsonObject['estado'],
            jsonObject['activo'],
            jsonObject['mesaID'],
            jsonObject['precio'],
            jsonObject['direccion'],
            jsonObject['productos'],
            jsonObject['cliente'],
            jsonObject['empleado']);
        return pedido;
    }
}