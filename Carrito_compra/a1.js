// Declaración de variables
    // Las variables de nombre dom_* recogen los nodos del documento html
    // Las variables sin dom_* se utilizan para dotar de funcionalidad al html
var dom_nombreArticulo;
var dom_errorArticulo;
var dom_precioArticulo;
var dom_errorPrecio;
var dom_unidadesArticulo;
var dom_botonAnadirCarrito;

var listaArticulosCarrito = "";
var dom_articulosCarrito;
var dom_precioCarrito;
var precioCarrito = 0;

var dom_formaPago;
var dom_capaTarjeta;
var dom_capaEfectivo;
var dom_titularTarjeta;
var dom_numTarjeta;
var dom_cvv;
var dom_importeEfectivo;

var dom_condicionesCompra;

var dom_botonImprimir;
var conmutadorImprimir = 0;
var dom_botonRestablecer;



// Listener y funcion de la página al cargar completamente
window.addEventListener("load", ()=>{

    // Inicializamos las variables y estados de los nodos
    init();

    // Inicializamos la funcionalidad de los eventos
    manejadorEventos();    

});

// Función para inicializar las variables y estados de los nodos
function init() {
    dom_nombreArticulo = document.getElementById("nombreArticulo");
    dom_errorArticulo = document.getElementById("errorArticulo");
    dom_precioArticulo = document.getElementById("precioArticulo");
    dom_errorPrecio = document.getElementById("errorPrecio");
    dom_unidadesArticulo = document.getElementById("unidadesArticulo");
    dom_botonAnadirCarrito = document.getElementById("anadirCarrito");
    
    dom_articulosCarrito = document.getElementById("articulosCarrito");
    dom_precioCarrito = document.getElementById("precioCarrito");
    
    dom_formaPago = document.getElementById("formaPago");    
    dom_capaTarjeta = document.getElementById("capaTarjeta");
    dom_capaEfectivo = document.getElementById("capaEfectivo");
    dom_titularTarjeta = document.getElementById("titularTarjeta");
    dom_numTarjeta = document.getElementById("numTarjeta");
    dom_cvv = document.getElementById("cvv");
    dom_importeEfectivo = document.getElementById("importeEfectivo");

    dom_condicionesCompra = document.getElementById("condicionesCompra");

    dom_botonImprimir = document.getElementById("imprimir");
    dom_botonRestablecer = document.getElementById("restablecer");

    // Oculta los errores al validar los campos nombreArtículo y precioArtículo
    dom_errorArticulo.style.display = "none";
    dom_errorPrecio.style.display = "none";

    // Oculta las capas relacionadas con la forma de pago tarjeta y efectivo
    dom_capaTarjeta.style.display="none";
    dom_capaEfectivo.style.display="none";

    // Oculta el botón Imprimir
    dom_botonImprimir.style.visibility = "hidden";

}

// Función que maneja los eventos
function manejadorEventos() {
    
    // Funcionalidad del botón añadir al carrito
    dom_botonAnadirCarrito.addEventListener("click", f_anadirCarrito);
    
    // Selector de la forma de pago
    dom_formaPago.addEventListener("change", f_selectorFormaPago);

    // Funcionalidad de la casilla condiciones de compra
    dom_condicionesCompra.addEventListener("click", f_aceptacionCondiciones)

    // Funcionalidad del botón Imprimir
    dom_botonImprimir.addEventListener("click", f_imprimir);

    // Funcionalidad del botón Restablecer
    dom_botonRestablecer.addEventListener("click", f_restablecer);

}

// Función que valida los campos nombre y precio del artículo
function f_anadirCarrito(){

    dom_errorArticulo.style.display = "none";
    dom_errorPrecio.style.display = "none";
    dom_nombreArticulo.className = "";
    dom_precioArticulo.className = "";
    var error = 0;
    
    // Condicionales que validan los campos articulo y precio
    if (dom_precioArticulo.value == "") {
        dom_errorPrecio.style.display = "inline";
        dom_precioArticulo.className = "error";
        dom_precioArticulo.focus();
        error++;   
        
    } else {
        var validadorPrecio = /^\d{1,9}\.?\d{0,2}$/;
        if (validadorPrecio.test(dom_precioArticulo.value) == false) {
            dom_errorPrecio.style.display = "inline";
            dom_errorPrecio.textContent = "Formato erróneo (00.00)";
            dom_precioArticulo.className = "error";
            dom_precioArticulo.focus();
            error++;        
        }
    }

    if (dom_nombreArticulo.value == "") {
        dom_errorArticulo.style.display = "inline";
        dom_nombreArticulo.className = "error"; 
        dom_nombreArticulo.focus();
        error++;
    }

    // Llamamos a la función que añade los productos al carrito y calcula su precio
    if (error == 0) f_incluir();    
}

// Función que añade los productos al carrito y calcula su precio
function f_incluir () {

    // Condicional para añadir los artículos al carrito según requerimiento
    if (listaArticulosCarrito == "") {

        listaArticulosCarrito = dom_nombreArticulo.value;

        dom_articulosCarrito.value = listaArticulosCarrito;
        
    } else {
        
        listaArticulosCarrito = listaArticulosCarrito + ", " + dom_nombreArticulo.value;

        dom_articulosCarrito.value = listaArticulosCarrito;        
    }      
            
    dom_nombreArticulo.value = "";
    dom_nombreArticulo.focus();

    precioCarrito = precioCarrito + (dom_unidadesArticulo.value * dom_precioArticulo.value);
    
    precioCarrito.toFixed(2);

    dom_precioArticulo.value = "";
    dom_unidadesArticulo.value = 1;
    
    dom_precioCarrito.value = precioCarrito + "€";
}

// Función para la lógica de la forma de pago
function f_selectorFormaPago() {
    if (dom_formaPago.value == "tarjeta") {
        dom_capaTarjeta.style.display = "block";
        dom_capaEfectivo.style.display = "none";
        
    } else if (dom_formaPago.value == "efectivo") {
        dom_capaTarjeta.style.display = "none";
        dom_capaEfectivo.style.display = "block";
        dom_importeEfectivo.value = dom_precioCarrito.value;
        
    } else {
        dom_capaTarjeta.style.display = "none";
        dom_capaEfectivo.style.display = "none";    
    }
}

// Función que valida la aparición del botón Imprimir
function f_aceptacionCondiciones() {
   
    conmutadorImprimir++;
    
    if (conmutadorImprimir % 2 != 0) {
    
        dom_botonImprimir.style.visibility = "visible";
        
    } else {

        dom_botonImprimir.style.visibility = "hidden";
    }    
}

// Función que establece el comprotamiento del botón imprimir
function f_imprimir(){

    dom_cvv.className = "";
    dom_formaPago.className = "";
    dom_numTarjeta.className = "";
    dom_titularTarjeta.className = "";
    
    if(dom_formaPago.value != "seleccione"){

        if(dom_formaPago.value == "tarjeta"){

            var validadorNumeroTarjeta = /^\d{16}$/;
            var validadorCvv = /^\d{3}$/;

            if (validadorCvv.test(dom_cvv.value) == false || validadorNumeroTarjeta.test(dom_numTarjeta.value) == false || dom_titularTarjeta.value == "") {              
                
                if(validadorCvv.test(dom_cvv.value) == false){
                    dom_cvv.className = "error";
                    dom_cvv.focus();
                }

                if(validadorNumeroTarjeta.test(dom_numTarjeta.value) == false){
                    dom_numTarjeta.className = "error";
                    dom_numTarjeta.focus();
                }
    
                if(dom_titularTarjeta.value == ""){
                    dom_titularTarjeta.className = "error";
                    dom_titularTarjeta.focus();
                }

                alert(
                    "Revisa los datos de la tarjeta"
                );
                
            } else {

                alert(
                    "El carrito contiene: " + listaArticulosCarrito +
                    "\nPrecio total del carrito: " + dom_precioCarrito.value + 
                    "\nForma de pago: " + dom_formaPago.value
                );
                
                f_restablecer();
            }


        } else {

            alert(
                "El carrito contiene: " + listaArticulosCarrito +
                "\nPrecio total del carrito: " + dom_precioCarrito.value + 
                "\nForma de pago: " + dom_formaPago.value
            );
            
            f_restablecer();

        }
        
    } else {
        alert(
            "Seleccione forma de pago"
        );
        dom_formaPago.className = "error";
    }
}

// Función que resetea la página a las indicaciones del requerimiento
function f_restablecer(){
  
    dom_nombreArticulo.focus();
    dom_capaTarjeta.style.display = "none";
    dom_capaEfectivo.style.display = "none";
    dom_precioCarrito.value = 0;
    dom_articulosCarrito.value = "";
    listaArticulosCarrito = "";
    precioCarrito = 0;
    dom_formaPago.value = "seleccione";
    dom_titularTarjeta.value = "";
    dom_numTarjeta.value = "";
    dom_cvv.value = "";
    dom_importeEfectivo.value = 0;
    dom_condicionesCompra.checked = false;
    conmutadorImprimir = 0;
    dom_botonImprimir.style.visibility = "hidden";
}