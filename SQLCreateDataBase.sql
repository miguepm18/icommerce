
-- -----------------------------------------------------
-- Table `ICommerce`.`Empleado` CREADA
-- -----------------------------------------------------
CREATE TABLE Empleado (
  idEmpleado INT Primary Key,
  Nombre VARCHAR(45) NOT NULL,
  Apellidos VARCHAR(45) NOT NULL,
  Usuario VARCHAR(45) NOT NULL,
  pass VARCHAR(45) NOT NULL,
  Dirección VARCHAR(45) NOT NULL,
  Email VARCHAR(45) NOT NULL,
  Movil INT NOT NULL,
  DNI VARCHAR(9) NOT NULL);


-- -----------------------------------------------------
-- Table `ICommerce`.`Cliente` CREADA
-- -----------------------------------------------------
CREATE TABLE Cliente (
  idCliente INT Primary key,
  Nombre VARCHAR(45) NULL,
  Apellidos VARCHAR(45) NULL,
  Usuario VARCHAR(45) NULL,
  pass VARCHAR(45) NULL,
  Direccion VARCHAR(45) NULL,
  Email VARCHAR(45) NULL,
  DNI VARCHAR(9) NULL,
  FechaNacimiento DATETIME NULL,
  CuentaBanco VARCHAR(16) NULL,
  FechaCaducidadCuenta VARCHAR(45) NULL,
  ClienteEnMesa bit NOT NULL)


-- -----------------------------------------------------
-- Table `ICommerce`.`Administrador` CREADA
-- -----------------------------------------------------
CREATE TABLE Administrador (
  idAdministrador INT Primary Key,
  Usuario VARCHAR(45) NOT NULL,
  pass VARCHAR(45) NOT NULL,
  Email VARCHAR(45) NOT NULL,
  Nombre VARCHAR(45) NOT NULL,
  Apellidos VARCHAR(45) NOT NULL)

-- -----------------------------------------------------
-- Table `ICommerce`.`Menu` CREADA
-- -----------------------------------------------------
CREATE TABLE Menu (
  idMenu INT Primary key,
  Nombre VARCHAR(45) NOT NULL,
  Precio VARCHAR(45) NOT NULL,
  Observaciones VARCHAR(45) NOT NULL)


-- -----------------------------------------------------
-- Table `ICommerce`.`Mesa` CREADA
-- -----------------------------------------------------
CREATE TABLE Mesa (
  idMesa INT Primary Key,
  Capacidad INT NOT NULL,
  Estado VARCHAR(45) NOT NULL,
  Cuenta FLOAT NOT NULL,
  idClienteFk INT NULL,
  idEmpleadoFk INT NULL,
  CONSTRAINT fk_Mesa_Cliente
    FOREIGN KEY (idClienteFk)
    REFERENCES Cliente(idCliente),
  CONSTRAINT fk_Mesa_Empleado
    FOREIGN KEY (idEmpleadoFk)
    REFERENCES Empleado(idEmpleado))


-- -----------------------------------------------------
-- Table `ICommerce`.`Restaurante` CREADA
-- -----------------------------------------------------
CREATE TABLE Restaurante (
  idRestaurante INT Primary Key,
  Nombre VARCHAR(45) NOT NULL,
  Capacidad INT NOT NULL,
  Direccion VARCHAR(45) NOT NULL)


-- -----------------------------------------------------
-- Table `ICommerce`.`Pedido` Creada
-- -----------------------------------------------------
CREATE TABLE Pedido (
  idPedido INT Primary Key,
  Tipo VARCHAR(45) NOT NULL,
  HoraEntrada VARCHAR(45) NOT NULL,
  HoraSalida VARCHAR(45) NOT NULL,
  Estado VARCHAR(45) NOT NULL,
  PrecioPedido FLOAT NOT NULL,
  idEmpleadoFk INT NOT NULL,
  idClienteFk INT NOT NULL,
  idMesaFk INT NULL,
  CONSTRAINT fk_Pedido_Empleado
    FOREIGN KEY (idEmpleadoFk)
    REFERENCES Empleado(idEmpleado),
  CONSTRAINT fk_Pedido_Cliente
    FOREIGN KEY (idClienteFk)
    REFERENCES Cliente(idCliente),
  CONSTRAINT fk_Pedido_Mesa1
    FOREIGN KEY (idMesaFk)
    REFERENCES Mesa(idMesa))


-- -----------------------------------------------------
-- Table `ICommerce`.`Producto` CREADA
-- -----------------------------------------------------
CREATE TABLE Producto (
  idProducto INT Primary Key,
  Nombre VARCHAR(45) NOT NULL,
  Precio Float NOT NULL,
  Imagen VARCHAR(45) NOT NULL)


-- -----------------------------------------------------
-- Table `ICommerce`.`Pedido_has_Producto`CREADA
-- -----------------------------------------------------
CREATE TABLE Pedido_has_Producto (
  idPedidoFk INT NOT NULL,
  idProductoFk INT NOT NULL,
  cantidad INT NULL,
  PRIMARY KEY (idPedidoFk, idProductoFk),
  CONSTRAINT fk_Pedido_has_Producto_Pedido
    FOREIGN KEY (idPedidoFk)
    REFERENCES Pedido(idPedido),
  CONSTRAINT fk_Pedido_has_Producto_Producto
    FOREIGN KEY (idProductoFk)
    REFERENCES Producto(idProducto))


-- -----------------------------------------------------
-- Table `ICommerce`.`Menu_has_Pedido`CREADA
-- -----------------------------------------------------
CREATE TABLE Menu_has_Pedido (
  idMenuFk INT NOT NULL,
  idPedidoFk INT NOT NULL,
  cantidad INT NULL,
  PRIMARY KEY (idMenuFk, idPedidoFk),
  CONSTRAINT fk_Menu_has_Pedido_Menu
    FOREIGN KEY (idMenuFk)
    REFERENCES Menu(idMenu),
  CONSTRAINT fk_Menu_has_Pedido_Pedido
    FOREIGN KEY (idPedidoFk)
    REFERENCES Pedido(idPedido))


-- -----------------------------------------------------
-- Table `ICommerce`.`Fichaje` CREADA
-- -----------------------------------------------------
CREATE TABLE Fichaje (
  idFichaje INT Primary Key,
  HoraEntrada DATETIME NOT NULL,
  HoraSalida DATETIME NOT NULL,
  idEmpleadoFk INT NOT NULL,
  CONSTRAINT fk_Fichaje_Empleado
    FOREIGN KEY (idEmpleadoFk)
    REFERENCES Empleado(idEmpleado))


-- -----------------------------------------------------
-- Table `ICommerce`.`Producto_has_Menu`Creada
-- -----------------------------------------------------
CREATE TABLE Producto_has_Menu (
  idProductoFk INT NOT NULL,
  idMenuFk INT NOT NULL,
  cantidad INT NULL,
  PRIMARY KEY (idProductoFk, idMenuFk),
  CONSTRAINT fk_Producto_has_Menu_Producto
    FOREIGN KEY (idProductoFk)
    REFERENCES Producto(idProducto),
  CONSTRAINT fk_Producto_has_Menu_Menu
    FOREIGN KEY (idMenuFk)
    REFERENCES Menu(idMenu))
