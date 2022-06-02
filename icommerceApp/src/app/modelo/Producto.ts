import { Pedido } from "./Pedido";

export class Producto{
    constructor(public id:number,
        public nombre:string,
        public precio:number,
        public imagen:string,
        public activo:boolean){}

    public static createFromJsonObject(jsonObject:any):Producto
    {
        let producto:Producto = new Producto(jsonObject['id'],
        jsonObject['nombre'],
        jsonObject['precio'],
        jsonObject['imagen'],
        jsonObject['activo']);
        return producto;
    }
}