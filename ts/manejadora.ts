
class Controller //implements EventListenerObject
{
    
    public AddVehiculo(){
      
            let target = Controller.GetInputs();
            if(target!= null )
            {
                var lista = JSON.parse(localStorage["vehiculos"] || null);
                lista.push(target);
                localStorage.setItem("vehiculos", JSON.stringify(lista));
                alert("Alta Exitosa");
                location.reload();
            }
            else{
                alert("Faltan Datos");
                return console.log("Error: Cargar Ciudadano");
            }
       
        
       
        
    }


   

    public DeleteCiudadano(){
       
           
                var array = JSON.parse(localStorage["ciudadanos"] || null);
                let txtDNI =      <HTMLInputElement> document.getElementById("txtDni");
                for (let index = 0; index < array.length; index++) {
                if (array[index].dni == parseInt(txtDNI.value))
                {
                 array.splice(index,1);   
                }
                }

                localStorage.setItem("ciudadanos", JSON.stringify(array));
                alert("Modificación Exitosa");
                location.reload();
           
          
        
    }

    public FilterByPais(){
        Controller.ClearTable();
        let pais =        <HTMLInputElement> document.getElementById("select");
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var aux = array.filter((x: { pais: string; }) => x.pais == pais.value);
        Controller.buildTable(aux);
        
        
    }
    
    
    public GetAvgAge(){
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        var aux = array.filter((x: { sexo: string; }) => x.sexo == Controller.getRadioValue());
        Controller.buildTable(aux);
        var edades = aux.map((x: { edad: number; })=>{ return x.edad});
        var suma  = edades.reduce(function(total: any,num: any){
            return total+=num;
        },0);
        
        var promedio: number = suma / aux.length ;
        alert("Promedio de Edad: " +promedio);
    }
    
    public FilterBySexAndAge(){
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        let txtEdad =     <HTMLInputElement> document.getElementById("txtEdad");
        var aux =  array.filter((x: { sexo: string; }) => x.sexo == Controller.getRadioValue()).filter((x: { edad: number; }) => x.edad == parseInt(txtEdad.value))
        var lista = aux.map((x: { nombre: string; apellido : string; dni : number })=>{ return {"nombre":x.nombre,"apellido":x.apellido,"dni":x.dni}});
        Controller.buildTable(lista);
        
    }


    

    public static GetInputs()
    {
        let txtMarca =   <HTMLInputElement> document.getElementById("txtMarca");
        let txtModelo = <HTMLInputElement> document.getElementById("txtModelo");
        let txtPrecio =     <HTMLInputElement> document.getElementById("txtPrecio");

        let tipo =  <HTMLInputElement> document.getElementById("select");
        var id = 1;
        if(tipo.value == "Camioneta")
        {

            return  new Camioneta(id, txtMarca.value, txtModelo.value, parseInt(txtPrecio.value));
        }
        else
        {
            return  new Auto(id, txtMarca.value, txtModelo.value, parseInt(txtPrecio.value), 4);
        }
        
       
    }

    public static FillInputs()
    {
        let payload = Controller.GetCiudadano();
        let txtNombre =   <HTMLInputElement> document.getElementById("txtNombre");
        let txtApellido = <HTMLInputElement> document.getElementById("txtApellido");
        let txtEdad =     <HTMLInputElement> document.getElementById("txtEdad");
        txtNombre.value = payload.nombre;
        txtApellido.value = payload.apellido;
        txtEdad.value = payload.edad;
        Controller.SetPais(payload.pais);           
        Controller.SetSexo(payload.sexo);           
    }
    
    public static SetPais(pais:string)
    {
        let paisSelect =  <HTMLSelectElement> document.getElementById("select");
        paisSelect.value = pais;
        
    }
    public static SetSexo(sexo:string)
    {
        if(sexo == "male")
        {
            let male = <HTMLInputElement> document.getElementById("male");
            male.checked = true;

        }
        else{

            let female = <HTMLInputElement> document.getElementById("female");
            female.checked = true;
        }
    }

    public static GetCiudadano()
    {
        var array = JSON.parse(localStorage["ciudadanos"] || null);
        let txtDNI =      <HTMLInputElement> document.getElementById("txtDni");
        for (let index = 0; index < array.length; index++) {
             if (array[index].dni == parseInt(txtDNI.value))
             {
                 return array[index];
             }
        }
    }

        public static getRadioValue()
    {
        let male = <HTMLInputElement> document.getElementById("male");
        if(male.checked == true)
        {
            return "male"
        }
        return "female";
    }

    public Load()
    {
        
        Controller.buildHeader();
       
    }

    public static Rebuild()
    {
        
        Controller.buildHeader();
       

    }

      
   public static buildHeader()
   {
    let cbId = <HTMLInputElement> document.getElementById("cbId");
    let cbMarca = <HTMLInputElement> document.getElementById("cbMarca");
    let cbModelo = <HTMLInputElement> document.getElementById("cbModelo");
    let cbPrecio = <HTMLInputElement> document.getElementById("cbPrecio");

    var aux;
    if(cbId.checked)
    {
        aux = "<th id=H1>ID</th>";
    }
    if(cbMarca.checked)
    {
        if(aux!=null)
        {
            aux += "<th id=H2>Marca</th>";
        }
        else{
            aux = "<th id=H2 >Marca</th>";
        }
    }
    if(cbModelo.checked)
    {
        if(aux!=null)
        {
            aux += "<th id=H3 >Modelo</th>";
        }
        else{
            aux = "<th id=H3 >Modelo</th>";
        }
    }
    if(cbPrecio.checked)
    {
        if(aux!=null)
        {
            aux += "<th id=H4 >Precio</th>";
        }
        else{
            aux = "<th id=H4 >Precio</th>";
        }
    }
       var table = <HTMLTableElement>document.getElementById('table');
       table.innerHTML += aux;
       var vehiculos = JSON.parse(localStorage["vehiculos"] || null);
       Controller.buildTable(vehiculos);

   } 


   public static buildTable(data:Array<any>) {
        var table = <HTMLTableElement>document.getElementById('tbody');
        for (var i = 0; i < data.length; i++) {
            var row = "<tr id='" + i + "' >";
            row += "<td>" + data[i].nombre + "</td>  ";
            row += "<td>" + data[i].apellido + "</td>";
            row += "<td>" + data[i].edad + "</td>  ";
            row += "<td>" + data[i].dni + "</td>  ";
            row += "<td>" + data[i].sexo + "</td>  ";
            row += "<td>" + data[i].pais + "</td>  ";
            row += "<td> <input type='button' id='E"+i+"' class = 'btnEliminar'  value='Eliminar' onclick='Controller.EliminarRow(" + i + ");'> </td>  ";
            row += "</tr>";
            table.innerHTML += row;
        }
    }
    
    public static ClearTable()
    {
        var table = <HTMLTableElement>document.getElementById('tbody');
        if(table.rows.length > 0)
        {
            for (let index = 0; index < table.rows.length; index++) {
                table.removeChild(<HTMLTableElement>document.getElementById((table.rows.length-1).toString()));
                                 }
        }
        
        if(table.rows.length > 0)
        {
            Controller.ClearTable();
        }
    }

    public static ClearHeader()
    {
        var table = <HTMLTableElement>document.getElementById('table');
        table.removeChild(<HTMLTableElement>document.getElementById("H1")));
    }


    public CBChange()
    {
        Controller.ClearTable();
        Controller.ClearHeader();
       
        Controller.Rebuild();
        
    }

 


}

window.addEventListener("load", () => {
    
    let controller:Controller = new Controller();
    controller.Load();
    let btn1 = <HTMLElement> document.getElementById("btnAlta");
    let btn2 = <HTMLElement> document.getElementById("btnPromedio");
    let btn3 = <HTMLElement> document.getElementById("btnAgregar");
    let btn4 = <HTMLElement> document.getElementById("btnCerrar");


    let cbId = <HTMLElement> document.getElementById("cbId");
    let cbMarca = <HTMLElement> document.getElementById("cbMarca");
    let cbModelo = <HTMLElement> document.getElementById("cbModelo");
    let cbPrecio = <HTMLElement> document.getElementById("cbPrecio");

     cbId.addEventListener("change", controller.CBChange);     
     cbMarca.addEventListener("change", controller.CBChange); 
     cbModelo.addEventListener("change", controller.CBChange);
     cbPrecio.addEventListener("change", controller.CBChange); 


    
    btn1.addEventListener("click", controller.CBChange);
    btn2.addEventListener("click", controller.CBChange);
    btn3.addEventListener("click", controller.AddVehiculo);
    btn4.addEventListener("click", controller.CBChange);

});
