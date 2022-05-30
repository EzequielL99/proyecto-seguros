// Constructores
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

// Realiza la cotizacion del seguro
Seguro.prototype.cotizarSeguro = function () {
    /**
     * 1 = Americano 1.15
     * 2 = Asiatico 1.05
     * 3 = Europeo 1.35
     */

    let cantidad;
    const base = 2000;

    switch (parseInt(this.marca)) {
        case 1:
            cantidad = base * 1.15;
            break;
        case 2:
            cantidad = base * 1.05;
            break;
        case 3:
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // Leer el anio
    const diferencia = new Date().getFullYear() - this.anio;

    // Cada anio que la diferencia es mayor. El costo va a reducir un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /**
     * Si el seguro es basico se multiplica por un 30%
     * Si el seguro es completo se multiplica por un 50%
     */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;

}

function UI() {}

// Llena las opciones de los anios
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let i = max; i >= min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i == max) option.setAttribute('selected', '');

        selectYear.appendChild(option);
    }
}

// Proto para mostrar mensaje de error
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('DIV');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    // Eliminar
    setTimeout(() => {
        div.remove();
    }, 3000);
}

// Proto que muestra el resultado de la cotizacion
UI.prototype.mostrarResultado = (seguro, total) => {
    const {
        marca,
        anio,
        tipo
    } = seguro;

    switch (parseInt(marca)) {
        case 1:
            textoMarca = 'Americano';
            break;
        case 2:
            textoMarca = 'Asiatico';
            break;
        case 2:
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    // Crear el resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal"> ${anio}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    // Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; // Se borra el spinner
        resultadoDiv.appendChild(div); // Se muestra el resultado
    }, 3000);
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones(); // Llena el select con los anios
});

eventListeners();

function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // Leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // Leer el anio seleccionado
    const anio = document.querySelector('#year').value;

    // Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || anio === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'exito');

    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    // Instanciar el seguro
    const seguro = new Seguro(marca, anio, tipo);

    // Utilizar el prototype que va a cotizar
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(seguro, total);
}