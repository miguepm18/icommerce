import { MenuProducto } from "./MenuProducto";

export class Menu{
    constructor(public id:number,
        nombre:string,
        activo:boolean,
        observaciones:string,
        productos:Array<MenuProducto>){}


    public static createFromJsonObject(jsonObject:any):Menu
    {
        let menu:Menu = new Menu(jsonObject['id'],
        jsonObject['nombre'],
        jsonObject['activo'],
        jsonObject['observaciones'],
        jsonObject['productos']);
        return menu;   
    }
}