export class Fichaje{
    constructor(public id:number,
        public horaEntrada:string,
        public activo:boolean,
        public horaSalida:string,
        empleadoID:number){}

    public static createFromJsonObject(jsonObject:any):Fichaje
    {
        let fichaje:Fichaje = new Fichaje(jsonObject['id'],
        jsonObject['horaEntrada'],
        jsonObject['activo'],
        jsonObject['horaSalida'],
        jsonObject['empleadoID']);
        return fichaje;
    }
}