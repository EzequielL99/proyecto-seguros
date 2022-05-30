// Constructores
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

function UI(){
}

// Llena las opciones de los anios
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i >= min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if(i == max) option.setAttribute('selected', '');

        selectYear.appendChild(option);
    }
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    
    ui.llenarOpciones(); // Llena el select con los anios
})