
/* *************************************************************************** */
/* ****************      O B J E T O     P R O D U C T O      **************** */
/* *************************************************************************** */
let PROXIMIMO_ID_PRODUCTO = 1;

class Producto {

    constructor(marca, modelo, motor, tipo, anio, kilometros, precio, img = "img/card.webp") {
        this.id = PROXIMIMO_ID_PRODUCTO++;
        this.marca = marca;
        this.modelo = modelo;
        this.motor = motor;
        this.tipo = tipo;
        this.anio = anio;
        this.kilometros = kilometros;
        this.precio = precio;
        this.imagen = img;
        this.carnet = this.carnet();
    }

    /**
     * Funcion que determina que tipo de carnet habilita a conducir 1 vehiculo dependiendo su cilindrada
     * @returns un string (A1, A2, A).
     * A1: para motos hasta 125cc,
     * A2 para motos hasta 700cc,
     * A paraq motos de mas de 700cc
     */
    carnet() {
        if (this.motor <= 125) {
            return "A1";
        } else if (this.motor > 125 && this.motor <= 700) {
            return "A2";
        } else if (this.motor > 700) {
            return "A";
        }
    }
}

let almacen = [
    new Producto("YAMAHA", "MT 125", 125, "Naked", 2015, 3500, 5000, "./img/motos/mt125-blue.jpg"),
    new Producto("YAMAHA", "MT 7", 700, "Naked", 2016, 18000, 5300, "./img/motos/mt7-storm.jpg"),
    new Producto("YAMAHA", "MT 9", 900, "Naked", 2019, 7500, 13000, "./img/motos/mt9-blue.jpg"),
    new Producto("YAMAHA", "MT 10", 1000, "Naked", 2022, 12500, 1500, "./img/motos/mt-10.jpg"),
    new Producto("HONDA", "Africa twing", 1000, "Trail", 2017, 9000, 30000, "./img/motos/africaTwin.jpg"),
    new Producto("HONDA", "Africa twing", 200, "Trail", 2018, 4500, 9500, "./img/motos/africaTwin200.jpg"),
    new Producto("HONDA", "CB500F", 500, "Naked", 2016, 7300, 4300, "./img/motos/CB500F.jpg"),
    new Producto("HONDA", "CB500R", 500, "Naked", 2019, 7500, 19000, "./img/motos/CB500R.jpg"),
    new Producto("HONDA", "CB500X", 500, "Trail", 2020, 5600, 11500, "./img/motos/CB500X.jpg"),
    new Producto("KAWASAKY", "Versys 650", 600, "Trail", 2021, 7000, 15500, "./img/motos/versys650.png"),
    new Producto("KAWASAKY", "Ninja 1000", 1000, "Racing", 2007, 6900, 26500, "./img/motos/ninja1000.jpg"),
    new Producto("BMW", "R 1250 GS", 1250, "TraiL", 2014, 5600, 5500, "./img/motos/BMW-R-1250-GS.jpg"),
];

const listaMarcas = ["YAMAHA", "HONDA", "KAWASAKY", "BMW", "DUCATI", "TRIUMF"];
const listaTipoMoto = ["NAKED", "TRAIL", "ENDURO", "PISTA", "TOURING", "CUSTOM"];


/************      D O M      ****************** */

/**
 * funcion que crea una card
 * @returns una funcion donde recibira por parametro las valores de la propiedades de un objeto para cargarlo en su card
 */
function crearCard() {
    const h5 = document.createElement('h5');
    h5.classList = "card-title";
    const h6 = document.createElement('h6');
    h6.classList = "card-title";
    const cardBody = document.createElement('div');
    cardBody.classList = "card-body";
    cardBody.append(h5, h6);

    const itemTipo = document.createElement('li');
    itemTipo.classList = "list-group-item border px-0 text-center col-3";
    const itemAnio = document.createElement('li');
    itemAnio.classList = "list-group-item border px-0 col-3";
    const itemKilometro = document.createElement('li');
    itemKilometro.classList = "list-group-item border px-0 col-4";
    const itemLicencia = document.createElement('li');
    itemLicencia.classList = "list-group-item border px-0 col-2";



    const listaUl = document.createElement('ul');
    listaUl.classList = "list-group list-group-flush list-group-horizontal d-flex justify-content-around border-0";
    listaUl.append(itemTipo, itemAnio, itemKilometro, itemLicencia);

    const footerPrecio = document.createElement("div");
    footerPrecio.classList = "card-footer text-end";

    const btn = document.createElement("button");
    btn.classList = "btn btn-dark botonCard";
    btn.setAttribute("type", "button");
    btn.setAttribute("data-bs-target", "#modalCard");
    btn.setAttribute("data-bs-toggle", "modal");
    btn.textContent = "Comprar/Ver mas";

    const img = document.createElement('img');
    img.classList = "card-img-top";

    const card = document.createElement('div');
    card.classList = "card mx-2";

    const contenedorCard = document.createElement("div");
    contenedorCard.classList = "mb-5 col-6 col-md-6 col-lg-4";


    return function (marca, modelo, tipo, anio, kilimetros, licencia, precio, imagen = "img/card.webp", id) {
        img.src = imagen;
        h5.textContent = marca;
        h6.textContent = modelo;
        itemTipo.textContent = tipo;
        itemAnio.textContent = anio;
        itemKilometro.textContent = kilimetros + "km";
        itemLicencia.textContent = licencia
        footerPrecio.textContent = precio + "€";
        btn.id = id;

        card.append(img, cardBody, listaUl, footerPrecio, btn);
        contenedorCard.append(card);
        return contenedorCard;
    };
}


/**
 * funcion que recorre el array de productos, crea una card por cada uno y los muestra en el html
 * @param {*} almacen array de productos
 */
function mostrarProductosEnHTML(array) {
    limpiarHTML();
    for (let producto of array) {
        const estructCard = crearCard();
        const newCard = estructCard(producto.marca, producto.modelo, producto.tipo, producto.anio, producto.kilometros, producto.carnet, producto.precio, producto.imagen, producto.id);
        contenedorCards.append(newCard);
    }
}

const contenedorCards = document.querySelector('#row-card');

/**
 * Funcion que limpia el html (borra los nodos/elementos del contenedor de tarjetas)
 */
function limpiarHTML() {
    while (contenedorCards.firstChild) {
        contenedorCards.removeChild(contenedorCards.firstChild);
    }
}

/**
 * funcio que agrega una tarjeta creada, ya con los datos correspondientes al html
 */
function agregarTarjetaHTML() {
    const producto = agregarProducto(almacen);
    const card = crearCard();
    const card1 = card(producto.marca, producto.modelo, producto.tipo, producto.anio, producto.kilimetros, producto.precio);
    contenedor.append(card1);
}

/**
 * funcion que carga los select del html
 * @param {*} contenedor padre del select
 * @param {*} array array con los datos a cargar
 */
function cargarSelect(contenedor, array) {
    for (let i = 0; i < array.length; i++) {
        const opcion = document.createElement('option');
        opcion.value = array[i];
        opcion.textContent = array[i];
        contenedor.append(opcion);
    }
}

//Filtros

//carga de select
const selecMarcaFiltro = document.querySelector('#filtromarca');
cargarSelect(selecMarcaFiltro, listaMarcas);

const inputPrecioDesde = document.querySelector('#inputPrecioDesde');
const labelPrecioDesde = document.querySelector('#labelPrecioDesde')
inputPrecioDesde.addEventListener('input', () => {
    labelPrecioDesde.textContent = inputPrecioDesde.value;
})

const inputPrecioHasta = document.querySelector('#inputPrecioHasta');
const labelPrecioHasta = document.querySelector('#labelPrecioHasta')
inputPrecioHasta.addEventListener('input', () => {
    labelPrecioHasta.textContent = inputPrecioHasta.value;
})

//nuevo producto *********************************************************
// carga de select
const yearDesde = document.querySelector("#anio-desde");
const yearHasta = document.querySelector("#anio-hasta");

const yearMax = new Date().getFullYear();
const yearMin = 2000;

/**
 * funcion que llena los select de años
 */
function llenarSelect() {
    for (let i = yearMax; i >= yearMin; i--) {
        const opcion = document.createElement("option");
        const opcion2 = document.createElement("option");
        opcion.value = opcion2.value = i;
        opcion.textContent = opcion2.textContent = i;
        yearDesde.append(opcion);
        yearHasta.append(opcion2);
    }
}

llenarSelect()

const selecMarcaNuevo = document.querySelector('#nuevoMarca');
cargarSelect(selecMarcaNuevo, listaMarcas);

const tipoMoto = document.querySelector('#nuevoTipo');
cargarSelect(tipoMoto, listaTipoMoto);

// eventos
const precio = document.querySelector('#nuevoPrecio');
const labelPrecio = document.querySelector('#labelPrecioNuevo')
precio.addEventListener('input', () => {
    labelPrecio.textContent = precio.value;
})


/********************             I N I C I O     A P P           ********************/
//evento que carga el html con los productos cuando la pagina ya esta cargada
// document.addEventListener("DOMContentLoaded", mostrarProductosEnHTML(almacen));
mostrarProductosEnHTML(almacen);


const marca = document.querySelector('#nuevoMarca');
const modelo = document.querySelector('#nuevoModelo');
const motor = document.querySelector('#nuevoMotor');
const tipo = document.querySelector('#nuevoTipo');
const anio = document.querySelector('#nuevoAnio');
const kilometros = document.querySelector('#nuevoKilometro');
const valor = document.querySelector('#nuevoPrecio');


let nuevoProducto;


const formularioNuevoProducto = document.querySelector('#formNuevo');
//evento que guarda todos los datos del formulario de publicar anuncio y los sube al storage
formularioNuevoProducto.addEventListener('change', (e) => {
    e.preventDefault();

    nuevoProducto = new Producto(marca.value, modelo.value, motor.value, tipo.value, anio.value, kilometros.value, precio.value);

    const nuevoProdJSON = JSON.stringify(nuevoProducto);
    localStorage.setItem("cargaPendiente", nuevoProdJSON);
})

let botonesCards = document.querySelectorAll(".botonCard");
console.log(botonesCards);





const btnPublicarAnuncio = document.querySelector("#publicarAnuncio");
//evento que revisa el storage
btnPublicarAnuncio.addEventListener("click", () => {
    let productoStorage = JSON.parse(localStorage.getItem("cargaPendiente"));

    if (productoStorage) {
        Swal.fire({
            title: 'Continuar publicacion?',
            text: "Tienes una carga pendiente de completar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continunar!'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("aleluya")
                marca.value = productoStorage.marca;
                modelo.value = productoStorage.modelo;
                motor.value = productoStorage.motor;
                tipo.value = productoStorage.tipo;
                precio.value = productoStorage.precio;
                labelPrecio.textContent = precio.value;
                anio.value = productoStorage.anio;
                kilometros.value = productoStorage.kilometros;

                nuevoProducto = new Producto(marca.value, modelo.value, motor.value, tipo.value, anio.value, kilometros.value, precio.value);
            } else {
                console.log("borrando ñpocañ");
                localStorage.removeItem("cargaPendiente");
            }
        })
    }
})



// evento que trabaja con el formilario, boton cargar
formularioNuevoProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    const estructCard = crearCard();
    const newCard = estructCard(nuevoProducto.marca,
        nuevoProducto.modelo,
        nuevoProducto.tipo,
        nuevoProducto.anio,
        nuevoProducto.kilometros,
        nuevoProducto.carnet,
        nuevoProducto.precio,
        nuevoProducto.imagen,
        nuevoProducto.id);

    contenedorCards.append(newCard);
    // almacen.push(nuevoProducto);
    almacen = [...almacen, nuevoProducto];
    formularioNuevoProducto.reset();
    localStorage.removeItem("cargaPendiente");
    botonesCards = document.querySelectorAll(".botonCard");
    botonesCards.forEach(element => {
        console.table(element.id)
        element.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("evento btn no: ");
            console.log(e.target.id);
        })
    });
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se ha publicado tu moto',
        showConfirmButton: false,
        timer: 2000
    })
})




// +++++++++++++++++++++++++  filtrado +++++++++++++++++++++++++++

/**
 * Objeto creado para guardar los datos seleccionados para filtrar
 */
const objetoFiltrado = {
    marca: "",
    modelo: "",
    anioMax: "",
    anioMin: "",
    precioMax: "",
    precioMin: ""
}

console.table(almacen)

/**
 * funcion que filtra la lista de productos
 */
function filtrar() {
    mostrarProductosEnHTML(almacen.filter(filtrarMarca).filter(filtrarAnioMin).filter(filtrarAnioMax).filter(filtrarPrecioMin).filter(filtrarPrecioMax));
}

/**
 * funcion que compara el objetoFiltrado con otro objeto por marca
 * @param {*} producto objeto a comparar 
 * @returns true si existe o el objeto entero
 */
function filtrarMarca(producto) {
    const { marca } = objetoFiltrado; // destructurin de objeto
    return marca ? marca == producto.marca : producto;
}

/**
 * funcion que compara el objetoFiltrado con otro objeto por año minimo
 * @param {*} producto objeto a comparar 
 * @returns true si existe o el objeto entero
 */
function filtrarAnioMin(producto) {
    const { anioMin } = objetoFiltrado;
    if (anioMin) {
        return anioMin <= producto.anio;
    } else {
        return producto;
    }
}

/**
 * funcion que compara el objetoFiltrado con otro objeto por año maximo
 * @param {*} producto objeto a comparar 
 * @returns true si existe o el objeto entero
 */
function filtrarAnioMax(producto) {
    const { anioMax } = objetoFiltrado;
    if (anioMax) {
        return anioMax >= producto.anio;
    } else {
        return producto;
    }
}


/**
 * funcion que compara el objetoFiltrado con otro objeto por precio minimo
 * @param {*} producto objeto a comparar 
 * @returns true si existe o el objeto entero
 */
function filtrarPrecioMin(producto) {
    const { precioMin } = objetoFiltrado;
    if (precioMin) {
        return precioMin <= producto.precio;
    } else {
        return producto;
    }
}


/**
 * funcion que compara el objetoFiltrado con otro objeto por precio maximo
 * @param {*} producto objeto a comparar 
 * @returns true si existe o el objeto entero
 */
function filtrarPrecioMax(producto) {
    const { precioMax } = objetoFiltrado;
    if (precioMax) {
        return precioMax >= producto.precio;
    } else {
        return producto;
    }
}


//Eventos
selecMarcaFiltro.addEventListener('change', (e) => {
    objetoFiltrado.marca = e.target.value;
    filtrar();
})

const anioMin = document.querySelector('#anio-desde');
const anioMax = document.querySelector('#anio-hasta');

anioMin.addEventListener('change', (e) => {
    e.preventDefault()
    objetoFiltrado.anioMin = parseInt(e.target.value);
    filtrar();
})

anioMax.addEventListener('change', (e) => {
    e.preventDefault()
    objetoFiltrado.anioMax = parseInt(e.target.value);
    filtrar();
})


inputPrecioDesde.addEventListener("change", e => {
    e.preventDefault();
    objetoFiltrado.precioMin = e.target.value;
    filtrar();
})

inputPrecioHasta.addEventListener("change", e => {
    e.preventDefault();
    objetoFiltrado.precioMax = e.target.value;
    filtrar();
})



let card = document.getElementsByClassName("card")
let fondoActual = localStorage.getItem("fondo") || "light";
let btn = document.getElementById("btn-modo");
document.body.classList.add(fondoActual);
if (fondoActual == "light") {
    btn.textContent = "Dark"
    btn.className = "btn btn-dark";

} else {
    btn.textContent = "Light"
    btn.className = "btn border-dark"
}

localStorage.setItem("fondo", fondoActual);

btn.addEventListener("click", () => {
    console.log("click")
    if (fondoActual == "light") {
        fondoActual = "dark";
        document.body.classList = fondoActual;
        btn.textContent = "Light"
        btn.className = "btn border-dark"
    } else {
        fondoActual = "light";
        document.body.classList = fondoActual;
        btn.textContent = "Dark"
        btn.className = "btn btn-dark"
    }

    localStorage.setItem("fondo", fondoActual);
})





/******************************************************************* */
/******************************************************************* */
/******************************************************************* */
/******************************************************************* */

// const imagenModal = modalProducto.querySelector("div")
// console.log(imagenModal)

function cargarModalCol_1(obj) {
    const { marca, modelo, motor, imagen, tipo, anio, km, carnet, precio } = obj;
    return `<div>
                <img src=${imagen} alt="lel" class="w-100">
                </div>
                <div class="detalles d-flex justify-content-around">
                    <ul>
                        <li>${marca}</li>
                        <li>${modelo}</li>
                        <li>${motor}</li>
                        <li>${tipo}</li>                    
                    </ul>
                    <ul>
                        <li>${anio}</li>
                        <li>${km}</li>
                        <li>${carnet}</li>
                        <li>${precio}</li>
                </ul>
            </div>
            <div>Comentarios del vendedor</div>`
}

function cargarModalCol_2(obj) {
    const { marca, modelo, motor, imagen, tipo, anio, km, carnet, precio } = obj;
    return `<h6>${marca} - ${modelo}</h6>
                    <form action="">
                      <h6>Contactar al vendedor</h6>
                      <input
                        type="textArea"
                        class="form-data"
                        placeholder="Mensaje"
                      />
                      <input
                        type="text"
                        class="form-data"
                        placeholder="Nombre"
                      />
                      <input
                        type="num"
                        class="form-data"
                        placeholder="Telefono"
                      />
                      <input
                        type="email"
                        class="form-data"
                        placeholder="Email"
                      />
                      <button class="btn btn-secondary" type="submit">
                        Enviar
                      </button>
                    </form>
                    <form class="financiacion">
                      <h6>Calcula tu financiacion</h6>
                      <p>Entrada inicial: <span>0</span>€</p>
                      <input type="range" min="0" max="1000" value="0" />
                      <p>En cuantos meses?</p>
                      <input type="range" min="0" max="48" value="0" />
                    </form>`
}

const modalProducto = document.querySelector("#columna-1");
const modalFinanciacion = document.querySelector("#columna-2");
const btnBorrarFiltro = document.querySelector("#filtrado");

btnBorrarFiltro.addEventListener('submit', () => {
    btnBorrarFiltro.reset();
})

botonesCards.forEach(element => {
    console.table(element.id)
    element.addEventListener("click", (e) => {
        e.preventDefault();
        let articulo = document.createElement("article");
        articulo.classList = "datos-producto ";
        const producto = almacen.find(producto => producto.id == e.target.id);
        articulo.innerHTML = cargarModalCol_1(producto);
        modalProducto.appendChild(articulo);

        let articulo2 = document.createElement("article");
        articulo2.classList = "contacta-vendedor";
        articulo2.innerHTML = cargarModalCol_2(producto);
        modalFinanciacion.appendChild(articulo2);
    })
});
