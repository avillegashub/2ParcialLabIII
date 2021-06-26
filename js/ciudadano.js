"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto(nombre, apellido, edad, sexo, pais, dni) {
        var _this = _super.call(this, nombre, apellido, edad) || this;
        _this.sexo = sexo;
        _this.pais = pais;
        _this.dni = dni;
        return _this;
    }
    Auto.prototype.CiudadanoToJSON = function () {
        var datos = "{" + this.PersonaToString() + (",\"DNI\":\"" + this.dni + "\",\"Sexo\":\"" + this.sexo + "\",\"Pais\":\"" + this.pais + "\"}");
        return datos;
    };
    return Auto;
}(Vehiculo));
