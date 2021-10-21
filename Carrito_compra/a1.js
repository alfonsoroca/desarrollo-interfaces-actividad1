// Declaración de variables
var DOMnombreArticulo;
var DOMerrorArticulo;
var DOMprecioArticulo;
var DOMerrorPrecio;
var DOMunidadesArticulo;
var DOMbotonAnadirCarrito;

var DOMarticulosCarrito;
arrayArticulosCarrito = new Array();
var listaArticulosCarrito = "";
var DOMprecioCarrito;
var precioCarrito = 0;

var DOMformaPago;
var DOMcapaTarjeta;
var DOMcapaEfectivo;
var DOMtitularTarjeta;
var DOMnumTarjeta;
var DOMcvv;
var DOMimporteEfectivo;

var DOMcondicionesCompra;

var DOMbotonImprimir;
var conmutadorImprimir = 0;
var DOMbotonRestablecer;



// Listener y funcion de la página al cargar completamente
window.addEventListener("load", ()=>{

    // Inicializamos las variables y estados de los nodos
    init();

    // Inicializamos la funcionalidad de los eventos
    manejadorEventos();    

});

// Función para inicializar las variables y estados de los nodos
function init() {
    DOMnombreArticulo = document.getElementById("nombreArticulo");
    DOMerrorArticulo = document.getElementById("errorArticulo");
    DOMprecioArticulo = document.getElementById("precioArticulo");
    DOMerrorPrecio = document.getElementById("errorPrecio");
    DOMunidadesArticulo = document.getElementById("unidadesArticulo");
    DOMbotonAnadirCarrito = document.getElementById("anadirCarrito");
    
    DOMarticulosCarrito = document.getElementById("articulosCarrito");
    DOMprecioCarrito = document.getElementById("precioCarrito");
    
    DOMformaPago = document.getElementById("formaPago");    
    DOMcapaTarjeta = document.getElementById("capaTarjeta");
    DOMcapaEfectivo = document.getElementById("capaEfectivo");
    DOMtitularTarjeta = document.getElementById("titularTarjeta");
    DOMnumTarjeta = document.getElementById("numTarjeta");
    DOMcvv = document.getElementById("cvv");
    DOMimporteEfectivo = document.getElementById("importeEfectivo");

    DOMcondicionesCompra = document.getElementById("condicionesCompra");

    DOMbotonImprimir = document.getElementById("imprimir");
    DOMbotonRestablecer = document.getElementById("restablecer");

    // Oculta los errores al validar los campos nombreArtículo y precioArtículo
    DOMerrorArticulo.style.display = "none";
    DOMerrorPrecio.style.display = "none";

    // Oculta las capas relacionadas con la forma de pago tarjeta y efectivo
    DOMcapaTarjeta.style.display="none";
    DOMcapaEfectivo.style.display="none";

    // Oculta el botón Imprimir
    DOMbotonImprimir.style.visibility = "hidden";

}

// Función que maneja los eventos
function manejadorEventos() {
    
    // Funcionalidad del botón añadir al carrito
    DOMbotonAnadirCarrito.addEventListener("click", f_anadirCarrito);
    
    // Selector de la forma de pago
    DOMformaPago.addEventListener("change", f_selectorFormaPago);

    // Funcionalidad del botón Restablecer
    DOMbotonRestablecer.addEventListener("click", f_restablecer);

    // Funcionalidad de la casilla condiciones de compra
    DOMcondicionesCompra.addEventListener("click", f_aceptacionCondiciones)

    // Funcionalidad del botón Imprimir
    DOMbotonImprimir.addEventListener("click", f_imprimir);

}

// Función para la lógica de la forma de pago
function f_selectorFormaPago() {
    if (DOMformaPago.value == "tarjeta") {
        DOMcapaTarjeta.style.display = "block";
        DOMcapaEfectivo.style.display = "none";
        
    } else if (DOMformaPago.value == "efectivo") {
        DOMcapaTarjeta.style.display = "none";
        DOMcapaEfectivo.style.display = "block";
        DOMimporteEfectivo.value = DOMprecioCarrito.value;
        
    } else {
        DOMcapaTarjeta.style.display = "none";
        DOMcapaEfectivo.style.display = "none";    
    }
}

// Función que resetea la página a las indicaciones del requerimiento
function f_restablecer(){
  
    DOMnombreArticulo.focus();
    DOMcapaTarjeta.style.display = "none";
    DOMcapaEfectivo.style.display = "none";
    precioCarrito = 0;
    conmutadorImprimir = 0;

}

// Función que valida los campos nombre y precio del artículo
function f_anadirCarrito(){

    DOMerrorArticulo.style.display = "none";
    DOMerrorPrecio.style.display = "none";
    var error = 0;
    
    // Condicionales que validan los campos articulo y precio

    if (DOMprecioArticulo.value == "") {
        DOMerrorPrecio.style.display = "inline";
        DOMprecioArticulo.focus();
        error++;   
        
    } else {
        var validadorPrecio = /^\d{1,9}\.?\d{0,2}$/;
        if (validadorPrecio.test(DOMprecioArticulo.value) == false) {
            DOMerrorPrecio.style.display = "inline";
            DOMerrorPrecio.textContent = "Formato erróneo (00.00)";
            DOMprecioArticulo.focus();
            error++;        
        }
    }

    if (DOMnombreArticulo.value == "") {
        DOMerrorArticulo.style.display = "inline";
        DOMnombreArticulo.focus();
        error++;
    }

    if (error == 0) f_incluir();
    
}
 
function f_incluir () {
/*
    arrayArticulosCarrito.push(DOMnombreArticulo.value);
    
    for (i = 0; i < arrayArticulosCarrito.length; i++){
        
        if(i = 0) {
            listaArticulosCarrito += (arrayArticulosCarrito[i]);    
        } else {
            listaArticulosCarrito += (arrayArticulosCarrito[i] + ", ");
        }           
    }*/

    //DOMarticulosCarrito.textContent = listaArticulosCarrito;
    
    DOMnombreArticulo.value = "";
    DOMnombreArticulo.focus();

    precioCarrito = precioCarrito + (parseFloat(DOMunidadesArticulo.value) * parseFloat(DOMprecioArticulo.value));

    precioCarrito.toFixed(2);
    
    DOMprecioArticulo.value = "";
    DOMunidadesArticulo.value = 1;
    
    DOMprecioCarrito.value = precioCarrito + "€";
}

function f_aceptacionCondiciones() {
   
    conmutadorImprimir++;

    if (conmutadorImprimir % 2 != 0) {
    
        DOMbotonImprimir.style.visibility = "visible";
        
    } else {

        DOMbotonImprimir.style.visibility = "hidden";
    }    
}

function f_imprimir(){

    if(DOMformaPago.value != "seleccione"){
        alert(
            "El carrito contiene: " + 
            "\nPrecio total del carrito: " + DOMprecioCarrito.value + 
            "\nForma de pago: " + DOMformaPago.value
    );
    } else {
        alert(
            "Seleccione forma de pago"
        );
    }

}