"use strict";
var Vehiculo = /** @class */ (function () {
    function Vehiculo(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    Vehiculo.prototype.PersonaToString = function () {
        return "Nombre\":\"" + this.nombre + "\",\"Apellido\":\"" + this.apellido + "\",\"Edad\": \"" + this.edad + "\"";
    };
    return Vehiculo;
}());
