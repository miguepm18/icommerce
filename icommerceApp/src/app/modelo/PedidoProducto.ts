import { Producto } from "./Producto";

export class PedidoProducto{
    constructor(public id:number,
        public pedidoID:number,
        public cantidad:number,
        public producto:Producto){}

    public static createFromJsonObject(jsonObject:any):PedidoProducto
    {
        let pedidoProducto:PedidoProducto = new PedidoProducto(jsonObject['id'],
        jsonObject['pedidoID'],
        jsonObject['cantidad'],
        jsonObject['producto']);
        return pedidoProducto;
    }
}