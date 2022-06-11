import { MenuProducto } from "./MenuProducto";

export class Menu{
    constructor(public id:number,
        public nombre:string,
        public activo:boolean,
        public observaciones:string,
        public productos:Array<MenuProducto>,
        public precioTotal:number){}


    public static createFromJsonObject(jsonObject:any):Menu
    {
        let menu:Menu = new Menu(jsonObject['id'],
        jsonObject['nombre'],
        jsonObject['activo'],
        jsonObject['observaciones'],
        jsonObject['productos'],
        jsonObject['precioTotal']);
        
        
        return menu;   
    }
}