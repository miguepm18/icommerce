import { Pedido } from "./Pedido";

export class Mesa{
    constructor(id:number,
        capacidad:number,
        ocupada:boolean,
        activo:boolean,
        empleadoID:number,
        pedidos:Array<Pedido>){}

    public static createFromJsonObject(jsonObject:any):Mesa
    {
        let mesa:Mesa = new Mesa(jsonObject['id'],
        jsonObject['capacidad'],
        jsonObject['ocupada'],
        jsonObject['activo'],
        jsonObject['empleadoID'],
        jsonObject['pedidos']);
        return mesa;
    }
}