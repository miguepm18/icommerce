import { Producto } from "./Producto";

export class MenuProducto{
    constructor(public id:number,
        public menuID:number,
        public cantidad:number,
        public producto:Producto){}


    public static createFromJsonObject(jsonObject:any):MenuProducto
    {
        let menuProducto:MenuProducto = new MenuProducto(jsonObject['id'],
        jsonObject['menuID'],
        jsonObject['cantidad'],
        jsonObject['producto']);
        return menuProducto;
    }
}