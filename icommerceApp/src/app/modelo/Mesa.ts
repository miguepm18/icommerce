import { Empleado } from "./Empleado";
import { Pedido } from "./Pedido";

export class Mesa{
    constructor(public id:number,
        public capacidad:number,
        public ocupada:boolean,
        public activo:boolean,
        public empleado:Empleado,
        public pedidos:Array<Pedido>,
        public cuenta:number){}

    public static createFromJsonObject(jsonObject:any):Mesa
    {
        let mesa:Mesa = new Mesa(jsonObject['id'],
        jsonObject['capacidad'],
        jsonObject['ocupada'],
        jsonObject['activo'],
        jsonObject['empleado'],
        jsonObject['pedidos'],
        jsonObject['cuenta']);
        return mesa;
    }
}