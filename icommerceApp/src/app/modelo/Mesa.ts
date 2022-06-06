import { Pedido } from "./Pedido";

export class Mesa{
    constructor(public id:number,
        public capacidad:number,
        public ocupada:boolean,
        public activo:boolean,
        public empleadoID:number,
        public pedidos:Array<Pedido>){}

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