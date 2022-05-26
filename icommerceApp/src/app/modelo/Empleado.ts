export class Empleado {

    constructor(public idCliente:number,
        public nombre:string,
        public apellidos:string,
        public usuario:string,
        public password:string,
        public direccion:string,
        public email:string,
        public dni:string,
        public fechaNacimiento:string,
        public cuentaBanco:string,
        public fechaCaducidadCuenta:string
        )
    {  }
    /*
    public static createFromJsonObject(jsonObject:any):Cliente
    {
        let cliente:Cliente= new Cliente(jsonObject['idCliente'],
            jsonObject['nombre'],
            jsonObject['apellidos'],
            jsonObject['usuario'],
            jsonObject['password'],
            jsonObject['direccion'],
            jsonObject['email'],
            jsonObject['dni'],
            jsonObject['fechanacimiento'],
            jsonObject['cuentabanco'],
            jsonObject['fechanacimiento']);
            return cliente;
    }*/
                
}