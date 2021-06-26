class Auto extends Vehiculo{

    puertas: number;
    
    constructor(id: number, marca:string, modelo:string, precio:number, puertas:number)
    {
        super(id, marca, modelo, precio)
        this.puertas = puertas;
    }
    
    
    
    
    
    }