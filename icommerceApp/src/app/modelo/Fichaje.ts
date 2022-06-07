import { Empleado } from "./Empleado";

export class Fichaje {
    constructor(public id: number,
        public horaEntrada: string,
        public activo: boolean,
        public horaSalida: string,
        public empleado: Empleado) { }

    public static createFromJsonObject(jsonObject: any): Fichaje {
        
        if(jsonObject['empleadoAsignado']!=null){
            console.log(jsonObject['empleadoAsignado']);
            
            let empleado:Empleado = Empleado.createFromJsonObject(jsonObject['empleadoAsignado']);
            console.log(empleado);
            
            let fichaje: Fichaje = new Fichaje(jsonObject['id'],
                jsonObject['horaEntrada'],
                jsonObject['activo'],
                jsonObject['horaSalida'],
                empleado);
            return fichaje;
        }else{
            let fichaje: Fichaje = new Fichaje(jsonObject['id'],
                jsonObject['horaEntrada'],
                jsonObject['activo'],
                jsonObject['horaSalida'],
                jsonObject['empleado']);
            return fichaje;
        }
       

    }
}